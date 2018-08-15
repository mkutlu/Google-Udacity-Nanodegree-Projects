/*
 * Create a list that holds all of your cards
 */
var arr = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle",
    "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var roundMoveCheck;
var openedCard;
var cardElement;
var totalMatched;
var totalMoves;
var movesElement;
var deck;
var cancel;
var seconds;
var defaultStars = document.getElementsByClassName('stars')[0].innerHTML;

function shuffleDeck() { //I create function because i will use it for restart button.
    roundMoveCheck = 0;
    openedCard = "";
    cardElement;
    totalMatched = 0;
    totalMoves = 0;
    seconds = 0;
    clearInterval(cancel);
    document.getElementsByClassName('stars')[0].innerHTML = defaultStars;
    movesElement = document.getElementsByClassName('moves')[0];
    movesElement.innerText = "0";
    arr = shuffle(arr);
    deck = document.getElementsByClassName("deck")[0];
    deck.innerHTML = "";
    document.getElementById('timer').innerHTML = "0";
    for (let i = 0; i < 16; i++) {
        let card = document.createElement('li');
        card.classList.add('card');

        let inner = document.createElement('i');
        inner.classList.add('fa');
        inner.classList.add(arr[i]);

        card.appendChild(inner);
        deck.appendChild(card);
    }
}
shuffleDeck();
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

//second countup https://stackoverflow.com/questions/37187504/javascript-second-counter
function countUpTimer() {
    seconds = 0;
    var el = document.getElementById('timer');
    var decFactor = 3;
    function incrementSeconds() {
        seconds += 1;
        el.innerText = seconds;
        if (seconds * totalMoves > 600 && seconds * totalMoves < 1200) {
            if (decFactor === 3) {
                decFactor = 2;
                let starsElement = document.getElementsByClassName('stars')[0];
                starsElement.removeChild(starsElement.childNodes[0]);
            } else {

            }
        } else if (seconds * totalMoves > 1200 && seconds * totalMoves < 1800) {
            if (decFactor === 2) {
                decFactor = 1;
                let starsElement = document.getElementsByClassName('stars')[0];
                starsElement.removeChild(starsElement.childNodes[0]);
            } else {

            }
        }
    }
    cancel = setInterval(incrementSeconds, 1000);
}


deck.addEventListener('click', revealCard);

function revealCard(event) {
    if (!event.target.classList.contains('open') && event.target.tagName === "LI") {
        if (totalMoves === 0)
            countUpTimer();
        totalMoves++;
        movesElement.innerText = totalMoves;
        roundMoveCheck++;
        event.target.classList.add('open');
        event.target.classList.add('show');
        if (roundMoveCheck === 1) { //If it is player's first card try then just reveal card
            openedCard = event.target.querySelector('i').classList.item(1);
            cardElement = event.target;
            console.log("pressed card type : " + openedCard);
        } else { //check 
            const cardType = event.target.querySelector('i').classList.item(1);
            console.log("pressed card type : " + cardType);
            if (cardType === (openedCard)) {
                event.target.classList.add('match');
                cardElement.classList.add('match');
                event.target.classList.remove('open');
                event.target.classList.remove('show');
                totalMatched++;
                if (totalMatched === 8) { //Game
                    clearInterval(cancel);
                    document.getElementById('result-time').innerText = document.getElementById('timer').innerText;
                    document.getElementById('result-star').innerHTML = document.getElementsByClassName('stars')[0].innerHTML;
                    $("#resultModal").modal();
                }
            } else {
                setTimeout(function () {
                    turnBackwithDelay(event);
                }, 700);
            }
            roundMoveCheck = 0;
        }
    }
}

function turnBackwithDelay(event) {
    cardElement.classList.remove('open');
    cardElement.classList.remove('show');
    event.target.classList.remove('open');
    event.target.classList.remove('show');
    console.log(event.target.querySelector('i').classList.item(1) + " and " + cardElement.querySelector('i').classList.item(1) + " classes deleted");
}

//when restart clicked, shuffleDeck function triggers. 
document.getElementsByClassName('restart')[0].addEventListener('click', shuffleDeck);


