const paths = ["Red Hat Administration", "Ansible", "OpenShift"];
const openShiftCourseOptions = [...document.querySelectorAll("#class-screen .menu-option")];
const ansibleCourseOptions = [...document.querySelectorAll("#ansible-screen .menu-option")];
let courseOptions = openShiftCourseOptions;
const pathOptions = [...document.querySelectorAll(".path-option")];
const certificationOptions = [...document.querySelectorAll("[data-certification]")];
const screens = {
  home: document.querySelector("#home-screen"),
  classes: document.querySelector("#class-screen"),
  ansible: document.querySelector("#ansible-screen"),
  adminCerts: document.querySelector("#admin-cert-screen"),
  adminCourses: document.querySelector("#admin-course-screen"),
  aap: document.querySelector("#aap-screen"),
  study: document.querySelector("#study-screen"),
};
const adminCoursesByCertification = {
  RHCE: ["RH294-v9"],
  RHCSA: ["RH124", "RH134"],
};

let stage = "home";
let selectedPath = 0;
let selectedClass = 0;
let selectedCertification = 0;
let activeCategory = "OpenShift";
let activeCertification = "";
let cards = [];
let currentIndex = 0;
let activeCourse = "";
let graded = false;
let attempts = 0;
let answerRevealed = false;
let selectedAnswers = new Set();
const knownCards = new Set();

const cardPrompt = document.querySelector("#flashcard");
const cardSide = document.querySelector("#card-side");
const cardContent = document.querySelector("#card-content");
const cardHints = document.querySelector("#card-hints");
const cardInteraction = document.querySelector("#card-interaction");
const cardFeedback = document.querySelector("#card-feedback");
const cardInstructions = document.querySelector("#card-instructions");
const cardCount = document.querySelector("#card-count");
const knownCount = document.querySelector("#known-count");
const knownButton = document.querySelector("#known");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const progress = document.querySelector(".progress-track");
const progressFill = document.querySelector(".progress-fill");
const announcer = document.querySelector("#announcer");
const terminalShell = document.querySelector(".terminal-shell");
const terminalScreen = document.querySelector(".terminal-screen");
const powerSwitch = document.querySelector("#power-switch");
const screenContent = document.querySelector(".screen-content");

function scrollTo(element) {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  element.scrollIntoView({ behavior, block: "start" });
}

function resetScreenScroll() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  terminalScreen.scrollTo({ top: 0, behavior });
}

function showScreen(name) {
  for (const [screenName, element] of Object.entries(screens)) {
    element.hidden = screenName !== name;
  }
}

