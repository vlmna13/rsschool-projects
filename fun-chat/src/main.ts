import { router } from "./utils/router";
import { LoginView } from "./pages/login/loginView";
import { InfoView } from "./pages/info/infoView";
import { HeaderComponent } from "./header/headerComponent";
import { FooterComponent } from "./footer/footerComponent";
import { Component } from "./utils/component";
import "./common.css";

const mainComponent = new Component<"main">({
  tag: "main",
  className: "main-wrapper",
});

document.body.append(new HeaderComponent().getNode());
document.body.append(mainComponent.getNode());
document.body.append(new FooterComponent().getNode());

document.addEventListener("DOMContentLoaded", () => {
  router.addRoute("login", () => {
    mainComponent.getNode().append(new LoginView(mainComponent).getNode());
  });
  router.addRoute("information", () => {
    mainComponent.getNode().append(new InfoView(mainComponent).getNode());
  });
  router.setErrorComponent(() => console.log("Page not found"));
  if (!location.hash) {
    router.navigate("login");
  } else {
    router.loadRoute(location.hash);
  }
});
