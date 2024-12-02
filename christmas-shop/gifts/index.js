import { navContainer, bodyNoScroll, burgerButton, lineFirst, lineSecond, giftsWrapper} from '../src/variables.js';
import { toggleBurgerMenu, closeBurgerMenu } from '../src/toggleBurger.js';
import createCards from '../src/createCards.js';
import data from '../src/gifts.js';
import shuffle from '../src/shuffle.js';


burgerButton.addEventListener('click', toggleBurgerMenu);

document.querySelectorAll('.nav__item').forEach( (item) => {
    item.addEventListener('click', closeBurgerMenu);
})


let allItems = document.querySelectorAll('.category__item');
allItems.forEach(el => {
    el.dataset.category = el.textContent;
    el.addEventListener('click', () => {
        console.log(1);
        changeCategory(el);
    })
})

function changeCategory(el) {

    if (el.classList.contains('open')) {
        return;
    } else {
        allItems.forEach(element => element.classList.remove('open'));
        el.classList.add('open');

        let mixed = [];
        if (el.dataset.category == 'All'){
            mixed = shuffle(data);
        } else {
            let filteredData = data.filter(item => item.category === el.dataset.category);
            mixed = [...filteredData];
        }

        createCards(mixed.length, mixed);
    }
}

let mixed = shuffle(data)
createCards(mixed.length, mixed)


//button

const buttonUp = document.querySelector('.button__up');
window.addEventListener('resize', function(){
    if(window.innerWidth <= 768) {
        window.onscroll = function () {
            if(window.pageYOffset >= 300){
                buttonUp.style.display = 'flex';
            } else {
                buttonUp.style.display = 'none';
            }
        }
    } else {
        buttonUp.style.display = 'none';
        }
    if(window.innerWidth > 768){
        closeBurgerMenu()
    }
});

window.onscroll = function () {
    if(window.pageYOffset >= 300){
        buttonUp.style.display = 'flex';
    } else {
        buttonUp.style.display = 'none';
    }
}


function scrollUp(){
    window.scrollTo(0, 0);
    buttonUp.style.display = 'none';
}

buttonUp.addEventListener('click',scrollUp )








