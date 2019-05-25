let deckOfCards = [ "fa-diamond", 
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
                ]

const cardContainer = document.querySelector(".deck")

shuffle(deckOfCards);

for (let i = 0; i <= 15; i++) {
    const cardListItem = document.createElement('li');
    const card = document.createElement('i');
    const cardType = deckOfCards[i];
    // deckOfCards = shuffle(deckOfCards);
    
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const allCards = document.querySelectorAll(".card");
const movesElement = document.querySelector(".moves")
const restartElement = document.querySelector(".restart")
const timerElement = document.querySelector(".timer")
const starsElement = document.querySelector(".stars")
let openCards = []
let correctMatches = 0
let movesCount = 0
let starsCount = 3
let winningStars = 0;
let winningTime = 0;
let winningMoves = 0;
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

allCards.forEach( (card) => {
    card.addEventListener("click", () => {
        openCards.push(card);
        if (openCards.length <= 2) {
            card.classList.add("open", "show"); 
        }
        if (openCards.length === 2 && openCards[0].dataset.card != openCards[1].dataset.card) {
            hideCards()
            moves()
            stars()
        }
        if (openCards.length === 2 && openCards[0].dataset.card == openCards[1].dataset.card) {
            openCards.forEach( (card) => {
                card.classList.add("match")
            });
            correctMatches += 1;
            openCards = [];
            winningTime = timerElement.textContent;
            timerElement.textContent = winningTime;
            stars()
        }
        if (correctMatches === 8) {
            let winningStarsElement = document.querySelector(".winning-stars");
            let winningTimeElement = document.querySelector(".winning-time");
            let winningMovesElement = document.querySelector(".winning-moves");
            winningStarsElement.textContent = starsCount;
            winningTimeElement.textContent = winningTime;
            winningMovesElement.textContent = movesCount;
            startConfetti();
            MicroModal.show('modal-1')
        }
    })
})

restartElement.addEventListener("click", () => {
    newGame()
})

setInterval(setTime, 1000);

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

hideCards = () => {
    openCards.forEach( (card) => {
            card.classList.add("wrong");
    })
    setTimeout(() => {
        openCards.forEach( (card) => {
            card.classList.remove("open", "show", "wrong");
        })
        openCards = [];
    }, 800);
}

moves = () => {
    movesCount += 1;
    movesElement.textContent = movesCount;
}

newGame = () => {
    movesCount = 0
    openCards = []
    movesElement.textContent = movesCount;
    allCards.forEach( (card) => {
        card.classList.remove("open", "show", "match")
    })
    stopConfetti();
}

stars = () => {
    if (movesCount === 8) {
        starsElement.children[2].childNodes[0].className += " fa-star-o";
    } else if (movesCount === 12) {
        starsElement.children[1].childNodes[0].className += " fa-star-o";
    }
}
