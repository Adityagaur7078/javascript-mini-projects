let game_board = document.querySelector(".game-board");

let moves = document.querySelector(".moves");

let matched = document.querySelector(".matched");

let timer = document.querySelector(".timer");

let restart_btn = document.querySelector(".restart-btn");

let message = document.querySelector(".message");

const emojis = [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍒",
    "🥝",
    "🍍",
    "🥥"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moveCount = 0;
let matchedPairs = 0;

let seconds = 0;
let timerInterval = null;
let gameStarted = false;



// ============================
// TIMER
// ============================

function startTimer() {

    if (gameStarted) return;

    gameStarted = true;

    timerInterval = setInterval(function () {

        seconds++;

        let min = String(Math.floor(seconds / 60)).padStart(2, "0");

        let sec = String(seconds % 60).padStart(2, "0");

        timer.textContent = `${min}:${sec}`;

    }, 1000);

}



// ============================
// SHUFFLE
// ============================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}



// ============================
// CREATE BOARD
// ============================

function createBoard() {

    game_board.innerHTML = "";

    cards = [...emojis, ...emojis];

    shuffle(cards);

    cards.forEach(function (emoji) {

        let div = document.createElement("div");

        div.className = "memory-card";

        div.dataset.emoji = emoji;

        div.textContent = "?";

        game_board.appendChild(div);

        div.addEventListener("click", flipCard);

    });

}



// ============================
// FLIP CARD
// ============================

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    startTimer();

    this.classList.add("flipped");

    this.textContent = this.dataset.emoji;

    if (!firstCard) {

        firstCard = this;

        return;

    }

    secondCard = this;

    moveCount++;

    moves.textContent = moveCount;

    checkMatch();

}



// ============================
// CHECK MATCH
// ============================

function checkMatch() {

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {

        firstCard.classList.add("matched");

        secondCard.classList.add("matched");

        matchedPairs++;

        matched.textContent = `${matchedPairs} / 8`;

        resetSelection();

        if (matchedPairs === 8) {

            clearInterval(timerInterval);

            message.textContent = "🎉 You Won!";

        }

    } else {

        lockBoard = true;

        setTimeout(function () {

            firstCard.classList.remove("flipped");

            secondCard.classList.remove("flipped");

            firstCard.textContent = "?";

            secondCard.textContent = "?";

            resetSelection();

        }, 800);

    }

}



// ============================
// RESET SELECTION
// ============================

function resetSelection() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}



// ============================
// RESTART GAME
// ============================

restart_btn.addEventListener("click", function () {

    clearInterval(timerInterval);

    seconds = 0;

    timer.textContent = "00:00";

    gameStarted = false;

    moveCount = 0;

    matchedPairs = 0;

    moves.textContent = "0";

    matched.textContent = "0 / 8";

    message.textContent = "";

    firstCard = null;

    secondCard = null;

    lockBoard = false;

    createBoard();

});



// ============================
// INITIAL
// ============================

createBoard();