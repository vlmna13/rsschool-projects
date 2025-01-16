import { defaultParameters } from "../../index.js";
import { checkInput } from "../checkInput.js";

export function createKeyboard() {
    const keyWrapper = document.querySelector('.key-wrapper');
    const lineWrapper = document.createElement('div');
    if(keyWrapper.childNodes.length != 0) {
        keyWrapper.childNodes.forEach(el => {
            el.remove();
        })
    }
    lineWrapper.classList.add('line-wrapper');
    keyWrapper.appendChild(lineWrapper);
    const field = document.querySelector('.field');
    for(let i = 0; i <= defaultParameters.data.length -1; i++) {
        const key = document.createElement('button');
        key.classList.add('key', `${defaultParameters.level}`);
        key.dataset.index = defaultParameters.data[i].code;
        key.textContent = defaultParameters.data[i].inside;
        key.disabled = true;
        key.addEventListener('click', function(){
            if(defaultParameters.isPressed){
                return;
            }
            field.textContent += key.textContent;
            const fback = document.querySelector('.feed-back');
            fback.textContent = '';
            checkInput(key.textContent);
        });
        lineWrapper.appendChild(key);
    }
}