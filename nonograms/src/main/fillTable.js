export function fillTable() {
    const settings = JSON.parse(localStorage.getItem('winTable'));
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.classList.add('open');
    const modal = document.querySelector('.modal');
    modal.classList.add('open');
    const allLines = document.querySelectorAll('.win-line');
    settings.forEach((el, index) => {
        const line = allLines[index];
        const tableLevel = line.querySelector('.table-level');
        const tableVariant = line.querySelector('.table-variant');
        const tableTime = line.querySelector('.table-time');
        tableLevel.textContent = 'level : ' + el[0];
        tableVariant.textContent = 'game : ' + el[1];
        tableTime.textContent = 'time : ' + el[2] + ' : ' + el[3];
    })
}