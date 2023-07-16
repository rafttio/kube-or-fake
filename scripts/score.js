let wordsPlayed = 0;
let score = 0;
export const maxWordsPlayed = 5;

export function incrementWordsPlayed() {
    wordsPlayed++;
}

export function incrementScore() {
    score++;
}

export function getWordsPlayed() {
    return wordsPlayed;
}

export function getScore() {
    return score;
}

export function gameOver() {
    return wordsPlayed === maxWordsPlayed;
}

export async function generateScoreResponse() {
    const response = await fetch("https://h7efusxk34qx3xkiilys443hsy0odrlk.lambda-url.us-east-1.on.aws/?" + new URLSearchParams({
        score: score,
        played: maxWordsPlayed,
    }));
    return await response.text();
}
