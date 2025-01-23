export function resetGame() {
    const allCeils = document.querySelectorAll('.ceil');
    allCeils.forEach(el => {
        el.classList.remove('colored');
        el.textContent = '';
    })
}