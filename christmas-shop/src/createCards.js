import { shuffle } from "../home/index.js";
import { giftsWrapper} from '../src/variables.js';

function createCards(){
    let bit = shuffle() 
    for(let i = 0; i < 4; i++){
        let categorySrc = bit[i].category.split(' ')[1].toLocaleLowerCase();
        let giftsItem = document.createElement('div')
        giftsItem.classList.add('gifts__item');
        giftsWrapper.appendChild(giftsItem)
        let imageWrapper = document.createElement('div')
        imageWrapper.classList.add('.gifts__image_wrapper');
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
        itemCategory.classList.add(bit[i].color);
        itemCategory.innerText = bit[i].category;
        itemDes.appendChild(itemCategory);
        let itemText = document.createElement('h3');
        itemText.classList.add('item__text');
        itemText.innerText = bit[i].description;
        itemDes.appendChild(itemText);
    }
}

export default createCards