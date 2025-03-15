import { createElement } from '../../../utils/createElement';
import '../wheelView.css';
import '../../../components/componentsStyles.css';

export function createInputElement() {
  const labelElement = createElement<HTMLLabelElement>({
    tag: 'label',
    classNames: ['label', 'label-duration'],
  });
  labelElement.textContent = 'Sec:';
  const inputElement = createElement<HTMLInputElement>({
    tag: 'input',
    classNames: ['input', 'input-duration'],
  });
  inputElement.type = 'number';
  inputElement.min = '5';
  inputElement.max = '30';
  labelElement.append(inputElement);
  return { labelElement, inputElement };
}
