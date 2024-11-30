import { giftsWrapper} from '../src/variables.js';
import data from "./gifts.js";
import shuffle from './shuffle.js';
import  { showPopUp }  from './showPopUp.js';

function createCards(ammount, mixed){
    giftsWrapper.innerHTML = '';
    for(let i = 0; i < ammount; i++){
        let categorySrc = mixed[i].category.split(' ')[1].toLowerCase();
        let giftsItem = document.createElement('div');
        giftsItem.classList.add('gifts__item');
        giftsItem.dataset.name = i;
        giftsWrapper.appendChild(giftsItem)
        let imageWrapper = document.createElement('div')
        imageWrapper.classList.add('gifts__image_wrapper');
        giftsItem.appendChild(imageWrapper);
        let img = document.createElement('img')
        img.classList.add('gift__image');
        img.src = '../images/gift-for-' + categorySrc + '.png';
        imageWrapper.appendChild(img);
        let itemDes = document.createElement('div');
        itemDes.classList.add('item__description');
        giftsItem.appendChild(itemDes);
        let itemCategory = document.createElement('h4');
        itemCategory.classList.add('item__category');
        itemCategory.classList.add(mixed[i].color);
        itemCategory.innerText = mixed[i].category;
        itemDes.appendChild(itemCategory);
        let itemText = document.createElement('h3');
        itemText.classList.add('item__text');
        itemText.innerText = mixed[i].name;
        itemDes.appendChild(itemText);
        giftsItem.onclick = () => {
            showPopUp(giftsItem, mixed);
        }
    }

}

export default createCards