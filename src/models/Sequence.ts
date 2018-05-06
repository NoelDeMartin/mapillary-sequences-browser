import { Moment } from 'moment';

import Image from '@/models/Image';
import User from '@/models/User';

export default class {

    public readonly key: string;

    public author?: User = undefined;
    public device?: string = undefined;
    public capturedAt?: Moment = undefined;
    public createdAt?: Moment = undefined;
    public images?: Image[] = undefined;

    constructor(key: string) {
        this.key = key;
    }

    public get distances(): number[] {
        if (this.images && this.images.length > 1) {
            const distances = [];
            let image = this.images[0];
            let totalDistance = 0;
            for (const next of this.images) {
                totalDistance += image.distance(next);
                distances.push(totalDistance);
                image = next;
            }
            return distances;
        } else {
            return [];
        }
    }

    public get totalDistance(): number {
        const length = this.distances.length;
        return length > 0 ? this.distances[length - 1] : 0;
    }

    public get imageKeys(): string[] {
        return this.images ? this.images.map(image => image.key) : [];
    }

    public get firstImage(): Image | null {
        return this.images && this.images.length > 0
            ? this.images[0]
            : null;
    }

}
