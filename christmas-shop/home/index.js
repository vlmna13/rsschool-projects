const navContainer = document.querySelector('.nav__container');
const bodyNoScroll = document.querySelector('body');
const burgerButton = document.querySelector('.burger__menu');

function toggleBurgerMenu() {
    navContainer.classList.toggle('open');
    bodyNoScroll.classList.toggle('open');
    burgerButton.classList.toggle('open');
    const scrollTop = window.scrollY;
    navContainer.style.top = 64 - scrollTop + 'px';
}

function closeBurgerMenu() {
    burgerButton.classList.remove('open');
    navContainer.classList.remove('open');
    bodyNoScroll.classList.remove('open');
}

burgerButton.addEventListener('click', toggleBurgerMenu);

document.querySelectorAll('.nav__item').forEach( (item) => {
    item.addEventListener('click', closeBurgerMenu);
})

document.querySelector('.logo-container').addEventListener('click', closeBurgerMenu);
