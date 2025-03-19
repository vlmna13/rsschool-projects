import { createElement } from '../../../utils/createElement';
import '../../../components/componentsStyles.css';
import '../wheelView.css';
import { router } from '../../../utils/router';
import { toggleSound } from '../functionToggleSound';
import { SoundState } from '../../../utils/functionInit';

export function createButtonBack() {
  const buttonBack = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-back'],
  });
  buttonBack.textContent = 'Back';
  buttonBack.addEventListener('click', () => {
    router.navigate('home');
  });
  return buttonBack;
}

export function createToggleSoundButton() {
  const buttonSound = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-sound'],
  });
  // buttonSound.textContent = 'Sound: on';
  const storedSoundState = localStorage.getItem('soundState');

  if (storedSoundState) {
    const currentSoundState: SoundState = JSON.parse(storedSoundState);
    buttonSound.textContent = `Sound: ${currentSoundState.sound ? 'off' : 'on'}`;
  }
  buttonSound.addEventListener('click', () => {
    toggleSound(buttonSound);
  });
  return buttonSound;
}

export function createButtonSpin() {
  const buttonSpin = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-spin'],
  });
  buttonSpin.textContent = 'Start spinning';
  return buttonSpin;
}
