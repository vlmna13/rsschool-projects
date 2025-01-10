import { defaultParameters } from "../../index.js";

export function createKeyboard() {
    const keyWrapper = document.querySelector('.key-wrapper');
    keyWrapper.innerHTML = '';
    const lineWrapper = document.createElement('div');
    lineWrapper.classList.add('line-wrapper');
    keyWrapper.appendChild(lineWrapper);
    for(let i = 0; i <= defaultParameters.data.length -1; i++) {
        const key = document.createElement('button');
        key.classList.add('key');
        key.dataset.index = defaultParameters.data[i].code;
        key.innerText = defaultParameters.data[i].inside;

        // key.addEventListener('click', function(){
        //     if(stateGame.isGameStarted) {
        //         field.innerText += key.innerText;
        //     }
        // })
        lineWrapper.appendChild(key);
    }
}