import Image from '@/api/Image';
import { Feature } from '@/api/Mapillary';

export default class {

    private key: string;

    private author?: string;
    private images?: Image[];

    constructor(key: string) {
        this.key = key;
    }

    public load(feature: Feature): void {
        this.author = feature.properties.username;
        this.images = feature.properties.coordinateProperties.image_keys.map(key => new Image(key));
    }

}
