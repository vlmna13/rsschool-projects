import { navContainer, bodyNoScroll, burgerButton, lineFirst, lineSecond, giftsWrapper} from '../src/variables.js';
import { toggleBurgerMenu, closeBurgerMenu } from '../src/toggleBurger.js';
import createCards from '../src/createCards.js';
import data from '../src/gifts.js';
import shuffle from '../src/shuffle.js';

//burger
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
    width = sliderTrack.offsetWidth + 36;
    offset = 0;
    sliderTrack.style.left = 0;
    click = 0;
    count = 0;
    buttonPrev.classList.add('disabled');
    buttonPrev.setAttribute('disabled', "");
    buttonNext.classList.remove('disabled');
    buttonNext.removeAttribute('disabled');
    if(sliderWrapper.offsetWidth > 768) {
        click = 3;
    } else {
        click = 6;    
    }
    chunk = (width - sliderWrapper.offsetWidth) / click;
    if(window.innerWidth > 768) {
        closeBurgerMenu();
        width = sliderTrack.offsetWidth;
    }
}
init();

window.addEventListener('resize', init);

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
}

function moveLeft() {
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
}

buttonPrev.addEventListener('click', moveLeft);

//cards
let mixed = shuffle(data);
createCards(4, mixed)

// timer

const timerDays = document.querySelector('.timer__days');
const timerHours = document.querySelector('.timer__hours');
const timerMinutes = document.querySelector('.timer__minutes');
const timerSeconds = document.querySelector('.timer__seconds');
const deadline = 'December 31 2024 23:59:59 UTC+0';


function countTime(){
    let difference = Date.parse(deadline) - Date.parse(new Date());
    let days = Math.floor(difference / 1000 / 60 / 60 / 24);
    let hours = Math.floor(difference / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(difference / 1000 / 60) % 60;
    let seconds = Math.floor(difference / 1000) % 60;
    return {days, hours, minutes, seconds, difference};
}
countTime()
function fillTimer(){
    let end = setInterval(function(){
        let options = countTime()
        timerDays.innerText = options.days;
        timerHours.innerText = options.hours;
        timerMinutes.innerText = options.minutes;
        timerSeconds.innerText = options.seconds;
        if(options.difference <= 0){
            clearInterval(end);
        }
    }, 1000);

};
fillTimer()







