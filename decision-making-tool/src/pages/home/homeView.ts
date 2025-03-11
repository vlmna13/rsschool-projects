import { createHeader } from '../../components/header';
import {
  createButtonAdd,
  createButtonClear,
  createButtonInsert,
} from './homeComponents/buttonsInteraction';
import { createMain } from './homeComponents/mainElement';
import { createTasksList } from './homeComponents/tasksList';
import { initState } from '../../utils/functionInit';
import { addItem } from './functionAddItem';

export function homeView() {
  const data = initState();
  const main = createMain();
  const header = createHeader();
  const tasksList = createTasksList(Object.values(data.optionsList.list));
  main.appendChild(header);
  main.appendChild(tasksList);
  const buttonAdd = createButtonAdd();
  buttonAdd.addEventListener('click', () => addItem(tasksList));
  main.appendChild(buttonAdd);
  const buttonInsert = createButtonInsert();
  main.appendChild(buttonInsert);
  const buttonClear = createButtonClear();
  main.appendChild(buttonClear);
  document.body.appendChild(main);
}
