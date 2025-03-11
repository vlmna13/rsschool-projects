import { createElement } from '../utils/createElement';
import './componentsStyles.css';

interface LabelOptions {
  textContent: string;
  htmlFor: string;
}

export function createLabel(options: LabelOptions): HTMLLabelElement {
  const label = createElement<HTMLLabelElement>({
    tag: 'label',
    classNames: ['label'],
    textContent: '#' + options.textContent,
  });
  label.htmlFor = options.htmlFor;
  return label;
}
