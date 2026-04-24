let target;
let guesses;
let history;

const guessInput = document.getElementById("guess");
const submitBtn = document.getElementById("submitBtn");
const newBtn = document.getElementById("newBtn");
const statusEl = document.getElementById("status");
const countEl = document.getElementById("count");
const historyEl = document.getElementById("history");

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startNewGame() {
    target = randomNumber(1, 100);
    guesses = 0;
    history = [];

    countEl.textContent = guesses;
    historyEl.innerHTML = "";
    statusEl.textContent = "Game started — make your guess!";
    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
}

function updateHistory() {
    historyEl.innerHTML = "";

    history.forEach((num, index) => {
        let div = document.createElement("div");
        div.textContent = `${index + 1}. ${num}`;
        historyEl.appendChild(div);
    });
}

function submitGuess() {
    let num = Number(guessInput.value);

    if (!num || num < 1 || num > 100) {
        statusEl.textContent = "Please enter a valid number (1 to 100)";
        return;
    }

    guesses++;
    history.push(num);

    countEl.textContent = guesses;
    updateHistory();

    if (num > target) {
        statusEl.textContent = "Lower number please ↓";
    } 
    else if (num < target) {
        statusEl.textContent = "Higher number please ↑";
    } 
    else {
        statusEl.textContent = `Congratulations! You guessed it in ${guesses} guesses 🎉`;
        guessInput.disabled = true;
        submitBtn.disabled = true;
    }

    guessInput.value = "";
}

submitBtn.addEventListener("click", submitGuess);
newBtn.addEventListener("click", startNewGame);

guessInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        submitGuess();
    }
});

startNewGame();