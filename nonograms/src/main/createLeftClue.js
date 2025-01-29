import { nonogramsList } from "../nonogramsList.js";

export function createLeftClue(matrix) {
    const downside = document.querySelector('.down-side');
    const leftClue = document.createElement('div');
    leftClue.classList.add('left-clue');
    downside.appendChild(leftClue);
    for(let i = 0; i < matrix.length; i++) {
        const leftclueLine = document.createElement('div');
        leftclueLine.classList.add('left-clue-line');
        leftClue.appendChild(leftclueLine);
        let counter = 0;
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === 1) {
                counter += 1;
            } else {
                if (counter > 0) {
                    const clueEl = document.createElement('p');
                    clueEl.classList.add('clue-el');
                    clueEl.textContent = counter;
                    leftclueLine.appendChild(clueEl);
                    counter = 0;
                }
            }
        }
        if (counter > 0) {
            const clueEl = document.createElement('p');
            clueEl.classList.add('clue-el');
            clueEl.textContent = counter;
            leftclueLine.appendChild(clueEl);
        }
    }
}