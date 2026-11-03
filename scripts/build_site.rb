#!/usr/bin/env ruby

require "fileutils"
require "json"
require "yaml"

ROOT = File.expand_path("..", __dir__)
OUTPUT = File.join(ROOT, "_site")
DECK_PATHS = Dir.glob(File.join(ROOT, "{ansible,openshift,rhcsa,rhce}/**/flashcards.yaml")).sort

def fail_validation(message)
  abort("Invalid flashcard deck: #{message}")
end

def require_string(value, location)
  fail_validation("#{location} must be a non-empty string") unless value.is_a?(String) && !value.strip.empty?
end

def validate_deck(deck, course_dir)
  fail_validation("root must be a mapping") unless deck.is_a?(Hash)
  fail_validation("version must be 1") unless deck["version"] == 1
  require_string(deck["course"], "course")
  fail_validation("cards must be a non-empty list") unless deck["cards"].is_a?(Array) && !deck["cards"].empty?

  ids = []
  deck["cards"].each_with_index do |card, index|
    location = "cards[#{index}]"
    fail_validation("#{location} must be a mapping") unless card.is_a?(Hash)
    require_string(card["id"], "#{location}.id")
    fail_validation("duplicate card id #{card["id"]}") if ids.include?(card["id"])
    ids << card["id"]
    require_string(card["question"], "#{location}.question")
    fail_validation("#{location}.type must be terminal or multi_select") unless %w[terminal multi_select].include?(card["type"])

    hints = card.fetch("hints", [])
    fail_validation("#{location}.hints must be a list of strings") unless hints.is_a?(Array) && hints.all? { |hint| hint.is_a?(String) && !hint.strip.empty? }

    source = card["source"]
    fail_validation("#{location}.source must be a mapping") unless source.is_a?(Hash)
    require_string(source["file"], "#{location}.source.file")
    source_path = File.expand_path(source["file"], course_dir)
    unless source_path.start_with?("#{course_dir}/") && File.file?(source_path)
      fail_validation("#{location}.source.file must name a file in #{course_dir.sub("#{ROOT}/", "")}")
    end
    require_string(source["heading"], "#{location}.source.heading")

    case card["type"]
    when "terminal"
      require_string(card["answer"], "#{location}.answer")
      accepted = card.fetch("accepted_answers", [card["answer"]])
      fail_validation("#{location}.accepted_answers must be a list of strings") unless accepted.is_a?(Array) && !accepted.empty? && accepted.all? { |answer| answer.is_a?(String) && !answer.strip.empty? }
    when "multi_select"
      options = card["options"]
      fail_validation("#{location}.options must contain at least two options") unless options.is_a?(Array) && options.length >= 2
      options.each_with_index do |option, option_index|
        option_location = "#{location}.options[#{option_index}]"
        fail_validation("#{option_location} must be a mapping") unless option.is_a?(Hash)
        require_string(option["text"], "#{option_location}.text")
        fail_validation("#{option_location}.correct must be true or false") unless [true, false].include?(option["correct"])
      end
      correct_count = options.count { |option| option["correct"] }
      fail_validation("#{location}.options must include correct and incorrect choices") unless correct_count.positive? && correct_count < options.length
      explanation = card["explanation"]
      require_string(explanation, "#{location}.explanation") if explanation
    end
  end
end

fail_validation("no course flashcards.yaml files found") if DECK_PATHS.empty?

decks = DECK_PATHS.map do |deck_path|
  begin
    deck = YAML.safe_load(
      File.read(deck_path),
      permitted_classes: [],
      permitted_symbols: [],
      aliases: false,
    )
  rescue Psych::Exception => error
    fail_validation("#{deck_path.sub("#{ROOT}/", "")}: YAML parse error: #{error.message}")
  end
  course_dir = File.dirname(deck_path)
  validate_deck(deck, course_dir)
  [deck_path, deck]
end

FileUtils.mkdir_p(OUTPUT)
%w[index.html app.js styles.css].each do |asset|
  FileUtils.cp(File.join(ROOT, asset), OUTPUT)
end

decks.each do |deck_path, deck|
  course_path = File.dirname(deck_path).sub("#{ROOT}/", "")
  deck_output = File.join(OUTPUT, course_path, "flashcards.json")
  FileUtils.mkdir_p(File.dirname(deck_output))
  File.write(deck_output, JSON.pretty_generate(deck))
  puts "Built #{deck["cards"].length} cards for #{deck["course"]} in #{course_path}/flashcards.json"
end
