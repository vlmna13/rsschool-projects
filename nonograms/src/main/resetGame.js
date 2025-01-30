import { settings } from "../../index.js";
import { removeRightClick } from "./createNonogramField.js";
import { userClick } from "./userClick.js";

export function resetGame() {
    const allCeils = document.querySelectorAll('.ceil');
    if (!Array.from(allCeils).some(el => el.classList.contains('colored') || el.classList.contains('cross'))) {
        return;
    } 
    if(!settings.isGameStarted){
        settings.isGameStarted = true;
    }
    const header = document.querySelector('.header');
    const audioLeaf = new Audio('./sounds/leaves.mp3');
    allCeils.forEach(el => {
        el.addEventListener('click', userClick);
        el.addEventListener('contextmenu', removeRightClick);
    });
    if(!settings.isMute){
        audioLeaf.play();
    }
    if(!settings.blockedCeil){
        settings.blockedCeil = true;
    }
    const allColored = document.querySelectorAll('.colored');
    const allCrossed = document.querySelectorAll('.cross');
    const allCeilsBlow = [...allColored, ...allCrossed];
    const leafContainer = document.querySelector('.leaf-container');
    leafContainer.classList.add('open');

    allCeils.forEach((el) => {
        el.classList.remove('colored');
        el.classList.remove('cross');
    });
    const theme = document.querySelector('.paifang')
    allCeilsBlow.forEach((el, index) => {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        if(theme.classList.contains('active')) {
            leaf.classList.add('active');
        }
        const rect = el.getBoundingClientRect();
        leaf.style.left = `${rect.left}px`;
        leaf.style.top = `${rect.top}px`;
        const randomX = Math.random();
        const randomY = Math.random();
        leaf.style.setProperty('--random-x', randomX);
        leaf.style.setProperty('--random-y', randomY);
        leafContainer.appendChild(leaf);
        leaf.addEventListener('animationend', () => {
            leaf.remove();
            if (leafContainer.children.length === 0) {
                leafContainer.classList.remove('open');
                audioLeaf.pause();
                audioLeaf.currentTime = 0;
            }
        }, { once: true });
    });
    settings.isGameStarted = false;
    settings.intervalId = clearInterval(settings.intervalId);
    settings.seconds = 0;
    settings.minutes = 0;
    const timerWrapper = document.querySelector('.timer-wrapper');
    timerWrapper.textContent = '00 : 00';
    for(let i = 0; i < settings.userMatrix.length; i++){
        for(let j = 0; j < settings.userMatrix[i].length; j++){
            settings.userMatrix[i][j] = 0;
        }
    }
}