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

const allSlides = document.querySelectorAll('.slider__item');
const sliderWrapper = document.querySelector('.slider__wrapper');
const sliderTrack = document.querySelector('.slider__track');
const buttonNext = document.querySelector('.right__button');
const buttonPrev = document.querySelector('.left__button');
let offset = 0;
let click;
let count = 0;
let chunk;
let width;

function init() {
    width = sliderTrack.offsetWidth;
    offset = 0;
    sliderTrack.style.left = 0;
    click = 0;
    count = 0;
    buttonPrev.classList.add('disabled');
    buttonPrev.setAttribute('disabled', "");
    if(sliderWrapper.offsetWidth > 768) {
        click = 3;
    } else {
        click = 6;    
        console.log('else')
    }
    chunk = (width - sliderWrapper.offsetWidth) / click;
    console.log(width)
    console.log(click)
    console.log(count)
}
init();

window.addEventListener('resize', init)

buttonNext.addEventListener('click', moveRight);

function moveRight() {
    count = count + 1;
    if(count === click){
        offset = offset - chunk;
        sliderTrack.style.left = offset + 'px';
        buttonNext.classList.add('disabled');
        buttonNext.setAttribute("disabled", "");
        count = click;
    } else {
        buttonPrev.classList.remove('disabled');
        buttonPrev.removeAttribute('disabled');
        offset = offset - chunk;
        sliderTrack.style.left = offset + 'px';
    }
    console.log('right')
}

function moveLeft() {
    console.log(count)
    count = count - 1;
    if(count === 0){
        offset = offset + chunk;
        sliderTrack.style.left = offset + 'px';
        buttonPrev.classList.add('disabled');
        buttonPrev.setAttribute("disabled", "");
        count = 0;
    } else {
        buttonNext.classList.remove('disabled');
        buttonNext.removeAttribute('disabled');
        offset = offset + chunk;
        sliderTrack.style.left = offset + 'px';
    }
    console.log('left')
}

buttonPrev.addEventListener('click', moveLeft);





