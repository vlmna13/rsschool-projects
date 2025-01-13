import { defaultParameters } from "../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "./keyboardData.js";
import { allowInput } from "./allowInput.js";
import { repeatSeq } from "./repeatSeq.js";


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
                    if (index < sequence.length && sequence[index] === sequence[index - 1]) {
                        setTimeout(highlightKey, 1000); // Add delay if the next key is the same
                    } else {
                        highlightKey();
                    }
                }, 1000);
            }
        } else {
            setTimeout(() => {
                defaultParameters.isGamestarted = true;
                allowInput();
            }, 300);
        }
    }

    highlightKey();
}

    

