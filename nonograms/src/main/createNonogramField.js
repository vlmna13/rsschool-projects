import { nonogramsList } from "../nonogramsList.js";

export function createNonogramField(variant, level) {
    let choosedLevel = level;
    let nonogramVariant = nonogramsList[choosedLevel][variant];
    const downside = document.querySelector('.down-side');
    const nonogramField = document.createElement('div');
    nonogramField.classList.add('nonogram-field');
    downside.appendChild(nonogramField);

    for(let i = 0; i < nonogramVariant.length; i++) {
        const fieldLine = document.createElement('div');
        nonogramField.appendChild(fieldLine);
        fieldLine.classList.add('field-line')
        for(let j = 0; j < nonogramVariant[i].length; j++){
            const ceil = document.createElement('p');
            ceil.classList.add('ceil');
            ceil.dataset.row = i;
            ceil.dataset.col = j;
            fieldLine.appendChild(ceil);
            ceil.addEventListener('click', function(){
                console.log('click');
            })
        }
    }
}

