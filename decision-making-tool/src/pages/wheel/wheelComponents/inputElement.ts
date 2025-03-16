import { createElement } from '../../../utils/createElement';
import '../wheelView.css';
import '../../../components/componentsStyles.css';
import { createInput, choice } from '../../../components/input';


export function createDurationField() {
  const labelElement = createElement<HTMLLabelElement>({
    tag: 'label',
    classNames: ['label', 'label-duration'],
  });
  labelElement.textContent = 'Sec:';

  const inputElement = createInput({
    id: 'duration',
    value: '10',
    placeholder: choice.time,
    name: choice.time,
    type: 'number', 
  });

  inputElement.addEventListener('input', () => {
    if(Number(inputElement.value) < 5 || Number(inputElement.value) > 30) {
      inputElement.setCustomValidity('Please enter a number between 5 and 30');
    } 
    inputElement.reportValidity();
  });
  inputElement.classList.remove('number-input');
  inputElement.classList.add('input-duration');
  labelElement.appendChild(inputElement);
  return { labelElement, inputElement };
}
