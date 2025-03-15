import { createElement } from '../utils/createElement';
import './componentsStyles.css';
import { whatchInputChange } from '../pages/home/functionChangeInput';

export enum choice {
  title = 'Title',
  weight = 'Weight',
}

export interface InputOptions {
  id: string;
  value: string;
  placeholder: choice;
  name: choice;
  type?: 'number';
  events?: { [key: string]: (element: HTMLInputElement, event: Event) => void };
}

export function createInput(options: InputOptions): HTMLInputElement {
  const input = createElement<HTMLInputElement>({
    tag: 'input',
    classNames:
      options.type === 'number'
        ? ['input', 'number-input']
        : ['input', 'text-input'],
  });
  input.id = options.id;
  input.value = options.value;
  input.placeholder = options.placeholder;
  input.name = options.name;
  input.type = options.type || 'text';
  input.addEventListener('keyup', () => whatchInputChange(input));
  return input;
}
