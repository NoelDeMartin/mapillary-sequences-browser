export default class {

    public readonly key: string;

    public latitude?: number = undefined;
    public longitude?: number = undefined;

    public location?: Location = undefined;

    constructor(key: string) {
        this.key = key;
    }

    public hasLocation(): boolean {
        return typeof this.location !== 'undefined';
    }

    get url(): string {
        return 'https://d1cuyjsrcm0gby.cloudfront.net/' + this.key + '/thumb-320.jpg';
    }

}
