import { createElement } from '../utils/createElement';
import './componentsStyles.css';

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

export function validateNumberInput(
  this: HTMLInputElement,
  event: Event,
): void {
  const value = this.value;
  if (!/^[\d.,]*$/.test(value)) {
    this.value = value.replace(/[^\d.,]/g, '');
  }
}

export function createInput(options: InputOptions): HTMLInputElement {
  const input = createElement<HTMLInputElement>({
    tag: 'input',
    classNames:
      options.type === 'number'
        ? ['label', 'number-input']
        : ['label', 'text-input'],
  });

  input.id = options.id;
  input.value = options.value;
  input.placeholder = options.placeholder;
  input.name = options.name;
  input.type = options.type || 'text';

  if (options.type === 'number') {
    input.addEventListener('input', validateNumberInput);
  }

  return input;
}
