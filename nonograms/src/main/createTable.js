export function createTable() {
    const body = document.querySelector('body');
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');
    body.appendChild(modalWrapper);
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modalWrapper.appendChild(modal);
    const modalHeader = document.createElement('p');
    modalHeader.classList.add('modal-header');
    modalHeader.textContent = 'Score :';
    modal.appendChild(modalHeader)
    for(let i = 0; i < 5; i++) {
        const winLine = document.createElement('div');
        winLine.classList.add('win-line');
        modal.appendChild(winLine);
        const tableLevel = document.createElement('p');
        tableLevel.classList.add('table-level');
        const tableVariant = document.createElement('p');
        tableVariant.classList.add('table-variant');
        const tableTime = document.createElement('p');
        tableTime.classList.add('table-time');
        winLine.appendChild(tableLevel);
        winLine.appendChild(tableVariant);
        winLine.appendChild(tableTime);
    }
    const closeButton = document.createElement('button');
    closeButton.classList.add('button', 'close');
    closeButton.textContent = 'close';
    modal.appendChild(closeButton);
}