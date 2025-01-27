import { nonogramsList } from "../nonogramsList.js";
import { settings } from "../../index.js";

export function saveGame() {
    if(!settings.blockedCeil || !settings.isGameStarted) {
        console.log(JSON.parse(localStorage.getItem('settings')))
        return;
    }
    localStorage.setItem('settings', JSON.stringify(settings));
    let savedSettings = JSON.parse(localStorage.getItem('settings'));
    // settings.minutes = 0;
    // settings.seconds = 0;
    // settings.isGameStarted = false;
    // settings.intervalId = clearInterval(settings.intervalId);
}