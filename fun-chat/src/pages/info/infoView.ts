import { Component } from "../../utils/component";
import { router } from "../../utils/router";
import "../../common.css";
import "./infoView.css";

const DESCRIPTION = `Данный проект создан исключительно для образовательных целей и демонстрации навыков работы с TypeScript и WebSocket.
Приложение позволяет пользователю взаимодействовать с сервером через WebSocket-соединение,
отправлять и получать сообщения в реальном времени. В проекте реализованы основные функции,
такие как аутентификация пользователя, отправка сообщений и отображение истории сообщений.
Приложение также включает в себя обработку ошибок и управление состоянием соединения.
Приложение не прошло тестирование на безопасность и производительность,
и не рекомендуется использовать его в производственной среде.
Все, что вы видите перед собой, омыто моими слезами. Пы.Сы. Приложение работает на порту 4000`;

export class InfoView extends Component<"div"> {
  constructor(mainComponent: Component<"main">) {
    super({
      tag: "div",
      className: "info-view",
    });
    const title = new Component({
      tag: "h1",
      className: "info-title",
      text: "Информация о проекте",
    });
    const description = new Component<"p">({
      tag: "p",
      className: "info-description",
    });
    description.setTextContent(DESCRIPTION);

    const buttonBack = new Component<"button">({
      tag: "button",
      className: "button-back",
      text: "Назад к веселью",
    });
    buttonBack.addListener("click", () => {
      router.navigate("login");
    });
    this.appendChildren([title, description, buttonBack]);
    mainComponent.destroyChildren();
    mainComponent.appendElement(this);
  }
}
