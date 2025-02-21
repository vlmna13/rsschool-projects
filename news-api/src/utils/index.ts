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
    urlToImage: string;
}