let gameSeq = [];
let userSeq = [];
const btns = ["yellow", "sky", "purple", "green"];

let started = false;
let level = 0;
let statusText = document.getElementById("status");
let gameInProgress = false;

// Start game
document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  statusText.innerText = `Level ${level}`;

  // Pick random color
  let randColor = btns[Math.floor(Math.random() * btns.length)];
  gameSeq.push(randColor);
  let randbtn = document.getElementById(randColor);
  setTimeout(() => btnFlash(randbtn), 500);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    statusText.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to restart.`;
    reset();
  }
}

function btnPress() {
  if (gameInProgress) return;

  let btn = this;
  btnFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

document.querySelectorAll(".box").forEach(btn => {
  btn.addEventListener("click", btnPress);
});

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  gameInProgress = false;
}

// Loader fade-out effect
window.addEventListener("load", function () {
  setTimeout(function () {
    let overlay = document.getElementById("loaderOverlay");
    let screenEffect = document.getElementById("screenEffect");
    overlay.classList.add("fade-out");
    screenEffect.style.animation = "screenFlicker 0.6s ease-out forwards";
  }, 2000);
});
