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
        changeCategory(el)
    })
})

function changeCategory(el) {
    if(el.classList.contains('open')){
        return;
    } else {
        for(let i = 0; i < allItems.length; i++){
            if(allItems[i] == el) {
                el.classList.add('open')
            }
            allItems[i].classList.remove('open');
            let mixed = [];
            data.forEach(card=> {
            if(el.dataset.category == 'All'){
                mixed = shuffle(data);
            } else if(card.category == el.dataset.category){
                mixed.push(card);
                }
            })
            createCards(mixed.length, mixed);
            }
        }

}

let mixed = shuffle(data)
createCards(mixed.length, mixed)




