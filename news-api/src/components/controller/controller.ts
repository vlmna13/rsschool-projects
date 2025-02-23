import AppLoader from './appLoader';
import { RequestCallback, EndpointVar, Baseloader } from '../../utils/index';

class AppController extends AppLoader implements Baseloader {
    getSources(callback: RequestCallback): void {
        super.getResp(
            {
                endpoint: EndpointVar.Source,
                itemsKey: EndpointVar.Source,
            },
            callback
        );
    }

    getNews(e: Event, callback: RequestCallback): void {
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
