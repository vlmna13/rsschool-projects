import { bodyNoScroll } from "./variables.js";
import data from "./gifts.js";
import createCards from "./createCards.js";
import shuffle from "./shuffle.js";
import {creator}  from "./creator.js";


export function showPopUp(giftsItem, mixed){
    function closePopup(){
        bodyNoScroll.classList.remove('open');
        popUpWrapper.classList.remove('open');
        popUp.classList.remove('open');
    }
    const popUpWrapper = document.querySelector('.popup__wrapper');
    popUpWrapper.innerHTML = '';
    const item = giftsItem.dataset.name;
    let categorySrc = mixed[item].category.split(' ')[1].toLocaleLowerCase();
    bodyNoScroll.classList.add('open');
    popUpWrapper.classList.add('open');
    popUpWrapper.addEventListener('click', closePopup)
    const popUp = document.createElement('div');
    popUp.classList.add('popup', 'open');
    popUpWrapper.appendChild(popUp);
    const popUpImg = document.createElement('div');
    popUpImg.classList.add('popup__img');
    popUpImg.style.backgroundImage = `url(../images/gift-for-${categorySrc}.png`;
    popUp.appendChild(popUpImg);
    const popUpButton = document.createElement('div');
    popUpButton.classList.add('popup__button');
    popUpButton.style.backgroundImage = "url('../images/close.png')";
    popUpButton.addEventListener('click', closePopup )
    popUpImg.appendChild(popUpButton);
    const popUpChar = document.createElement('div');
    popUpChar.classList.add('popup__characteristic');
    popUp.appendChild(popUpChar);
    const popUpStory = document.createElement('div');
    popUpStory.classList.add('popup__story');
    popUpChar.appendChild(popUpStory);
    const popUpCategory = document.createElement('h4');
    popUpCategory.classList.add('popup__category');
    popUpCategory.classList.add(mixed[item].color);
    popUpCategory.textContent = mixed[item].category;
    popUpStory.appendChild(popUpCategory);
    const popUpName = document.createElement('h3');
    popUpName.classList.add('item__text');
    popUpName.textContent = mixed[item].name;
    popUpStory.appendChild(popUpName);
    const popUpDes = document.createElement('p');
    popUpDes.classList.add('popup__description');
    popUpDes.textContent = mixed[item].description;
    popUpStory.appendChild(popUpDes);
    const popUpSpec = document.createElement('div');
    popUpSpec.classList.add('popup__spec');
    popUpChar.appendChild(popUpSpec);
    const specTitle = document.createElement('p');
    specTitle.classList.add('spec__title');
    specTitle.textContent = 'Adds superpowers to:';
    popUpSpec.appendChild(specTitle);
    const superpowers = document.createElement('div');
    superpowers.classList.add('superpowers');
    popUpSpec.appendChild(superpowers);
    for (let i = 0; i < 4; i++) {
        const supAb = document.createElement('div');
        supAb.classList.add(Object.keys(mixed[item].superpowers)[i]);
        superpowers.appendChild(supAb);
        const abName = document.createElement('span');
        abName.classList.add('ab__name');
        abName.textContent = Object.keys(mixed[item].superpowers)[i];
        supAb.appendChild(abName);
        const self = document.createElement('span');
        self.classList.add('self');
        self.textContent = Object.values(mixed[item].superpowers)[i];
        supAb.appendChild(self);
        const snowDrift = document.createElement('div');
        snowDrift.classList.add('snowdrift');
        supAb.appendChild(snowDrift);
        const allSnow = [];
        for(let j = 0; j < 5; j++){
            const snowFlake = document.createElement('img');
            snowFlake.classList.add('snowflake');
            snowFlake.src = "../images/snowflake.png"
            snowFlake.alt = 'snow';
            snowDrift.appendChild(snowFlake);
            allSnow.push(snowFlake);
        }
        for(let k = 0; k < Object.values(mixed[item].superpowers)[i][1]; k++){
            allSnow[k].style.opacity = '100%';
        }  
    }
    bodyNoScroll.classList.add('open');
}