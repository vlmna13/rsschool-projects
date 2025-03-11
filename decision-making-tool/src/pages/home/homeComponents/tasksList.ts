import { createElement } from '../../../utils/createElement';
import '../home.css';
import { createTaskWrapper } from './taskWrapper';

export interface TaskWrapperOptions {
  id: string;
  title: string;
  weight: string;
}

export function createTasksList(tasks: TaskWrapperOptions[]): HTMLUListElement {
  const tasksList = createElement<HTMLUListElement>({
    tag: 'ul',
    classNames: ['tasks-list'],
  });

  tasks.forEach((item) => {
    const taskWrapper = createTaskWrapper({
      id: item.id,
      title: item.title,
      weight: item.weight,
    });

    tasksList.appendChild(taskWrapper);
  });

  return tasksList;
}
