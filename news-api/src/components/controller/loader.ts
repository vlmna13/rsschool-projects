import { RequestOptions, RequestCallback, ResponseDataSources, ResponseDataArticles } from '../../utils/utiles';

class Loader {
    public baseLink: string;
    public options: object;
    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(requestOptions: RequestOptions, callback: RequestCallback): void {
        this.load('GET', requestOptions, callback);
    }

    protected errorHandler(response: Response): Response {
        if (!response.ok) {
            if (response.status === 401 || response.status === 404)
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            throw Error(response.statusText);
        }
        return response;
    }

    protected makeUrl({ options, endpoint }: RequestOptions) {
        const urlOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    protected load(method: string, requestOptions: RequestOptions, callback: RequestCallback) {
        fetch(this.makeUrl(requestOptions), { method })
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then((jsonData) => {
                if (jsonData.sources) {
                    callback(jsonData as ResponseDataSources);
                } else {
                    callback(jsonData as ResponseDataArticles);
                }
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
