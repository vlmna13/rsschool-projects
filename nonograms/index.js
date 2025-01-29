import { createHeader } from "./src/header/createHeader.js";
import { nonogramsList } from "./src/nonogramsList.js";
import { createLevelsButtons } from "./src/header/createLevelsButtons.js";
import { createMain } from "./src/main/createMain.js";
import { createNonogramField } from "./src/main/createNonogramField.js";
import { createLeftClue } from "./src/main/createLeftClue.js";
import { createUpClue } from "./src/main/createUpClue.js";
import { createTable } from "./src/main/createTable.js";

export let settings = {
    level: 'easy',
    variant: 'cookies',
    matrix: nonogramsList.easy.cookies,
    isGameStarted: false,
    intervalId: 0,
    seconds: 0,
    minutes: 0,
    blockedCeil: true,
    isMute: false
}

const body = document.querySelector('body');
body.classList.add('black');

createMain();
createHeader();
createUpClue(settings.matrix);
createLeftClue(settings.matrix);
createNonogramField(settings.matrix);
let winTable = [];
localStorage.setItem('winTable', JSON.stringify(winTable));
createTable();




