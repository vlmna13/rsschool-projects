import News from './news/news';
import Sources from './sources/sources';
import { ResponseDataSources, ResponseDataArticles } from '../../utils/utiles';
import Categories from './categories/categories';

export class AppView {
    private news: News;
    private sources: Sources;
    private categories: Categories;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.categories = new Categories();
    }

    public drawNews(data: ResponseDataArticles) {
        if (data.status !== 'ok') return;
        this.news.draw(data.articles);
    }

    public drawSources(data: ResponseDataSources) {
        if (data.status !== 'ok') return;
        this.sources.draw(data.sources);
    }

    public drawCategories(data: ResponseDataSources) {
        if (data.status !== 'ok') return;
        this.categories.draw(data.sources);
    }
}
