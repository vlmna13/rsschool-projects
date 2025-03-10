import { createHeader } from '../../components/header';
import {
  createButtonAdd,
  createButtonClear,
  createButtonInsert,
} from './buttonsInteraction';
import { createMain } from './main';
import { createTasksList } from './tasksList';
import { createTaskWrapper } from './taskWrapper';
import { initState } from '../../utils/functionInit';

export function homeView() {
  const data = initState();
  console.log(data);
  const main = createMain();
  const header = createHeader();
  const tasksList = createTasksList();
  data.optionsList.list.forEach((item) => {
    const taskWrapper = createTaskWrapper({
      id: item.id,
      title: item.title,
      weight: item.weight,
    });

    tasksList.appendChild(taskWrapper);
  });

  main.appendChild(header);
  main.appendChild(tasksList);
  const buttonAdd = createButtonAdd();
  main.appendChild(buttonAdd);
  const buttonInsert = createButtonInsert();
  main.appendChild(buttonInsert);
  const buttonClear = createButtonClear();
  main.appendChild(buttonClear);
  document.body.appendChild(main);
}
