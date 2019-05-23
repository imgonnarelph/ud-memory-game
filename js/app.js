/*
 * Create a list that holds all of your cards
 */
let deckOfCards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


const cardContainer = document.createElement('ul');
cardContainer.className = "deck";

for (let i = 1; i <= 16; i++) {
    const newCardList = document.createElement('li');
    const card = document.createElement('i');

    newCardList.className = "card";
    card.className = "fa " + deckOfCards[i];
    newCardList.appendChild(card);
    console.log(newCardList)

    // deckOfCards = shuffle(deckOfCards);
    // console.log(deckOfCards);
}

document.querySelector(".deck").appendChild(cardContainer);

const deckCard = document.querySelectorAll(".card");

deckCard.addEventListener("click", function() {
    deckCard.classList.toggle("open");
    deckCard.classList.toggle("show");
})

for (i = 1; i >= 16; i++) {

}

// Shuffle function from http://stackoverflow.com/a/2450976
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