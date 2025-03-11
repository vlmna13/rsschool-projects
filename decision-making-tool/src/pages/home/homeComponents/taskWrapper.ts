import { createElement } from '../../../utils/createElement';
import '../home.css';
import { createLabel } from '../../../components/label';
import { createInput, choice } from '../../../components/input';
import { createButtonDelete } from './buttonsInteraction';

export interface TaskWrapperOptions {
  id: string;
  title: string;
  weight: string;
}

export function createTaskWrapper(options: TaskWrapperOptions): HTMLLIElement {
  const taskWrapper = createElement<HTMLLIElement>({
    tag: 'li',
    classNames: ['task-wrapper'],
  });

  const label = createLabel({
    textContent: options.id,
    htmlFor: `title-input-${options.id}`,
  });

  const inputTitle = createInput({
    id: `title-input-${options.id}`,
    value: options.title,
    placeholder: choice.title,
    name: choice.title,
  });

  const inputWeight = createInput({
    id: `weight-input-${options.id}`,
    value: options.weight,
    placeholder: choice.weight,
    name: choice.weight,
    type: 'number',
  });

  const buttonDelete = createButtonDelete();

  taskWrapper.appendChild(label);
  taskWrapper.appendChild(inputTitle);
  taskWrapper.appendChild(inputWeight);
  taskWrapper.appendChild(buttonDelete);

  return taskWrapper;
}