function selectPath(index) {
  selectedPath = index;
  pathOptions.forEach((option, optionIndex) => {
    const isSelected = optionIndex === selectedPath;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
}

function selectClass(index) {
  selectedClass = (index + courseOptions.length) % courseOptions.length;
  courseOptions.forEach((option, optionIndex) => {
    const isSelected = optionIndex === selectedClass;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
}

function selectCertification(index) {
  selectedCertification = (index + certificationOptions.length) % certificationOptions.length;
  certificationOptions.forEach((option, optionIndex) => {
    const isSelected = optionIndex === selectedCertification;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
}

function showDeckStatus(title, message, backToClasses, category = "Ansible") {
  stage = backToClasses ? "course-unavailable" : "aap";
  showScreen("aap");
  document.querySelector("#aap-kicker").textContent = `${category.toUpperCase()} / DECK STATUS`;
  document.querySelector("#aap-title").textContent = title;
  document.querySelector("#aap-message").textContent = message;
  document.querySelector("#aap-back").textContent = backToClasses
    ? category === "Red Hat Administration"
      ? `← Back to ${activeCertification} courses`
      : `← Back to ${category} classes`
    : "← Back to training paths";
  resetScreenScroll();
  scrollTo(screens.aap);
  announcer.textContent = `${title} ${message}`;
}

function choosePath(index) {
  selectPath(index);

  const category = paths[index];
  activeCategory = category;
  if (category === "OpenShift") {
    courseOptions = openShiftCourseOptions;
    selectedClass = 0;
    selectClass(selectedClass);
    stage = "classes";
    showScreen("home");
    screens.classes.hidden = false;
    scrollTo(screens.classes);
    courseOptions[selectedClass].focus({ preventScroll: true });
    announcer.textContent = "Choose an OpenShift class to start.";
    return;
  }

  if (category === "Ansible") {
    courseOptions = ansibleCourseOptions;
    selectedClass = 0;
    selectClass(selectedClass);
    stage = "classes";
    showScreen("home");
    screens.ansible.hidden = false;
    scrollTo(screens.ansible);
    courseOptions[selectedClass].focus({ preventScroll: true });
    announcer.textContent = "Choose the DO374 Ansible track.";
    return;
  }

  if (category === "Red Hat Administration") {
    stage = "admin-certifications";
    showScreen("home");
    screens.adminCerts.hidden = false;
    scrollTo(screens.adminCerts);
    certificationOptions[selectedCertification].focus({ preventScroll: true });
    announcer.textContent = "Choose RHCE or RHCSA.";
    return;
  }

  showDeckStatus(
    `No ${category} deck loaded.`,
    `${category} flashcards can be added when its YAML deck is ready.`,
    false,
    category,
  );
}

function showAdminCourses(certification) {
  activeCertification = certification;
  const optionsContainer = document.querySelector("#admin-course-options");
  optionsContainer.replaceChildren();
  courseOptions = adminCoursesByCertification[certification].map((course) => {
    const button = document.createElement("button");
    const pointer = document.createElement("span");
    const label = document.createElement("span");
    const enter = document.createElement("span");

    button.className = "menu-option";
    button.type = "button";
    button.dataset.course = course;
    button.setAttribute("aria-pressed", "false");
    pointer.className = "menu-pointer";
    pointer.setAttribute("aria-hidden", "true");
    pointer.textContent = "▶";
    label.textContent = course;
    enter.className = "menu-enter";
    enter.textContent = "[ ENTER ]";
    button.append(pointer, label, enter);
    optionsContainer.append(button);
    return button;
  });
  document.querySelector("#admin-course-kicker").textContent =
    `RED HAT ADMINISTRATION / ${certification} COURSES`;
  document.querySelector("#admin-course-title").textContent = `Choose a ${certification} course`;
  document.querySelector("#admin-course-menu-title").textContent =
    ` ${certification} courses `;
  selectedClass = 0;
  selectClass(selectedClass);
  stage = "admin-courses";
  screens.adminCerts.hidden = true;
  screens.adminCourses.hidden = false;
  scrollTo(screens.adminCourses);
  courseOptions[selectedClass].focus({ preventScroll: true });
  courseOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      selectClass(index);
      startCourse();
    });
  });
  announcer.textContent = `${certification} courses: ${adminCoursesByCertification[certification].join(", ")}.`;
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function normalizeAnswer(answer) {
  return answer.trim().replace(/\s+/g, " ").toLowerCase();
}

function createHintButton(hint, index) {
  const button = document.createElement("button");
  const label = document.createElement("span");
  const content = document.createElement("span");

  button.className = "hint-button";
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", `Reveal hint ${index + 1}`);
  label.className = "hint-label";
  label.textContent = `HINT ${index + 1}  [ SPACE ]`;
  content.className = "hint-content";
  content.textContent = hint;
  content.hidden = true;
  button.append(label, content);
  button.addEventListener("click", () => {
    const revealed = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(revealed));
    button.setAttribute("aria-label", revealed ? `Hint ${index + 1}: ${hint}` : `Reveal hint ${index + 1}`);
    content.hidden = !revealed;
    button.classList.toggle("is-revealed", revealed);
  });

  return button;
}

function createTerminalInteraction() {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const checkButton = document.createElement("button");
  const showAnswerButton = createShowAnswerButton();

  label.className = "answer-label";
  label.htmlFor = "terminal-answer";
  label.textContent = "TYPE YOUR COMMAND";
  input.id = "terminal-answer";
  input.className = "terminal-input";
  input.type = "text";
  input.autocomplete = "off";
  input.autocapitalize = "off";
  input.spellcheck = false;
  input.placeholder = "enter command...";
  input.setAttribute("aria-label", "Type your command");
  checkButton.className = "button button-check";
  checkButton.type = "button";
  checkButton.textContent = "CHECK ANSWER";
  checkButton.addEventListener("click", checkAnswer);
  cardInteraction.append(label, input, checkButton, showAnswerButton);
  cardInstructions.textContent = "TYPE COMMAND · ENTER CHECK · ↓ TO HINTS";
  input.focus({ preventScroll: true });
  return input;
}

function createMultiSelectInteraction(card) {
  const options = document.createElement("div");
  const checkButton = document.createElement("button");
  const showAnswerButton = createShowAnswerButton();

  options.className = "answer-options";
  options.setAttribute("role", "group");
  options.setAttribute("aria-label", "Select all correct answers");
  card.options.forEach((option, index) => {
    const button = document.createElement("button");
    const marker = document.createElement("span");
    const text = document.createElement("span");

    button.className = "answer-option";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    button.dataset.optionIndex = String(index);
    marker.className = "option-marker";
    marker.textContent = "[ ]";
    text.textContent = option.text;
    button.append(marker, text);
    button.addEventListener("click", () => {
      if (graded) {
        return;
      }
      const selected = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(selected));
      marker.textContent = selected ? "[x]" : "[ ]";
      if (selected) {
        selectedAnswers.add(index);
      } else {
        selectedAnswers.delete(index);
      }
    });
    options.append(button);
  });

  checkButton.className = "button button-check";
  checkButton.type = "button";
  checkButton.textContent = "CHECK SELECTIONS";
  checkButton.addEventListener("click", checkAnswer);
  cardInteraction.append(options, checkButton, showAnswerButton);
  cardInstructions.textContent = "↑ / ↓ MOVE · SPACE SELECT · ENTER CHECK · ↓ HINTS";
}

function createShowAnswerButton() {
  const button = document.createElement("button");
  button.className = "button button-show-answer";
  button.type = "button";
  button.textContent = "SHOW ANSWER";
  button.hidden = true;
  button.addEventListener("click", revealAnswer);
  return button;
}

function renderHints(card) {
  cardHints.replaceChildren();
  (card.hints || []).forEach((hint, index) => {
    cardHints.append(createHintButton(hint, index));
  });
}

function renderCard() {
  const card = cards[currentIndex];
  graded = false;
  attempts = 0;
  answerRevealed = false;
  selectedAnswers = new Set();
  cardPrompt.dataset.cardType = card.type;
  cardPrompt.dataset.cardId = card.id;
  cardSide.textContent = card.type === "terminal" ? "INTERACTIVE TERMINAL" : "MULTI-SELECT";
  cardContent.textContent = card.question;
  cardPrompt.setAttribute("aria-label", `${cardSide.textContent}: ${card.question}`);
  cardHints.replaceChildren();
  cardInteraction.replaceChildren();
  cardFeedback.replaceChildren();
  cardFeedback.hidden = true;
  renderHints(card);

  if (card.type === "terminal") {
    createTerminalInteraction();
  } else {
    createMultiSelectInteraction(card);
  }
  if (card.type === "terminal" && !(card.hints || []).length) {
    cardInstructions.textContent = "TYPE THE COMMAND · ENTER TO CHECK";
  } else if (card.type === "multi_select" && (card.hints || []).length) {
    cardInstructions.textContent += " · ↓ HINTS";
  }

  cardCount.textContent = `Card ${currentIndex + 1} of ${cards.length}`;
  knownCount.textContent = `${knownCards.size} known`;
  knownButton.setAttribute("aria-pressed", String(knownCards.has(card.id)));
  knownButton.textContent = knownCards.has(card.id) ? "Known ✓" : "Mark as known";
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === cards.length - 1;
  progress.setAttribute("aria-valuemax", String(cards.length));
  progress.setAttribute("aria-valuenow", String(currentIndex + 1));
  progressFill.style.width = `${((currentIndex + 1) / cards.length) * 100}%`;
}

function checkAnswer() {
  if (graded || answerRevealed) {
    return;
  }

  const card = cards[currentIndex];
  let isCorrect;

  if (card.type === "terminal") {
    const input = document.querySelector("#terminal-answer");
    if (!input.value.trim()) {
      cardFeedback.textContent = "Type an answer before checking.";
      cardFeedback.className = "card-feedback is-prompt";
      cardFeedback.hidden = false;
      input.focus();
      return;
    }

    const acceptedAnswers = card.accepted_answers || [card.answer];
    isCorrect = acceptedAnswers.some(
      (answer) => normalizeAnswer(answer) === normalizeAnswer(input.value),
    );
  } else {
    const correctAnswers = new Set(
      card.options.flatMap((option, index) => (option.correct ? [index] : [])),
    );
    isCorrect = correctAnswers.size === selectedAnswers.size
      && [...correctAnswers].every((index) => selectedAnswers.has(index));

  }

  if (isCorrect) {
    graded = true;
    cardInteraction.querySelector(".button-check").disabled = true;
    cardInteraction.querySelector(".button-show-answer").hidden = true;
    if (card.type === "terminal") {
      document.querySelector("#terminal-answer").disabled = true;
    } else {
      cardInteraction.querySelectorAll(".answer-option").forEach((button, index) => {
        button.disabled = true;
        if (card.options[index].correct) {
          button.querySelector(".option-marker").textContent = "[✓]";
          button.classList.add("is-correct");
        }
      });
    }
    cardFeedback.textContent = "CORRECT";
    cardFeedback.className = "card-feedback is-correct";
  } else {
    attempts += 1;
    cardInteraction.querySelector(".button-show-answer").hidden = attempts < 3;
    cardFeedback.textContent = attempts < 3
      ? `NOT QUITE. TRY AGAIN. (${attempts}/3)`
      : "NOT QUITE. TRY AGAIN OR SHOW THE ANSWER.";
    cardFeedback.className = "card-feedback is-wrong";
  }

  cardFeedback.hidden = false;
  announcer.textContent = cardFeedback.textContent;
}

function revealAnswer() {
  if (graded || answerRevealed) {
    return;
  }

  const card = cards[currentIndex];
  answerRevealed = true;
  cardInteraction.querySelector(".button-check").disabled = true;

  if (card.type === "terminal") {
    document.querySelector("#terminal-answer").disabled = true;
    cardFeedback.textContent = `ANSWER: ${card.answer}`;
  } else {
    cardInteraction.querySelectorAll(".answer-option").forEach((button, index) => {
      button.disabled = true;
      if (card.options[index].correct) {
        button.querySelector(".option-marker").textContent = "[✓]";
        button.classList.add("is-correct");
      }
    });
    const correctLabels = card.options.filter((option) => option.correct).map((option) => option.text);
    const answer = `CORRECT SELECTIONS: ${correctLabels.join("; ")}`;
    cardFeedback.textContent = card.explanation ? `${answer}. ${card.explanation}` : answer;
  }

  cardInteraction.querySelector(".button-show-answer").hidden = true;
  cardFeedback.className = "card-feedback is-answer";
  cardFeedback.hidden = false;
  announcer.textContent = cardFeedback.textContent;
}

function returnToPaths() {
  stage = "home";
  showScreen("home");
  resetScreenScroll();
  scrollTo(document.querySelector(".terminal-shell"));
  pathOptions[selectedPath].focus({ preventScroll: true });
}

function returnToClasses() {
  showScreen("home");
  if (activeCategory === "Red Hat Administration") {
    stage = "admin-courses";
    screens.adminCourses.hidden = false;
    scrollTo(screens.adminCourses);
  } else if (activeCategory === "Ansible") {
    stage = "classes";
    screens.ansible.hidden = false;
    scrollTo(screens.ansible);
  } else {
    stage = "classes";
    screens.classes.hidden = false;
    scrollTo(screens.classes);
  }
  courseOptions[selectedClass].focus({ preventScroll: true });
}

function returnToAdminCertifications() {
  stage = "admin-certifications";
  showScreen("home");
  screens.adminCerts.hidden = false;
  scrollTo(screens.adminCerts);
  certificationOptions[selectedCertification].focus({ preventScroll: true });
}

async function startCourse() {
  const option = courseOptions[selectedClass];
  activeCourse = option.dataset.course;
  if (!option.dataset.deck) {
    showDeckStatus(
      `No deck loaded for ${activeCourse}.`,
      "A course deck can be added alongside its notes.",
      true,
      activeCategory,
    );
    return;
  }

  try {
    const response = await fetch(option.dataset.deck);
    if (!response.ok) {
      throw new Error(`The deck request failed with status ${response.status}.`);
    }
    const deck = await response.json();
    if (!Array.isArray(deck.cards) || deck.cards.length === 0) {
      throw new Error("The deck contains no flashcards.");
    }

    cards = shuffle(deck.cards);
  } catch (error) {
    console.error(`Unable to load the ${activeCourse} flashcard deck.`, error);
    showDeckStatus(
      `Unable to load ${activeCourse}.`,
      error instanceof Error ? error.message : "The deck could not be loaded.",
      true,
      activeCategory,
    );
    return;
  }

  currentIndex = 0;
  knownCards.clear();
  document.querySelector("#study-title").textContent = activeCourse;
  document.querySelector("#deck-notice").textContent = `${cards.length} CARDS · SHUFFLED FROM THE COURSE DECK`;
  stage = "study";
  showScreen("study");
  renderCard();
  resetScreenScroll();
  scrollTo(document.querySelector(".terminal-shell"));
  if (cards[0].type === "terminal") {
    document.querySelector("#terminal-answer").focus({ preventScroll: true });
  } else {
    cardPrompt.focus({ preventScroll: true });
  }
  announcer.textContent = `${activeCourse} deck loaded with ${cards.length} shuffled cards. ${cards[0].question}`;
}

function focusHintOrAnswer() {
  const firstHint = cardHints.querySelector(".hint-button");
  if (firstHint) {
    firstHint.focus();
    return;
  }
  const answer = cardInteraction.querySelector(".answer-option, #terminal-answer");
  answer?.focus();
}

function handleHintNavigation(event) {
  const hints = [...cardHints.querySelectorAll(".hint-button")];
  const hintIndex = hints.indexOf(event.target);
  if (hintIndex < 0 || !["ArrowDown", "ArrowUp"].includes(event.key)) {
    return false;
  }

  event.preventDefault();
  if (event.key === "ArrowDown") {
    if (hintIndex + 1 < hints.length) {
      hints[hintIndex + 1].focus();
    } else {
      cardInteraction.querySelector(".button-check")?.focus();
    }
  } else if (hintIndex > 0) {
    hints[hintIndex - 1].focus();
  } else {
    cardInteraction.querySelector(".button-check")?.focus();
  }
  return true;
}

function handleStudyKeys(event) {
  if (event.target.matches?.(".hint-button") && event.code === "Space") {
    event.preventDefault();
    event.target.click();
    return;
  }

  if (handleHintNavigation(event)) {
    return;
  }

  if (event.key === "ArrowDown" && event.target.id === "terminal-answer") {
    event.preventDefault();
    cardInteraction.querySelector(".button-check")?.focus();
    return;
  }

  if (event.key === "ArrowDown" && event.target === cardPrompt) {
    event.preventDefault();
    cardInteraction.querySelector(".answer-option, #terminal-answer")?.focus();
    return;
  }

  if (event.key === "ArrowDown" && event.target.matches?.(".button-check")) {
    event.preventDefault();
    focusHintOrAnswer();
    return;
  }

  if (event.target.matches?.(".answer-option") && ["ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
    const options = [...cardInteraction.querySelectorAll(".answer-option")];
    const index = options.indexOf(event.target);
    if (event.key === "ArrowDown" && index === options.length - 1) {
      cardInteraction.querySelector(".button-check")?.focus();
    } else if (event.key === "ArrowUp" && index === 0) {
      cardPrompt.focus();
    } else {
      const direction = event.key === "ArrowDown" ? 1 : -1;
      options[index + direction].focus();
    }
    return;
  }

  if (event.key === "Enter" && event.target.id === "terminal-answer") {
    event.preventDefault();
    checkAnswer();
    return;
  }

  if (event.key === "ArrowLeft" && event.target.id !== "terminal-answer") {
    event.preventDefault();
    goToCard(currentIndex - 1);
    return;
  }

  if (event.key === "ArrowRight" && event.target.id !== "terminal-answer") {
    event.preventDefault();
    goToCard(currentIndex + 1);
  }
}

function goToCard(index) {
  if (index < 0 || index >= cards.length || index === currentIndex) {
    return;
  }

  currentIndex = index;
  renderCard();
  announcer.textContent = `Card ${currentIndex + 1} of ${cards.length}. ${cards[currentIndex].question}`;
}

pathOptions.forEach((option, index) => {
  option.addEventListener("click", () => choosePath(index));
});
certificationOptions.forEach((option, index) => {
  option.addEventListener("click", () => {
    selectCertification(index);
    showAdminCourses(option.dataset.certification);
  });
});
courseOptions.forEach((option, index) => {
  option.addEventListener("click", () => {
    selectClass(index);
    startCourse();
  });
});
ansibleCourseOptions.forEach((option, index) => {
  option.addEventListener("click", () => {
    courseOptions = ansibleCourseOptions;
    selectClass(index);
    startCourse();
  });
});

document.querySelector("#back-to-paths").addEventListener("click", returnToPaths);
document.querySelector("#ansible-back").addEventListener("click", returnToPaths);
document.querySelector("#admin-cert-back").addEventListener("click", returnToPaths);
document.querySelector("#admin-course-back").addEventListener("click", returnToAdminCertifications);
document.querySelector("#aap-back").addEventListener("click", () => {
  if (stage === "course-unavailable") {
    returnToClasses();
  } else {
    returnToPaths();
  }
});
document.querySelector("#exit-study").addEventListener("click", returnToClasses);
powerSwitch.addEventListener("click", () => {
  const isPoweredOn = terminalShell.classList.toggle("is-off") === false;
  powerSwitch.setAttribute("aria-pressed", String(isPoweredOn));
  powerSwitch.setAttribute(
    "aria-label",
    isPoweredOn ? "Power off terminal" : "Power on terminal",
  );
  screenContent.setAttribute("aria-hidden", String(!isPoweredOn));
});
previousButton.addEventListener("click", () => goToCard(currentIndex - 1));
nextButton.addEventListener("click", () => goToCard(currentIndex + 1));
knownButton.addEventListener("click", () => {
  const cardId = cards[currentIndex].id;
  if (knownCards.has(cardId)) {
    knownCards.delete(cardId);
  } else {
    knownCards.add(cardId);
  }
  knownCount.textContent = `${knownCards.size} known`;
  knownButton.setAttribute("aria-pressed", String(knownCards.has(cardId)));
  knownButton.textContent = knownCards.has(cardId) ? "Known ✓" : "Mark as known";
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || terminalShell.classList.contains("is-off")) {
    return;
  }

  if (stage === "home" && ["r", "a", "o"].includes(event.key.toLowerCase())) {
    event.preventDefault();
    const nextPath = { r: 0, a: 1, o: 2 }[event.key.toLowerCase()];
    selectPath(nextPath);
    pathOptions[nextPath].focus();
    return;
  }

  if (stage === "home" && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextPath = (selectedPath + direction + pathOptions.length) % pathOptions.length;
    selectPath(nextPath);
    pathOptions[nextPath].focus();
    return;
  }

  if (stage === "admin-certifications" && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    selectCertification(selectedCertification + direction);
    certificationOptions[selectedCertification].focus();
    return;
  }

  if (["classes", "admin-courses"].includes(stage) &&
      (event.key === "ArrowUp" || event.key === "ArrowDown")) {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    selectClass(selectedClass + direction);
    courseOptions[selectedClass].focus();
    return;
  }

  if (event.key === "Escape") {
    if (stage === "classes" || stage === "admin-certifications" || stage === "aap") {
      returnToPaths();
    } else if (stage === "admin-courses") {
      returnToAdminCertifications();
    } else if (stage === "course-unavailable") {
      returnToClasses();
    } else if (stage === "study") {
      returnToClasses();
    }
    return;
  }

  if (stage === "study") {
    handleStudyKeys(event);
  }
});

selectPath(selectedPath);
selectClass(selectedClass);
selectCertification(selectedCertification);
