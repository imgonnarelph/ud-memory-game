let deckOfCards = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
];

const cardContainer = document.querySelector(".deck");

shuffle(deckOfCards);

for (let i = 0; i <= deckOfCards.length - 1; i++) {
  const cardListItem = document.createElement("li");
  const card = document.createElement("i");
  const cardType = deckOfCards[i];

  cardListItem.className = "card";
  cardListItem.dataset.card = cardType;

  card.className = "fa " + cardType;
  cardListItem.appendChild(card);
  cardContainer.appendChild(cardListItem);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const allCards = document.querySelectorAll(".card");
const movesElement = document.querySelector(".moves");
const restartElement = document.querySelector(".restart");
const timerElement = document.querySelector(".timer");
const starsElement = document.querySelector(".stars");
const winningStarsElement = document.querySelector(".winning-stars");
const winningTimeElement = document.querySelector(".winning-time");
const winningMovesElement = document.querySelector(".winning-moves");
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const playAgainButton = document.querySelector(".js-play-again-button");
let openCards = [];
let correctMatches = 0;
let movesCount = 0;
let starsCount = 3;
let winningTime = 0;
let totalSeconds = 0;

allCards.forEach(card => {
  card.addEventListener("click", () => {
    openCards.push(card);
    if (openCards.length <= 2) {
      showCards(card);
    }
    if (
      openCards.length === 2 &&
      openCards[0].dataset.card != openCards[1].dataset.card
    ) {
      hideCards();
      moves();
      stars();
    }
    if (
      openCards.length === 2 &&
      openCards[0].dataset.card == openCards[1].dataset.card
    ) {
      matchCards();
      moves();
      stars();
    }
    if (correctMatches === 8) {
      gameOver();
    }
  });
});

restartElement.addEventListener("click", () => {
  initGame();
});

playAgainButton.addEventListener("click", () => {
  MicroModal.close("modal-1");
  initGame();
});

initGame = () => {
  movesCount = 0;
  openCards = [];
  correctMatches = 0;
  movesElement.textContent = movesCount;
  allCards.forEach(card => {
    card.classList.remove("open", "show", "match", "wrong");
  });
  starsElement.children[2].childNodes[0].classList.remove("fa-star-o");
  starsElement.children[1].childNodes[0].classList.remove("fa-star-o");
  starsElement.children[0].childNodes[0].classList.remove("fa-star-o");
  stopConfetti();
  resetTimer();
};

let timer = setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

stopTimer = () => {
  clearInterval(timer);
};

resetTimer = () => {
  totalSeconds = 0;
  clearInterval(timer);
  timer = setInterval(setTime, 1000);
};

showCards = card => {
  card.classList.add("open", "show");
};

hideCards = () => {
  openCards.forEach(card => {
    card.classList.add("wrong");
  });
  setTimeout(() => {
    openCards.forEach(card => {
      card.classList.remove("open", "show", "wrong");
    });
    openCards = [];
  }, 800);
};

matchCards = () => {
  openCards.forEach(card => {
    card.classList.add("match");
  });
  correctMatches += 1;
  openCards = [];
};

gameOver = () => {
  stopTimer();
  winningTime = timerElement.textContent;
  winningStarsElement.textContent = starsCount;
  winningTimeElement.textContent = winningTime;
  winningMovesElement.textContent = movesCount;
  startConfetti();
  MicroModal.show("modal-1");
};

moves = () => {
  movesCount += 1;
  movesElement.textContent = movesCount;
};

stars = () => {
  if (movesCount >= 9 && movesCount < 12) {
    starsElement.children[2].childNodes[0].className += " fa-star-o";
    starsCount = 2;
  } else if (movesCount > 12 && movesCount < 15) {
    starsElement.children[1].childNodes[0].className += " fa-star-o";
    starsCount = 1;
  } else if (movesCount > 15) {
    starsElement.children[0].childNodes[0].className += " fa-star-o";
    starsCount = 0;
  }
};

initGame();
