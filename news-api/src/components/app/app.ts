import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ResponseDataArticles, RequestCallback, ResponseDataSources } from '../../utils/index';
class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const callback: RequestCallback = (data) => this.view.drawNews(data as ResponseDataArticles);
        const clickHandler = (e: Event) => this.controller.getNews(e, callback);
        if (document) {
            const sources = document.querySelector<HTMLElement>('.sources');
            if (sources) sources.addEventListener('click', clickHandler);
        }
        this.controller.getSources((data) => this.view.drawSources(data as ResponseDataSources));
    }
}

export default App;
