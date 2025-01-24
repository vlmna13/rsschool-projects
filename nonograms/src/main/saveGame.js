import { nonogramsList } from "../nonogramsList.js";
import { settings } from "../../index.js";

export function saveGame() {
    localStorage.setItem('settings', JSON.stringify(settings));
    const allCeils = document.querySelectorAll('.colored');
    // let savedSettings = JSON.parse(localStorage.getItem('settings'));
}