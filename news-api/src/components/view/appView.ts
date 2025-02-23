import News from './news/news';
import Sources from './sources/sources';
import { ResponseDataSources, ResponseDataArticles } from '../../utils/index';
import Categories from './categories/categories';

export class AppView {
    news: News;
    sources: Sources;
    categories: Categories;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.categories = new Categories();
    }

    drawNews(data: ResponseDataArticles) {
        if (data.status !== 'ok') return;
        this.news.draw(data.articles);
    }

    drawSources(data: ResponseDataSources) {
        if (data.status !== 'ok') return;
        this.sources.draw(data.sources);
    }

    drawCategories(data: ResponseDataSources) {
        if (data.status !== 'ok') return;
        this.categories.draw(data.sources);
    }
}
