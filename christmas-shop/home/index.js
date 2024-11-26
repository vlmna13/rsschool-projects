const navContainer = document.querySelector('.nav__container');
const bodyNoScroll = document.querySelector('body');
const burgerButton = document.querySelector('.burger__menu');
const lineFirst = document.querySelector('.burger__line_first');
const lineSecond = document.querySelector('.burger__line_second');

function toggleBurgerMenu() {
    const scrollTop = window.scrollY;
    navContainer.style.top = 64 - scrollTop + 'px';

    navContainer.style.height = `calc(100vh - ${navContainer.style.top})`;
    console.log(`calc(100vh - ${navContainer.style.top})`);

    navContainer.classList.toggle('open');
    bodyNoScroll.classList.toggle('open');
    burgerButton.classList.toggle('open');
    lineFirst.classList.toggle('open');
    lineSecond.classList.toggle('open');
}

function closeBurgerMenu() {
    burgerButton.classList.remove('open');
    navContainer.classList.remove('open');
    bodyNoScroll.classList.remove('open');
    lineFirst.classList.remove('open');
    lineSecond.classList.remove('open');
}

burgerButton.addEventListener('click', toggleBurgerMenu);

document.querySelectorAll('.nav__item').forEach( (item) => {
    item.addEventListener('click', closeBurgerMenu);
})

document.querySelector('.logo-container').addEventListener('click', closeBurgerMenu);

//SLIDER
