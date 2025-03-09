import Creator from '../util/creator';
import { LabelParams } from '../util/types';

export default class Label extends Creator<HTMLLabelElement> {
  constructor(params: LabelParams) {
    super({
      tag: 'label',
      classNames: params.classNames,
      textContent: params.textContent,
    });

    const element = this.getElement();
    element.htmlFor = params.htmlFor;
  }
}
