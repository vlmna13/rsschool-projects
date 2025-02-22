import News from './news/news';
import Sources from './sources/sources';
import { ResponseDataSources, ResponseDataArticles } from '../../utils/index';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ResponseDataArticles) {
        if (data.status !== 'ok') return;
        this.news.draw(data.articles);
    }

    drawSources(data: ResponseDataSources) {
        if (data.status !== 'ok') return;
        this.sources.draw(data.sources);
    }
}
