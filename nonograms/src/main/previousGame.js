import { createLeftClue } from "./createLeftClue.js";
import { createNonogramField } from "./createNonogramField.js";
import { createUpClue } from "./createUpClue.js";
import { createVariantsButtons } from "../header/createVariantsButtons.js";
import { settings } from "../../index.js";

export function previousGame() {
    if(!JSON.parse(localStorage.getItem('settings'))){
        return;
    }

    let savedSettings = JSON.parse(localStorage.getItem('settings'));
    Object.keys(savedSettings).forEach(key => {
        settings[key] = savedSettings[key];
    });
    const audioLeaf = new Audio('./sounds/leaves.mp3');
    const sound = document.querySelector('.sound');

    if(!settings.isMute) {
        audioLeaf.play();
        sound.src = './images/sound.svg';
    } else {
        sound.src = './images/mute.svg';
    }

    const allLevels = document.querySelectorAll('.level');
    const theme = document.querySelector('.paifang');
    allLevels.forEach(el=> {
        el.classList.remove('active');
        if(el.classList.contains(settings.level)) {
            el.classList.add('active');
            createVariantsButtons(settings.level);
            createUpClue(settings.matrix);
            createLeftClue(settings.matrix);
            createNonogramField(settings.matrix);
            settings.minutes = savedSettings.minutes;
            settings.seconds = savedSettings.seconds;
            const timerWrapper = document.querySelector('.timer-wrapper');
            const formattedMinutes = settings.minutes < 10 ? '0' + settings.minutes : settings.minutes;
            const formattedSeconds = settings.seconds < 10 ? '0' + settings.seconds : settings.seconds;
            timerWrapper.textContent = 'Time: ' + formattedMinutes + ' : ' + formattedSeconds;
            settings.userMatrix = savedSettings.userMatrix;
            const allCeils = document.querySelectorAll('.ceil');
            const leafContainer = document.querySelector('.leaf-container');
            // leafContainer.innerHTML = ''; // Clear existing leaves
            leafContainer.classList.add('open');
            let matrix = savedSettings.userMatrix.flat();
            matrix.forEach((value, index) => {
                if (value === 1 || value === 'X') {
                    const leaf = document.createElement('div');
                    leaf.classList.add('leaf-back');
                    if(theme.classList.contains('active')) {
                        leaf.classList.add('active');
                    }
                    const randomX = Math.random();
                    const randomY = Math.random();
                    leaf.style.setProperty('--random-x', randomX);
                    leaf.style.setProperty('--random-y', randomY);
                    leaf.style.left = `${window.innerWidth * randomX}px`;
                    leaf.style.top = `${window.innerHeight * randomY}px`;
                    leafContainer.appendChild(leaf);

                    const targetRect = allCeils[index].getBoundingClientRect();
                    setTimeout(() => {
                        leaf.style.left = `${targetRect.left}px`;
                        leaf.style.top = `${targetRect.top}px`;
                    }, 0);

                    leaf.addEventListener('animationend', () => {
                        if (matrix[index] === 1) {
                            allCeils[index].classList.add('colored');
                        }
                        if (matrix[index] === 'X') {
                            allCeils[index].classList.add('cross');
                        }
                        leaf.remove();
                        if (leafContainer.children.length === 0) {
                            leafContainer.classList.remove('open');
                            audioLeaf.pause();
                            audioLeaf.currentTime = 0;
                        }
                    }, { once: true });
                }
            });
        }
    });
}