import { defaultParameters } from "../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "./keyboardData.js";
import { allowInput } from "./allowInput.js";
import { repeatSeq } from "./repeatSeq.js";
import { connection } from "./creators/connection.js";
import { createLevel } from "./creators/creatLevel.js";
import { checkWin } from "./creators/checkWin.js";

export function checkInput(key) {
    let value = key;
    const field = document.querySelector('.field');
    const userInput = field.textContent.split('');
    const allkeys = document.querySelectorAll('.key');
    let data = defaultParameters.data;
    let seq = defaultParameters.sequence;
    const feedBack = document.querySelector('.feed-back');
    const repeat = document.querySelector('.repeat');
    const start = document.querySelector('.start');
    const arr = [];
    seq.forEach(el => {
        arr.push(data[el].inside)
    })
    for (let index = 0; index < userInput.length; index++) {
        if (userInput[index] !== data[seq[index]].inside) {
            feedBack.textContent = 'first mistake';
            field.textContent = '';
            defaultParameters.mistakes -= 1;
            defaultParameters.clue = 0;
            repeat.style.color = 'gray';
            repeat.removeEventListener('click', repeatSeq);
            if (defaultParameters.mistakes === 0) {
                repeat.style.color = 'gray';
                repeat.removeEventListener('click', repeatSeq);
                defaultParameters.isGamestarted = false;
                // feedBack.textContent = '';
                feedBack.textContent = 'game over';
                allowInput();
                start.disabled = false;
            }
            return;
        }
    }
    if (userInput.length === seq.length && userInput.every((element, index) => element === arr[index])) {
        feedBack.textContent = 'you win this level';
        allkeys.forEach(el => {
            document.removeEventListener('keydown', connection);
            el.disabled = true;
        });
        repeat.removeEventListener('click', repeatSeq);
        repeat.textContent = 'next level';
        repeat.style.color = '';
        if (!repeat.classList.contains('next-level')) {
            repeat.classList.add('next-level');
        }
        defaultParameters.round += 1;
        repeat.addEventListener('click', createLevel);
    }
    checkWin();
}

