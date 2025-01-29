import { nonogramsList } from "../nonogramsList.js";
import { userClick } from "./userClick.js";
import { rightClick } from "./rightClick.js";
export  function removeRightClick(event){
    event.preventDefault();
    rightClick(event);
}
export function createNonogramField(matrix) {
    const downside = document.querySelector('.down-side');
    const nonogramField = document.createElement('div');
    nonogramField.classList.add('nonogram-field');
    downside.appendChild(nonogramField);
    for(let i = 0; i < matrix.length; i++) {
        const fieldLine = document.createElement('div');
        nonogramField.appendChild(fieldLine);
        fieldLine.classList.add('field-line')
        for(let j = 0; j < matrix[i].length; j++){
            const ceil = document.createElement('p');
            ceil.classList.add('ceil');
            ceil.dataset.row = i;
            ceil.dataset.col = j;
            fieldLine.appendChild(ceil);
            ceil.addEventListener('click', userClick);
            ceil.addEventListener('contextmenu', removeRightClick);
            // let touchStartTime;
            // let rightClickCalled = false;

            // ceil.addEventListener('touchstart', (event) => {
            //     touchStartTime = Date.now();
            //     rightClickCalled = false;
            // }, { passive: true });

            // ceil.addEventListener('touchend', (event) => {
            //     event.preventDefault();
            //     const touchDuration = Date.now() - touchStartTime;
            //     if (touchDuration >= 700 && !rightClickCalled) { // 700ms for long press
            //         rightClick(event, matrix);
            //         rightClickCalled = true;
            //     }
            // }, { passive: true });
        };
    };
    
}

