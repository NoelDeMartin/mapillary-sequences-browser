export default abstract class {

    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    protected get(endpoint: string, params: object): Promise<any> {
        const url = new URL(this.url + endpoint);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url.href).then(response => response.json());
    }

}
