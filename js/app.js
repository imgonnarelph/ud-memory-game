/*
 * Create a list that holds all of your cards
 */
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


const cardContainer = document.querySelector(".deck")

for (let i = 1; i <= 16; i++) {
    const newCardList = document.createElement('li');
    const card = document.createElement('i');
    const cardType = deckOfCards[i];
    newCardList.className = "card";
    newCardList.dataset.card = cardType;
    deckOfCards = shuffle(deckOfCards);
    card.className = "fa " + cardType;
    newCardList.appendChild(card);
    cardContainer.appendChild(newCardList);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
let openCards = [];
let movesCount = 0

allCards.forEach( (card) => {
    card.addEventListener("click", () => {
        openCards.push(card);
        
        if (openCards.length <= 2) {
            card.classList.add("open", "show"); 
        }
        if (openCards.length === 2 && openCards[0].dataset.card != openCards[1].dataset.card) {
            setTimeout(() => {
                openCards.forEach( (card) => {
                    card.classList.remove("open", "show");
                })
                openCards = [];
            }, 1000);
            movesFunction()
        }
        if (openCards.length === 2 && openCards[0].dataset.card == openCards[1].dataset.card) {
            openCards.forEach( (card) => {
                card.classList.add("match")
            });
            startConfetti()
        }
    })
})

restartElement.addEventListener("click", () => {
    restartGame()
})

movesFunction = () => {
    movesCount += 1;
    movesElement.textContent = movesCount;
}

restartGame = () => {
    movesCount = 0
    movesElement.textContent = movesCount;
    allCards.forEach( (card) => {
        card.classList.remove("open", "show")
    })
}

