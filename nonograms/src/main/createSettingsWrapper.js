import { resetGame } from "./resetGame.js";
import { showSolution } from "./showSolution.js";
import { randomGame } from "./randomGame.js";
import { saveGame } from "./saveGame.js";
import { previousGame } from "./previousGame.js";

export function createSetttingsWrapper(){
    const main = document.querySelector('.main');
    const settingsWrapper = document.createElement('div');
    settingsWrapper.classList.add('settings-wrapper');
    main.appendChild(settingsWrapper);

    const resetButton = document.createElement('button');
    resetButton.classList.add('settings-button', 'reset');
    resetButton.textContent = 'reset game';
    settingsWrapper.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame)

    const saveButton = document.createElement('button');
    saveButton.classList.add('settings-button', 'save');
    saveButton.textContent = 'save game';
    settingsWrapper.appendChild(saveButton);
    saveButton.addEventListener('click', saveGame);

    const randomButton = document.createElement('button');
    randomButton.classList.add('settings-button', 'random');
    randomButton.textContent = 'random game';
    settingsWrapper.appendChild(randomButton);
    randomButton.addEventListener('click', randomGame);

    const solutionButton = document.createElement('button');
    solutionButton.classList.add('settings-button', 'solution');
    solutionButton.textContent = 'show solution';
    settingsWrapper.appendChild(solutionButton);
    solutionButton.addEventListener('click', showSolution);

    const previousButton = document.createElement('button');
    previousButton.classList.add('settings-button', 'previous');
    previousButton.textContent = 'previous game';
    settingsWrapper.appendChild(previousButton);
    previousButton.addEventListener('click', previousGame)
}