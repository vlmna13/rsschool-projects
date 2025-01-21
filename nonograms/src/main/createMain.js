

export function createMain() {
    const body = document.querySelector('body');
    const main = document.createElement('main');
    main.classList.add('main');
    body.appendChild(main);
    const nonogramWrapper = document.createElement('div');
    nonogramWrapper.classList.add('nonogram-wrapper');
    main.appendChild(nonogramWrapper); 
    
    const upSide = document.createElement('div');
    upSide.classList.add('up-side');
    nonogramWrapper.appendChild(upSide);
    const empty = document.createElement('div');
    empty.classList.add('empty');
    const upClue = document.createElement('div');
    upClue.classList.add('up-clue');
    upSide.appendChild(empty);
    upSide.appendChild(upClue);

    const downSide = document.createElement('div');
    downSide.classList.add('down-side');
    nonogramWrapper.appendChild(downSide);
    const downClue = document.createElement('div');
    downClue.classList.add('down-clue');
    downSide.appendChild(downClue);
    const nonogramField = document.createElement('div');
    nonogramField.classList.add('nonogram-field');
    downSide.appendChild(nonogramField);

}