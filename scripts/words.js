const GENERATOR_URL = 'https://ekdp3n2ypfw5x4qvbh7xq4j5du0vmbmc.lambda-url.us-east-1.on.aws';

let currentWord = {
    word: undefined,
    isReal: undefined,
    description: undefined,
};

export async function requestWord() {
    const response = await fetch(GENERATOR_URL);
    currentWord = await response.json();
    return currentWord;
}

export function getCurrentWord() {
    return currentWord;
}
