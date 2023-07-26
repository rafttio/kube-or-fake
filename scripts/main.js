import './hint.js';
import {restartGameBoard, showNextWord} from './board.js';

async function start() {
    await showNextWord();
}

window.onresize = function () {
    const img = document.getElementById("game-title-image");
    img.style.maxWidth = "800px";
}

document.getElementById("instructions").addEventListener("click", async (e) => {
    const targetClass = e.target.classList;
    if (targetClass.contains("ready-button")) {
        document.getElementById("instructions").classList.add("hidden");
        restartGameBoard();
        await start();
    }
});
