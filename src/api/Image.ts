export default class {

    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    get url(): string {
        return 'https://d1cuyjsrcm0gby.cloudfront.net/' + this.key + '/thumb-320.jpg';
    }

}
