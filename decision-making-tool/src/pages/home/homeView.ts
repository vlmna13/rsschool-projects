import {
  createButtonAdd,
  createButtonClear,
  createButtonInsert,
} from './homeComponents/buttonsInteraction';
import { createTasksList } from './homeComponents/tasksList';
import { initState } from '../../utils/functionInit';
import { addItem } from './functionAddItem';
import { clearList } from './functionClearList';
import {
  createButtonStart,
  createLoadFileButton,
  createSaveFileButton,
} from './homeComponents/buttonsUserControl';
import { saveFile } from './functionSaveFile';
import { loadFile } from './functionLoadFile';
import { createDialogWrapper } from './homeComponents/dialogWrapper';
import { validateStart } from './functionValidateStart';

export function homeView(main: HTMLElement) {
  while (main.children.length > 1) {
    main.removeChild(main.lastChild!);
  }
  main.classList.remove('main-wheel-container');
  main.className = 'main-home-container';
  const data = initState();
  const tasksList = createTasksList(Object.values(data.optionsList.list));
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
  const buttonStart = createButtonStart();
  buttonStart.addEventListener('click', validateStart);
  main.appendChild(buttonStart);
}
