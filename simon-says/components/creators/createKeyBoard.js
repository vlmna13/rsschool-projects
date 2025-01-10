import { defaultParameters } from "../../index.js";

export function createKeyboard() {
    const keyWrapper = document.querySelector('.key-wrapper');
    keyWrapper.innerHTML = '';
    const lineWrapper = document.createElement('div');
    lineWrapper.classList.add('line-wrapper');
    keyWrapper.appendChild(lineWrapper);
    const field = document.querySelector('.field');
    for(let i = 0; i <= defaultParameters.data.length -1; i++) {
        const key = document.createElement('button');
        key.classList.add('key', `${defaultParameters.level}`);
        key.dataset.index = defaultParameters.data[i].code;
        key.innerText = defaultParameters.data[i].inside;
        key.disabled = 'true';
        key.addEventListener('click', function(){
            field.innerText += key.innerText;
        });
        lineWrapper.appendChild(key);
    }
}