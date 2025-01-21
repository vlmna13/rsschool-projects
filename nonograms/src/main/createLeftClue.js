import { nonogramsList } from "../nonogramsList.js";

export function createLeftClue(matrix) {
    const upside = document.querySelector('.up-side');
    const upClue = document.createElement('div');
    upClue.classList.add('up-clue');
    const empty = document.createElement('div');
    empty.classList.add('empty');

    upside.appendChild(empty);
    upside.appendChild(upClue);
    // let choosedLevel = level;
    // let nonogramVariant = nonogramsList[choosedLevel][variant];
    for(let i = 0; i < matrix.length; i++) {
        const upclueLine = document.createElement('div');
        upclueLine.classList.add('up-clue-line');
        upClue.appendChild(upclueLine);
        let counter = 0;
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === 1) {
                counter += 1;
            } else {
                if (counter > 0) {
                    const clueEl = document.createElement('p');
                    clueEl.classList.add('clue-el');
                    clueEl.textContent = counter;
                    upclueLine.appendChild(clueEl);
                    counter = 0;
                }
            }
        }
        if (counter > 0) {
            const clueEl = document.createElement('p');
            clueEl.classList.add('clue-el');
            clueEl.textContent = counter;
            upclueLine.appendChild(clueEl);
        }
    }
}