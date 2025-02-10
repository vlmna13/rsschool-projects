import { nonogramsList } from "../nonogramsList.js";
import { settings } from "../../index.js";
import { userClick } from "./userClick.js";
import { rightClick } from "./rightClick.js";
import { removeRightClick } from "./createNonogramField.js";

export function showSolution() {
    const audioLeaf = new Audio('./sounds/leaves.mp3');
    if(!settings.isMute) {
        audioLeaf.play();
    }
    const allCeils = document.querySelectorAll('.ceil');
    const level = document.querySelector('.level.active').textContent;
    const variant = document.querySelector('.variant.active').textContent;
    const matrix = nonogramsList[level][variant].flat();
    settings.isGameStarted = false;
    settings.intervalId = clearInterval(settings.intervalId);
    const timerWrapper = document.querySelector('.timer-wrapper');
    timerWrapper.textContent = '00 : 00';
    const theme = document.querySelector('.paifang');
    allCeils.forEach((el) => {
        el.classList.remove('colored');
        el.classList.remove('cross');
        el.removeEventListener('click', userClick);
        el.removeEventListener('contextmenu', removeRightClick);
    });

    const leafContainer = document.querySelector('.leaf-container');
    leafContainer.innerHTML = ''; // Clear existing leaves
    leafContainer.classList.add('open');
    matrix.forEach((value, index) => {
        if (value === 1) {
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
                allCeils[index].classList.add('colored');
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