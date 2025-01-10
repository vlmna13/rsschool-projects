import { defaultParameters } from "../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "./keyboardData.js";
import { allowInput } from "./allowInput.js";


export function lightUp() {
    const sequence = defaultParameters.sequence;
    const keys = document.querySelectorAll('.key');
    let index = 0;

    function highlightKey() {
        if (index < sequence.length) {
            let key = keys[sequence[index]];
            if (key) {
                key.classList.add('active');
                setTimeout(() => {
                    key.classList.remove('active');
                    index++;
                    highlightKey();
                }, 2000);
            }
        } else {
            // defaultParameters.isGamestarted = true;
            setTimeout(() => {
                defaultParameters.isGamestarted = true;
                allowInput();
                console.log(defaultParameters.isGamestarted);
            }, 1000);
        }
    }
    highlightKey();
}
   
