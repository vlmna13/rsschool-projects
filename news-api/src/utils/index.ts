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
    urlToImage: string;
}

export type Categories = {
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
