import Creator from '../util/creator';
import { ButtonParams } from '../util/types';

export default class Button extends Creator<HTMLButtonElement> {
  constructor(params: ButtonParams) {
    super({
      tag: 'button',
      classNames: params.classNames,
      textContent: params.textContent,
    });

    const element = this.getElement();
    element.addEventListener('click', (event) =>
      params.callback(element, event),
    );
  }
}
