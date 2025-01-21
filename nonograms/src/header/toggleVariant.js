import { nonogramsList } from "../nonogramsList.js";

export function toggleVariant(event) {
    const variantsWrapper = document.querySelector('.variants-wrapper');
    const allVariants = variantsWrapper.querySelectorAll('buttons');
    console.log(event.target.textContent);
    if(event.target.classList.contains('.active')) {
        return;
    }
    variantsWrapper.forEach(el => {
        el.classList.remove('.active');
    })
    event.target.classList.add('active');

}