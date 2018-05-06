export default class {

    public readonly key: string;
    public readonly name: string;

    constructor(key: string, name: string) {
        this.key = key;
        this.name = name;
    }

    public getAvatarUrl(clientId: string): string {
        return 'https://a.mapillary.com/v3/users/'
            + this.key
            + '/profile_photo.png?client_id='
            + clientId;
    }

    public get profileUrl(): string {
        return 'http://www.mapillary.com/profile/' + this.name;
    }

}
