import { settings } from "../../index.js";

export function createTable() {
    const body = document.querySelector('body');
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');
    body.appendChild(modalWrapper);
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modalWrapper.appendChild(modal);
    const congrat = document.createElement('p');
    congrat.classList.add('congrat');
    modal.appendChild(congrat);
    const modalHeader = document.createElement('p');
    modalHeader.classList.add('modal-header');
    modalHeader.textContent = 'Score :';
    modal.appendChild(modalHeader)
    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-container');
    const headers = ['', 'level', 'variant', 'time'];
    const headersWrapper = document.createElement('div');
    headersWrapper.classList.add('headers-wrapper');
    scoreContainer.appendChild(headersWrapper);
    headers.forEach(headerText => {
        const header = document.createElement('p');
        header.classList.add('container-header');
        header.textContent = headerText;
        headersWrapper.appendChild(header);
    });
    modal.appendChild(scoreContainer);
    for(let i = 0; i < 5; i++) {
        const winLine = document.createElement('div');
        winLine.classList.add('win-line');
        const number = document.createElement('p');
        number.classList.add('number');
        number.textContent = i + 1 + '. ';
        const tableLevel = document.createElement('p');
        tableLevel.classList.add('table-level');
        const tableVariant = document.createElement('p');
        tableVariant.classList.add('table-variant');
        const tableTime = document.createElement('p');
        tableTime.classList.add('table-time');
        scoreContainer.appendChild(winLine);
        winLine.appendChild(number);
        winLine.appendChild(tableLevel);
        winLine.appendChild(tableVariant);
        winLine.appendChild(tableTime);
    }
    const closeButton = document.createElement('button');
    closeButton.classList.add('button', 'close');
    closeButton.textContent = 'close';
    modal.appendChild(closeButton);
    closeButton.addEventListener('click', function(){
        modal.classList.remove('open');
        modalWrapper.classList.remove('open');
    })
}