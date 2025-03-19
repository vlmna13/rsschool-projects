import { createElement } from '../../utils/createElement';
import {
  createButtonBack,
  createButtonSpin,
  createToggleSoundButton,
} from './wheelComponents/controlsButton';
import { createDurationField } from './wheelComponents/inputElement';
import './wheelView.css';

export function createControlWrapper() {
  const controlWrapper = createElement<HTMLDivElement>({
    tag: 'div',
    classNames: ['control-wrapper'],
  });
  const buttonBack = createButtonBack();
  const buttonSound = createToggleSoundButton();
  const soundState = localStorage.getItem('soundState');
  if (!soundState) { 
    buttonSound.textContent = 'Sound: on';
    localStorage.setItem('soundState', JSON.stringify({ sound: true }));
  } else {
    const soundStateParsed = JSON.parse(soundState);
    buttonSound.textContent = `Sound: ${soundStateParsed.sound ? 'on' : 'off'}`;
  }
  const { labelElement: labelDuration, inputElement: inputDuration } =
    createDurationField();
  const buttonSpin = createButtonSpin();
  controlWrapper.append(buttonBack, buttonSound, labelDuration, buttonSpin);
  return {
    controlWrapper,
    buttonSpin,
    inputElement: inputDuration,
  };
}
