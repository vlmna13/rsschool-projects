import { nonogramsList } from "../nonogramsList.js";
import { settings } from "../../index.js";

export function saveGame() {
    if(!settings.blockedCeil || !settings.isGameStarted) {
        return;
    }
    localStorage.setItem('settings', JSON.stringify(settings));
    let savedSettings = JSON.parse(localStorage.getItem('settings'));
}