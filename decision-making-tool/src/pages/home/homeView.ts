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
  const buttonAdd = createButtonAdd();
  buttonAdd.addEventListener('click', () => addItem(tasksList));
  const buttonInsert = createButtonInsert();
  buttonInsert.addEventListener('click', () => {
    createDialogWrapper(tasksList);
  });
  const buttonClear = createButtonClear();
  buttonClear.addEventListener('click', () => clearList(tasksList));
  const buttonSave = createSaveFileButton();
  buttonSave.addEventListener('click', saveFile);
  const buttonLoad = createLoadFileButton();
  buttonLoad.addEventListener('click', () => loadFile(tasksList));
  const buttonStart = createButtonStart();
  buttonStart.addEventListener('click', validateStart);
  main.append(
    tasksList,
    buttonAdd,
    buttonInsert,
    buttonClear,
    buttonSave,
    buttonLoad,
    buttonStart,
  );
}
