import Creator from '../util/creator';
import { defaultInputValue, InputParams } from '../util/types';

export default class Input extends Creator<HTMLInputElement> {
  constructor(params: InputParams) {
    super({
      tag: 'input',
      classNames: ['input'],
    });

    const element = this.getElement();
    element.id = params.id;
    element.value = '';
    element.placeholder = params.placeholder || defaultInputValue.title;

    if (params.type === 'number') {
      element.type = 'number';
      element.addEventListener('input', this.validateNumberInput);
    }
  }
  private validateNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (!/^\d*$/.test(value)) {
      input.value = value.replace(/[^\d]/g, '');
    }
  }
}
