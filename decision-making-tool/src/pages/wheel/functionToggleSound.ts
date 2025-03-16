import { SoundState } from '../../utils/functionInit';

export function toggleSound(buttonSound: HTMLButtonElement) {
  const storedSoundState = localStorage.getItem('soundState');

  if (storedSoundState) {
    const currentSoundState: SoundState = JSON.parse(storedSoundState);
    const newSoundState: SoundState = {
      sound: !currentSoundState.sound,
    };
    buttonSound.textContent = `Sound: ${currentSoundState.sound ? 'off' : 'on'}`;
    localStorage.setItem('soundState', JSON.stringify(newSoundState));
  } else {
    const initialSoundState: SoundState = { sound: true };
    buttonSound.textContent = 'Sound: on';
    localStorage.setItem('soundState', JSON.stringify(initialSoundState));
  }
}
