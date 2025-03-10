import { createElement } from '../../utils/createElement';
import './home.css';

export function createTaskWrapper(): HTMLLIElement {
  const taskWrapper = createElement<HTMLLIElement>({
    tag: 'li',
    classNames: ['task-wrapper'],
  });
  return taskWrapper;
}
