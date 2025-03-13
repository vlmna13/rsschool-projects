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
import { clearList } from './functionClearList';
import {
  createLoadFileButton,
  createSaveFileButton,
} from './homeComponents/buttonsUserControl';
import { saveFile } from './functionSaveFile';
import { loadFile } from './functionLoadFile';

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
  buttonClear.addEventListener('click', () => clearList(tasksList));
  main.appendChild(buttonClear);
  const buttonSave = createSaveFileButton();
  buttonSave.addEventListener('click', saveFile);
  main.appendChild(buttonSave);
  const buttonLoad = createLoadFileButton();
  buttonLoad.addEventListener('click', () => loadFile(tasksList));
  main.appendChild(buttonLoad);
  document.body.appendChild(main);
}
