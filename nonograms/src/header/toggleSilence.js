import { settings } from "../../index.js";

export function toggleSilence() {
    const sound = document.querySelector('.sound');
    if(!settings.isMute) {
        settings.isMute = true;
        sound.src = './images/mute.svg';
        
    } else {
        settings.isMute = false;
        sound.src = './images/sound.svg';
    }
}