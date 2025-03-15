import { createElement } from '../../utils/createElement';
import {
  createButtonBack,
  createButtonSpin,
  createToggleSoundButton,
} from './wheelComponents/controlsButton';
import { createInputElement } from './wheelComponents/inputElement';
import './wheelView.css';

export function createControlWrapper() {
  const controlWrapper = createElement<HTMLDivElement>({
    tag: 'div',
    classNames: ['control-wrapper'],
  });
  const buttonBack = createButtonBack();
  const buttonSound = createToggleSoundButton();
  const { labelElement: labelDuration, inputElement: inputDuration } =
    createInputElement();
  const buttonSpin = createButtonSpin();
  controlWrapper.append(buttonBack, buttonSound, labelDuration, buttonSpin);
  return controlWrapper;
}
