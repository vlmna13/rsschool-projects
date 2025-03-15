import { createElement } from '../../utils/createElement';
import { checkDuration } from './functionCheckDuration';
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
  const { labelElement: labelDuration, inputElement: inputDuration } =
    createDurationField();
  const buttonSpin = createButtonSpin();
  buttonSpin.addEventListener('click', () => {
    checkDuration(inputDuration)});
  controlWrapper.append(buttonBack, buttonSound, labelDuration, buttonSpin);
  return controlWrapper;
}
