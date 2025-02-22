export interface Source {
    id: string;
    name: string;
}

export interface Article {
    id: string;
    name: string;
    source: Source;
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string | null;
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

export interface ResponseData<T> {
    status: Answers;
    items: T[];
}
