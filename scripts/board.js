import {requestWord, getCurrentWord} from "./words.js";
import {showResultCorrect, showResultIncorrect, showVerdict} from "./result.js";
import {getWordsPlayed, incrementScore, incrementWordsPlayed, maxWordsPlayed} from "./score.js";

export function hideGameBoard() {
    document.getElementById("game-board").classList.add("hidden");
    document.getElementById("game-board-header").classList.add("hidden");
    document.getElementById("ask-for-hint").classList.add("hidden");
    document.getElementById("hint").classList.add("hidden");
}

export function restartGameBoard() {
    document.getElementById("game-board-header").classList.remove("hidden");
    document.getElementById("generated-word").innerHTML = "";
    document.getElementById("ask-for-hint").classList.remove("hidden");
    document.getElementById("question").innerHTML = `<b>[${getWordsPlayed() + 1}/${maxWordsPlayed}]</b> Is the word below a Kubernetes term or an AI hallucination?`;
}

export function iterateDots(document) {
    let dotsStr = document.innerHTML;
    if (dotsStr === undefined) {
        dotsStr = '.';
    }
    const dotsLen = dotsStr.length;
    const maxDots = 3;
    document.innerHTML = (dotsLen < maxDots ? dotsStr + '.' : '.');
}

export async function showNextWord() {
    const generatedWordElement = document.getElementById("generated-word");
    generatedWordElement.classList.add("waiting")
    const interval = setInterval(() => iterateDots(generatedWordElement), 200);

    requestWord()
        .then(async (result) => {
            clearInterval(interval);
            generatedWordElement.classList.remove("waiting");
            generatedWordElement.innerHTML = result.word;
            document.getElementById("game-board").classList.remove("hidden");
            incrementWordsPlayed();
        })
        .catch(() => {
            toastr.error('Unable to generate a new word 😥', "Error!");
        });
}

function checkGuess(guess) {
    const correctGuess = guess === getCurrentWord().isReal;
    hideGameBoard();
    if (correctGuess) {
        incrementScore();
        showResultCorrect();
    } else {
        showResultIncorrect();
    }
    showVerdict();
    document.getElementById("game-result").classList.add("visible");
}

document.getElementById("game-board").addEventListener("click", (e) => {
    const targetClass = e.target.classList;
    if (targetClass.contains("kube-button")) {
        checkGuess(true);
    } else if (targetClass.contains("fake-button")) {
        checkGuess(false);
    }
});
