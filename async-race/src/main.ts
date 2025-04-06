import { GarageView } from "./pages/garage/garageView";
import { WinnersView } from "./pages/winners/winnersView";
import { router } from "./utils/router";
import "./styles/common.css";
import { createMainElement } from "./pages/components/mainElement";
// import { createWrapperButtons } from "./pages/components/buttonsRouting/buttonsRouting";

const { mainElement, childView } = createMainElement();
const garageView = new GarageView(childView);
const winnersView = new WinnersView(childView);
document.addEventListener("DOMContentLoaded", () => {
  router.addRoute("garage", () => garageView.render());

  router.addRoute("winners", () => winnersView.render());
  router.setErrorComponent(() => console.log("Page not found"));

  document.body.append(mainElement);

  if (!location.hash) {
    router.navigate("garage"); // Переходим на страницу garage при загрузке, если хэш пустой
  } else {
    router.loadRoute(location.hash); // Загружаем текущий маршрут
  }
});
