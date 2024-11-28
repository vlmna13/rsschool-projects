import { navContainer, bodyNoScroll, burgerButton, lineFirst, lineSecond, giftsWrapper} from '../src/variables.js';
import { toggleBurgerMenu, closeBurgerMenu } from '../src/toggleBurger.js';
import createCards from '../src/createCards.js';
import data from '../src/gifts.js';



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
    }
    chunk = (width - sliderWrapper.offsetWidth) / click;
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

export function shuffle() {
    let mixed = data.sort(() => Math.random() - 0.5);
    return mixed.slice(0,4);
}

// function createCards(){
//     let bit = shuffle() 
//     for(let i = 0; i < 4; i++){
//         let categorySrc = bit[i].category.split(' ')[1].toLocaleLowerCase();
//         let giftsItem = document.createElement('div')
//         giftsItem.classList.add('gifts__item');
//         giftsWrapper.appendChild(giftsItem)
//         let imageWrapper = document.createElement('div')
//         imageWrapper.classList.add('.gifts__image_wrapper');
//         giftsItem.appendChild(imageWrapper);
//         let img = document.createElement('img')
//         img.classList.add('gift__image');
//         img.src = '../images/gift-for-' + categorySrc + '.png';
//         imageWrapper.appendChild(img);
//         let itemDes = document.createElement('div');
//         itemDes.classList.add('item__description');
//         giftsItem.appendChild(itemDes);
//         let itemCategory = document.createElement('h4');
//         itemCategory.classList.add('item__category');
//         itemCategory.classList.add(bit[i].color);
//         itemCategory.innerText = bit[i].category;
//         itemDes.appendChild(itemCategory);
//         let itemText = document.createElement('h3');
//         itemText.classList.add('item__text');
//         itemText.innerText = bit[i].description;
//         itemDes.appendChild(itemText);
//     }
   
// }

createCards()



