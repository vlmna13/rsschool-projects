type Route = {
  path: string;
  component: () => void;
};

class Router {
  private routes: Route[] = []; // массив машрутов, добавляются с помощью метода addRoute
  private errorComponent?: () => void; // если компонент не найден

  constructor() {
    window.addEventListener("hashchange", () => {
      this.loadRoute(location.hash);
    });
  }

  public addRoute(path: string, component: () => void): void {
    this.routes.push({ path, component }); // добавляет новый маршрут
  }

  public setErrorComponent(component: () => void): void {
    this.errorComponent = component; // маршрут не найден
  }

  public navigate(path: string): void {
    if (location.hash !== `#${path}`) {
      location.hash = path; // изменяет хэш в URL
      this.loadRoute(location.hash); // загружает маршрут
    }
  }

  public loadRoute(hash: string): void {
    const path = hash.replace("#", "");
    if (path === "") {
      this.navigate("login"); // если пустой хэш, переходим на страницу логина
      return;
    }
    const route = this.routes.find((route) => route.path === path);
    if (route) {
      route.component();
    } else if (this.errorComponent) {
      this.errorComponent();
    } else {
      console.error(`Route not found: ${path}`);
    }
  }
}

export const router = new Router();
