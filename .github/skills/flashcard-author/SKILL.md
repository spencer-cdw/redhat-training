---
name: flashcard-author
description: "Draft and review course flashcards from this repository's notes. Use when asked to generate questions, create flashcards, or expand a course deck."
argument-hint: "Course folder and optional topic"
---

# Course Flashcard Author

Create accurate, varied flashcard drafts from the training notes in this repository. The curated course deck is human-reviewed content: never silently replace or append to it.

## Workflow

1. Identify the requested course folder and topic. For DO280, use `openshift/do280-v4.22/`.
2. Read the relevant Markdown notes and any explicitly requested lab/review notes. Treat repository notes as the source of truth; do not invent commands, behavior, or facts.
3. Verify user-suggested answers against the notes and established command behavior. If an example contains a factual error, correct the card and clearly tell the user what changed and why.
4. Read the course's `flashcards.yaml` and avoid duplicate questions or paraphrases that test the same fact.
5. Draft a useful mix of `terminal` and `multi_select` questions where the source material supports them. Prefer practical scenarios and plausible distractors over trivia.
6. Add one or two progressively revealing hints when useful. Hints should guide recall without giving away the answer.
7. Include a `source.file` path relative to the course folder and a `source.heading` identifying the relevant section for every card.
8. Write proposed cards to `<course>/flashcards.draft.yaml`, preserving the existing curated deck. If the user asks for suggestions only, show the proposal in the response instead of writing a file.
9. Run `ruby scripts/build_site.rb` to validate the curated deck. Do not copy draft cards into the curated deck or claim they pass deck validation unless they have been reviewed and merged by the user.
10. Summarize the draft count, card types, source notes, and any uncertain facts for human review.

## Card format

Every card has a unique, stable `id`, a `type`, a `question`, optional `hints`, and a `source`.

- `terminal`: `answer` is a command or short response. Add `accepted_answers` only when equivalent answers are supported by the notes.
- `multi_select`: `options` contains objects with `text` and `correct` boolean fields. Include both correct and incorrect options; the learner must select the complete correct set.

Use the structure and examples in the course's `flashcards.yaml` as the canonical schema.
