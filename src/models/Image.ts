import { distanceBetweenCoordinates } from '@/utils/math';

export default class Image {

    public readonly key: string;

    public latitude?: number = undefined;
    public longitude?: number = undefined;

    public location?: Location = undefined;

    constructor(key: string) {
        this.key = key;
    }

    public distance(other: Image): number {
        return this === other && this.hasCoordinates() && other.hasCoordinates()
            ? 0
            : distanceBetweenCoordinates(
                <number> this.latitude,
                <number> this.longitude,
                <number> other.latitude,
                <number> other.longitude,
            );
    }

    public hasCoordinates(): boolean {
        return typeof this.latitude !== 'undefined' && typeof this.longitude !== 'undefined';
    }

    public hasLocation(): boolean {
        return typeof this.location !== 'undefined';
    }

    public get thumbnailUrl(): string {
        return 'https://d1cuyjsrcm0gby.cloudfront.net/' + this.key + '/thumb-320.jpg';
    }

}
