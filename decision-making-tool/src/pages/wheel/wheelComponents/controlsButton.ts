import { createElement } from '../../../utils/createElement';
import '../../../components/componentsStyles.css';
import '../wheelView.css';

export function createButtonBack() {
  const buttonBack = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-back'],
  });
  buttonBack.textContent = 'Back';
  return buttonBack;
}

export function createToggleSoundButton() {
  const buttonSound = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-sound'],
  });
  buttonSound.textContent = 'Sound: on';
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
