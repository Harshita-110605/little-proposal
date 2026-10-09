/*
  PERSONALIZE THIS OBJECT first.
  Keep the text inside quotes. You can change names and messages without changing the code below.
*/
const CONFIG = {
  hisName: "Yogesh",
  herName: "Sanjana",
  pageTitle: "A Little Something for You 💌"
};

document.title = CONFIG.pageTitle;
document.querySelectorAll("[data-his-name]").forEach((node) => {
  node.textContent = CONFIG.hisName;
});
document.querySelectorAll("[data-her-name]").forEach((node) => {
  node.textContent = CONFIG.herName;
});

const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach((screen) => {
    const isTarget = screen.id === id;
    screen.classList.toggle("active", isTarget);
    screen.hidden = !isTarget;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (id === "final-screen") burstHearts(24);
}

document.getElementById("open-letter").addEventListener("click", () => {
  showScreen("letter-screen");
  burstHearts(8);
});

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.next));
});

// Clickable gifts reveal a different message each time.
const giftMessage = document.getElementById("gift-message");
document.querySelectorAll(".gift").forEach((gift) => {
  gift.addEventListener("click", () => {
    gift.classList.add("opened");
    giftMessage.textContent = gift.dataset.message;
    gift.setAttribute("aria-pressed", "true");
    burstHearts(5);
  });
});

// A playful quiz: every answer leads to a sweet response, without a wrong answer.
const quizFeedback = document.getElementById("quiz-feedback");
document.querySelectorAll(".answer").forEach((answer) => {
  answer.addEventListener("click", () => {
    document.querySelectorAll(".answer").forEach((item) => item.classList.remove("selected"));
    answer.classList.add("selected");
    const replies = {
      A: "Correct answer: your smile deserves its own fan club. 😊",
      B: "Correct answer: your kind heart is one of a kind. 🫶",
      C: "You figured it out… trick question! It's all of you. 💗"
    };
    quizFeedback.textContent = replies[answer.dataset.answer];
    burstHearts(4);
  });
});

// Respectful proposal responses: the page celebrates a yes but doesn't pressure an answer.
const responseBox = document.getElementById("response-box");
document.getElementById("yes-button").addEventListener("click", () => {
  responseBox.hidden = false;
  responseBox.textContent = "This is such a beautiful beginning. 💖 Now go find me so we can talk about all the tomorrows!";
  burstHearts(36);
});
document.getElementById("think-button").addEventListener("click", () => {
  responseBox.hidden = false;
  responseBox.textContent = "Of course. Take all the time you need. This question deserves an honest conversation, and I'd love to hear how you feel. 💌";
});
document.getElementById("replay-button").addEventListener("click", () => {
  responseBox.hidden = true;
  showScreen("welcome-screen");
});

// Lightweight decorative heart animation, created locally with CSS (no API).
function burstHearts(count) {
  const layer = document.getElementById("sparkle-layer");
  const symbols = ["💗", "💕", "♡", "✨", "💖"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${2.4 + Math.random() * 2.4}s`;
    layer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

// A gentle ambient heart sprinkle while the page is open.
setInterval(() => {
  const layer = document.getElementById("sparkle-layer");
  if (layer.childElementCount < 14) burstHearts(1);
}, 1800);
