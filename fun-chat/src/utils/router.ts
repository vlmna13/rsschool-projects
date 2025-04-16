type Route = {
  path: string;
  component: () => void;
};

class Router {
  private routes: Route[] = [];
  private errorComponent?: () => void;

  constructor() {
    window.addEventListener("hashchange", () => {
      this.loadRoute(location.hash);
    });
  }

  public addRoute(path: string, component: () => void): void {
    this.routes.push({ path, component });
  }

  public setErrorComponent(component: () => void): void {
    this.errorComponent = component;
  }

  public navigate(path: string): void {
    location.hash = path;
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
