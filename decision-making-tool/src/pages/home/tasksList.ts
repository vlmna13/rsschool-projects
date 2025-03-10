import { createElement } from '../../utils/createElement';
import './home.css';

export function createTasksList(): HTMLUListElement {
  const tasksList = createElement<HTMLUListElement>({
    tag: 'ul',
    classNames: ['tasks-list'],
  });
  return tasksList;
}
