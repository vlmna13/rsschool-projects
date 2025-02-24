import './categories.css';
import { Source, CommonClass } from '../../../utils/utiles';

class Categories implements CommonClass<Source> {
    public draw(data: Source[]): void {
        const categoriesList: string[] = [];
        data.forEach((item: Source) => {
            if (item.category && !categoriesList.includes(item.category)) {
                categoriesList.push(item.category);
            }
        });
        const fragment: DocumentFragment = document.createDocumentFragment();
        const categoriesItemTemp = document.querySelector<HTMLTemplateElement>('#categoriesItemTemp');
        if (!(categoriesItemTemp && categoriesItemTemp.content instanceof DocumentFragment)) {
            throw new Error('sourceItemTemp is not a valid template element or its content is not a DocumentFragment');
        }
        categoriesList.forEach((item: string): void => {
            const categoriesClone = categoriesItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            if (categoriesClone) {
                const categoriesItemName = categoriesClone.querySelector<HTMLElement>('.categories__item-name');
                if (categoriesItemName) categoriesItemName.textContent = item;
                const categoriesItem = categoriesClone.querySelector<HTMLElement>('.categories__item');
                if (categoriesItem) categoriesItem.setAttribute('data-categories-id', item);
            }
            fragment.append(categoriesClone);
        });
        if (document) {
            const categories = document.querySelector<HTMLElement>('.categories');
            if (categories) categories.append(fragment);
        }
    }
}
export default Categories;
