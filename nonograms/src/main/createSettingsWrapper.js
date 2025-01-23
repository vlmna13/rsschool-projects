export function createSetttingsWrapper(){
    const main = document.querySelector('.main');
    const settingsWrapper = document.createElement('div');
    settingsWrapper.classList.add('settings-wrapper');
    main.appendChild(settingsWrapper);

    const resetButton = document.createElement('button');
    resetButton.classList.add('settings-button', 'reset');
    resetButton.textContent = 'reset game';
    settingsWrapper.appendChild(resetButton);

    const saveButton = document.createElement('button');
    saveButton.classList.add('settings-button', 'save');
    saveButton.textContent = 'save game';
    settingsWrapper.appendChild(saveButton);

    const randomButton = document.createElement('button');
    randomButton.classList.add('settings-button', 'random');
    randomButton.textContent = 'random game';
    settingsWrapper.appendChild(randomButton);

    const solutionButton = document.createElement('button');
    solutionButton.classList.add('settings-button', 'solution');
    solutionButton.textContent = 'show solution';
    settingsWrapper.appendChild(solutionButton);

    const previousButton = document.createElement('button');
    previousButton.classList.add('settings-button', 'previous');
    previousButton.textContent = 'previous game';
    settingsWrapper.appendChild(previousButton);
}