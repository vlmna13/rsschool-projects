import { nonogramsList } from "../nonogramsList.js";

export function createNonogramField(variant) {
    const allLevels = document.querySelectorAll('.level');
    let level;
    allLevels.forEach(el => {
        if(el.classList.contains('active')){
            level = el.textContent;
        }
    })
    let nonogramVariant = nonogramsList[level][variant];
    const nonogramField = document.querySelector('.nonogram-field');
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

