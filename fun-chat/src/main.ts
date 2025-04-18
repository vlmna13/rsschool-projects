import { router } from "./utils/router";
import { LoginView } from "./pages/login/loginView";
import { InfoView } from "./pages/info/infoView";
import { HeaderComponent } from "./header/headerComponent";
import { FooterComponent } from "./footer/footerComponent";
import { Component } from "./utils/component";
import "./common.css";
import { ChatView } from "./pages/chat/chatView";
import { WebSocketManager } from "./utils/webSocketManager";

const URL = "ws://localhost:4000";
const wsManager = new WebSocketManager(URL);
const mainComponent = new Component<"main">({
  tag: "main",
  className: "main-wrapper",
});

document.body.append(new HeaderComponent().getNode());
document.body.append(mainComponent.getNode());
document.body.append(new FooterComponent().getNode());

document.addEventListener("DOMContentLoaded", () => {
  router.addRoute("login", () => {
    const savedUser = sessionStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (user && user.login) {
      console.warn("Access denied. Redirecting to chat...");
      router.navigate("chat");
      return;
    }
    mainComponent
      .getNode()
      .append(new LoginView(mainComponent, wsManager).getNode());
  });
  router.addRoute("information", () => {
    mainComponent.getNode().append(new InfoView(mainComponent).getNode());
  });
  router.addRoute("chat", () => {
    const savedUser = sessionStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (!user || !user.login) {
      console.warn("Access denied. Redirecting to login...");
      router.navigate("login");
      return;
    }
    mainComponent
      .getNode()
      .append(new ChatView(mainComponent, wsManager).getNode());
  });
  router.setErrorComponent(() => console.log("Page not found"));
  if (!location.hash) {
    router.navigate("login");
  } else {
    router.loadRoute(location.hash.slice(1));
  }
});
