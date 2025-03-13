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
import { createDialogWrapper } from './homeComponents/dialogWrapper';

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
  buttonInsert.addEventListener('click', () => {
    createDialogWrapper(tasksList);
  });
  const buttonClear = createButtonClear();
  buttonClear.addEventListener('click', () => clearList(tasksList));
  main.appendChild(buttonClear);
  const buttonSave = createSaveFileButton();
  buttonSave.addEventListener('click', saveFile);
  main.appendChild(buttonSave);
  const buttonLoad = createLoadFileButton();
  buttonLoad.addEventListener('click', () => loadFile(tasksList));
  main.appendChild(buttonLoad);
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  document.body.appendChild(main);
}
