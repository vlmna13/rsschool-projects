import { defaultParameters } from "../../index.js";
import { connection } from "./connection.js";


export function checkWin() {
    // defaultParameters.round += 1;
    const fback = document.querySelector('.feed-back');
    const repeat = document.querySelector('.repeat');
    const allbuttons = document.querySelectorAll('.key');
    if(defaultParameters.round === 6) {
        fback.innerText = 'flawless victory';
        repeat.disabled = true;
        allbuttons.forEach(el => {
            el.disabled = true;
        })

        window.removeEventListener('keydown', connection);
    }

}