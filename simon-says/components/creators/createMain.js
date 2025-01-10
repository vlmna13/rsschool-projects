import { defaultParameters } from "../../index.js";
import { createKeyboard } from "./createKeyBoard.js";

export function createMain() {
    const body = document.querySelector('body');
    const main = document.createElement('main');
    main.classList.add('main-wrapper');
    body.appendChild(main);
    const field = document.createElement('p');
    field.classList.add('field', 'easy');
    main.appendChild(field);
    const keyWrapper = document.createElement('div');
    keyWrapper.classList.add('key-wrapper');
    main.appendChild(keyWrapper);
    // createKeyboard(keyWrapper);
    // return { main, field, keyWrapper };
}