import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ResponseDataArticles, RequestCallback, ResponseDataSources } from '../../utils/utiles';
class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const callbackNews: RequestCallback = (data) => this.view.drawNews(data as ResponseDataArticles);
        const clickHandlerNews = (e: Event) => this.controller.getNews(e, callbackNews);
        const callbackCategory: RequestCallback = (data) => this.view.drawSources(data as ResponseDataSources);
        const clickHandlerCategory = (e: Event) => this.controller.getSources(e, callbackCategory);
        if (document) {
            const categories = document.querySelector<HTMLElement>('.categories');
            const sources = document.querySelector<HTMLElement>('.sources');
            if (sources) sources.addEventListener('click', clickHandlerNews);
            if (categories) categories.addEventListener('click', clickHandlerCategory);
        }
        // this.controller.getSources((data) => this.view.drawSources(data as ResponseDataSources));
        this.controller.getCategories((data) => this.view.drawCategories(data as ResponseDataSources));
    }
}

export default App;
