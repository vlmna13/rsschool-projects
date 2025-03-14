import { homeView } from './pages/home/homeView';
import { wheelView } from './pages/wheel/wheelView';
import { errorView } from './pages/error/errorView';
import { router } from './utils/router';
import { createLayout } from './pages/layout';

const main = createLayout(['main-home-container']);

document.addEventListener('DOMContentLoaded', () => {
  router.addRoute('home', () => homeView(main));
  router.addRoute('wheel', () => wheelView(main));
  router.setErrorComponent(errorView);

  if (!location.hash) {
    router.navigate('home'); // Переходим на страницу home при загрузке, если хэш пустой
  } else {
    router.loadRoute(location.hash); // Загружаем текущий маршрут
  }
});
