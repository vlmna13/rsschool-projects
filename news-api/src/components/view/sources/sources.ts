import './sources.css';
import { Source, CommonClass } from '../../../utils/index';

class Sources implements CommonClass<Source> {
    public draw(data: Source[]): void {
        const categoryDiv = document.querySelector<HTMLElement>('[data-category]');
        if (!categoryDiv) return;
        const dataCategory = categoryDiv.getAttribute('data-category');
        if (!dataCategory) return;
        const sortedData = data.filter((item: Source) => item.category === dataCategory);
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!(sourceItemTemp && sourceItemTemp.content instanceof DocumentFragment)) {
            throw new Error('sourceItemTemp is not a valid template element or its content is not a DocumentFragment');
        }
        sortedData.forEach((item: Source): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            if (sourceClone) {
                const sourceItemName = sourceClone.querySelector<HTMLElement>('.source__item-name');
                if (sourceItemName) sourceItemName.textContent = item.name;
                const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
                if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);
            }
            fragment.append(sourceClone);
        });
        if (document) {
            const sources = document.querySelector<HTMLElement>('.sources');
            if (sources) {
                sources.innerHTML = '';
                sources.append(fragment);
            }
        }
    }
}

export default Sources;
