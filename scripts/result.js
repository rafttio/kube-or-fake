import {getCurrentWord} from "./words.js";
import {hideGameBoard, iterateDots, restartGameBoard, showNextWord} from "./board.js";
import {gameOver, generateScoreResponse, getScore, maxWordsPlayed} from "./score.js";

function hideResult() {
    document.getElementById("game-result").classList.remove("visible");
}

export function showResultCorrect() {
    const resultElement = document.getElementById("result");
    resultElement.classList.remove("wrong");
    resultElement.classList.add("correct");
    resultElement.innerHTML = "✔ Correct!";
    toastr.success("You did it 👊");
}

export function showResultIncorrect(message = "✗ Wrong!") {
    const resultElement = document.getElementById("result");
    resultElement.classList.remove("correct");
    resultElement.classList.add("wrong");
    resultElement.innerHTML = message;
    toastr.info("Close but no cigar 🙃");
}

export function showErrorMessage() {
    hideGameBoard();
    showResultIncorrect("Encountered error while generating a word 😥");
    document.getElementById("game-result").classList.add("visible");
}

export function showVerdict() {
    const verdictElement = document.getElementById("verdict");
    const currentWord = getCurrentWord();
    if (currentWord.isReal) {
        verdictElement.innerHTML = currentWord.description;
    } else {
        verdictElement.innerHTML = `<b>${currentWord.word} is an AI hallucination.</b> ChatGPT describes it as:<p>
${currentWord.description}`;
    }
}

async function showScore() {
    const scoreResponseElement = document.getElementById("score-response");
    const interval = setInterval(() => iterateDots(scoreResponseElement), 200);

    generateScoreResponse()
        .then(async (result) => {
            clearInterval(interval);
            scoreResponseElement.innerHTML = result;
        });

    const score = getScore();
    const scoreElement = document.getElementById("score");
    scoreElement.innerHTML = `You got ${score} out of ${maxWordsPlayed}!`
}

function createShareButtons() {
    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));
    document.getElementById("twitter-share").innerHTML = `<a class="twitter-share-button"
href="https://twitter.com/intent/tweet?url=https://kube-or-fake.raftt.io&text=I got ${getScore()} out of ${maxWordsPlayed}, can you do better%3F&hashtags=kubernetes,raftt,chatgpt,minigame"
data-size="large" target="_blank">Tweet</a>`;
}

document.getElementById("game-result").addEventListener("click", async (e) => {
    const targetClass = e.target.classList;
    if (targetClass.contains("next-word-button")) {
        if (gameOver()) {
            createShareButtons()
            document.getElementById("next-word").classList.add("hidden");
            document.getElementById("intermediate-result").classList.add("hidden");
            document.getElementById("post-game").classList.remove("hidden");
            await showScore();
        } else {
            hideResult();
            restartGameBoard()
            await showNextWord();
        }
    }
});
