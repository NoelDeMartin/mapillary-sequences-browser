import Image from '@/api/Image';

export default class {

    public readonly key: string;

    public author?: string = undefined;
    public images?: Image[] = undefined;

    constructor(key: string) {
        this.key = key;
    }

}
