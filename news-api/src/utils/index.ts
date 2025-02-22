export interface Source {
    id: string;
    name: string;
}

export interface Article {
    source: Source;
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string | null;
}

export type QueryOptions = {
    [category: string]: string;
};

export type CommonClass<T> = {
    draw(data: T[]): void;
};

export enum Answers {
    Ok = 'ok',
    Error = 'error',
}

export interface ResponseDataSources {
    status: Answers;
    totalResults: number;
    sources: Source[];
}

export interface ResponseDataArticles {
    status: Answers;
    totalResults: number;
    articles: Article[];
}

export interface ResponseData<Type> {
    status: string;
    items: Type[];
}

export enum EndpointVar {
    Source = 'sources',
    News = 'everything',
}

export interface RequestOptions {
    endpoint: string;
    itemsKey: EndpointVar;
    options?: QueryOptions;
}

export interface RequestCallback {
    (jsonData: ResponseDataSources | ResponseDataArticles): void;
}

export interface Baseloader {
    baseLink: string;
    options: object;
    getResp(requestOptions: RequestOptions, callback: RequestCallback): void;
    errorHandler(response: Response): Response;
    makeUrl(requestOptions: RequestOptions): string;
    load(method: string, requestOptions: RequestOptions, callback: RequestCallback): void;
}
