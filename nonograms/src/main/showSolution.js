import { nonogramsList } from "../nonogramsList.js";

export function showSolution() {
    const allCeils = document.querySelectorAll('.ceil');
    const level = document.querySelector('.level.active').textContent;
    const variant = document.querySelector('.variant.active').textContent;
    const matrix = nonogramsList[level][variant].flat();
    allCeils.forEach((el, index) => {
        if(matrix[index] === 1){
            el.classList.add('colored');
            el.textContent = '';
        } else {
            el.classList.remove('colored');
            el.textContent = '';
        }
    })
}