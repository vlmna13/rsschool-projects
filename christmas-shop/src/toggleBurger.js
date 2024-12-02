import { navContainer, bodyNoScroll,burgerButton, lineFirst, lineSecond } from '../src/variables.js';

export function toggleBurgerMenu() {
    const scrollTop = window.scrollY;
    navContainer.style.top = 64 - scrollTop + 'px';
    navContainer.style.height = `calc(100vh - ${navContainer.style.top})`;
    navContainer.classList.toggle('open');
    bodyNoScroll.classList.toggle('open');
    burgerButton.classList.toggle('open');
    lineFirst.classList.toggle('open');
    lineSecond.classList.toggle('open');
}

export function closeBurgerMenu() {
    navContainer.style.top = 0 + 'px';
    navContainer.style.height = 64 + 'px';
    burgerButton.classList.remove('open');
    navContainer.classList.remove('open');
    bodyNoScroll.classList.remove('open');
    lineFirst.classList.remove('open');
    lineSecond.classList.remove('open');
}