import { nonogramsList } from "../nonogramsList.js";
import { settings } from "../../index.js";

export function saveGame() {
    if(!settings.blockedCeil || !settings.isGameStarted) {
        return;
    }
    localStorage.setItem('settings', JSON.stringify(settings));
    let savedSettings = JSON.parse(localStorage.getItem('settings'));
    console.log(savedSettings)
    // settings.minutes = 0;
    // settings.seconds = 0;
    // settings.isGameStarted = false;
    // settings.intervalId = clearInterval(settings.intervalId);
}