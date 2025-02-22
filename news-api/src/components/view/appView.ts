import News from './news/news';
import Sources from './sources/sources';
import { Article, Source, ResponseData } from '../../utils/index';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ResponseData<Article>): void {
        const values: Article[] = data.items ? data.items : [];
        this.news.draw(values);
    }

    public drawSources(data: ResponseData<Source>): void {
        const values: Source[] = data.items ? data.items : [];
        this.sources.draw(values);
    }
}

export default AppView;
