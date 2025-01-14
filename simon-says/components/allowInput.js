import { defaultParameters } from "../index.js";
import { connection } from "./creators/connection.js";

export function allowInput() {
    const allkey = document.querySelectorAll('.key');
    const field = document.querySelectorAll('.field');
    const easy = document.querySelector('.easy');
    const medium = document.querySelector('.medium');
    const hard = document.querySelector('.hard');
    if(defaultParameters.isGamestarted === false) {
        document.removeEventListener('keydown', connection);
        allkey.forEach(button => {
            button.disabled = true;
        })
        easy.disabled = true;
        medium.disabled = true;
        hard.disabled = true;
    } else {
        document.addEventListener('keydown', connection);
        allkey.forEach(button => {
            button.disabled = false;
        });
        easy.disabled = false;
        medium.disabled = false;
        hard.disabled = false;
    }
}