export function toggleLevel(event) {
    // console.log(event.textContent)
    const levelsWrapper = document.querySelector('.levels-wrapper');
    const levels = levelsWrapper.querySelectorAll('button');
    if(event.target.classList.contains('.active')) {
        return;
    }
    levels.forEach(el => {
        el.classList.remove('active');
    })
    event.target.classList.add('active');
    console.log(event.target.textContent);
}