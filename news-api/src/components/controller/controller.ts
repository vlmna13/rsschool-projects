import AppLoader from './appLoader';
import { RequestCallback, EndpointVar } from '../../utils/utiles';

class AppController extends AppLoader {
    public getCategories(callback: RequestCallback): void {
        super.getResp(
            {
                endpoint: EndpointVar.Source,
                itemsKey: EndpointVar.Source,
            },
            callback
        );
    }

    public getSources(e: Event, callback: RequestCallback): void {
        let target = e.target;
        const sourcesContainer = e.currentTarget;
        if (!sourcesContainer || !(sourcesContainer instanceof HTMLElement)) return;
        while (target !== sourcesContainer) {
            if (!target || !(target instanceof HTMLElement)) return;
            if (target.classList.contains('categories__item')) {
                const categoriesId = target.getAttribute('data-categories-id');
                if (!categoriesId) return;
                if (sourcesContainer.getAttribute('data-category') !== categoriesId) {
                    sourcesContainer.setAttribute('data-category', categoriesId);
                    super.getResp(
                        {
                            endpoint: EndpointVar.Source,
                            itemsKey: EndpointVar.Source,
                            options: {
                                sources: categoriesId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }

    public getNews(e: Event, callback: RequestCallback): void {
        let target = e.target;
        const newsContainer = e.currentTarget;
        if (!newsContainer || !(newsContainer instanceof HTMLElement)) return;
        while (target !== newsContainer) {
            if (!target || !(target instanceof HTMLElement)) return;
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: EndpointVar.News,
                            itemsKey: EndpointVar.News,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
