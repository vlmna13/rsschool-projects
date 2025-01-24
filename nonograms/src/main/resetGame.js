import { settings } from "../../index.js";

export function resetGame() {
    const allCeils = document.querySelectorAll('.ceil');
    allCeils.forEach(el => {
        el.classList.remove('colored');
        el.textContent = '';
    });
    for(let i = 0; i < settings.userMatrix.length; i++){
        for(let j = 0; j < settings.userMatrix[i].length; j++){
            settings.userMatrix[i][j] = 0;
        }
    }

}