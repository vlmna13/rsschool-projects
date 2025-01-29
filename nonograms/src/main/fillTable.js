import { settings } from "../../index.js";

export function fillTable() {
    let settingsSave = JSON.parse(localStorage.getItem('winTable'));
    settingsSave.sort((a, b) => {
        const totalSecondsA = a[2] * 60 + a[3];
        const totalSecondsB = b[2] * 60 + b[3];
        return totalSecondsA - totalSecondsB;
    });
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.classList.add('open');
    const modal = document.querySelector('.modal');
    modal.classList.add('open');
    const allLines = document.querySelectorAll('.win-line');
    const congrat = document.querySelector('.congrat');
    let sec = settings.minutes * 60 + settings.seconds;
    const formattedSec = sec < 10 ? '0' + sec : sec;
    congrat.textContent = 'Great! You have solved the nonogram in ' + formattedSec + ' seconds';
    settingsSave.forEach((el, index) => {
        const line = allLines[index];
        const tableLevel = line.querySelector('.table-level');
        const tableVariant = line.querySelector('.table-variant');
        const tableTime = line.querySelector('.table-time');
        tableLevel.textContent = el[0];
        tableVariant.textContent = el[1];
        const formattedMinutes = el[2] < 10 ? '0' + el[2] : el[2];
        const formattedSeconds = el[3] < 10 ? '0' + el[3] : el[3];
        tableTime.textContent = formattedMinutes + ' : ' + formattedSeconds;  
    });
}