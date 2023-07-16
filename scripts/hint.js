import {getCurrentWord} from "./words.js";

function showHint() {
    document.getElementById("ask-for-hint").classList.add("hidden");
    const hintElement = document.getElementById("hint");
    hintElement.innerHTML = `ChatGPT describes ${getCurrentWord().word} as:<br><br>
<i>"${getCurrentWord().description}"</i>`;
    hintElement.classList.remove("hidden");
}

function onHintRequested(e) {
    const targetClass = e.target.classList;
    if (targetClass.contains("hint-button") || targetClass.contains("lightbulb")) {
        showHint();
    }
}

document.getElementById("ask-for-hint").addEventListener("click", onHintRequested);
