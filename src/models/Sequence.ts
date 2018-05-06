import { Moment } from 'moment';

import Image from '@/models/Image';
import User from '@/models/User';

const FAVORITES_STORAGE_KEY = 'favorite-sequences';

export default class Sequence {

    public static addFavorite(sequence: Sequence): void {
        const favorites = this.getFavorites();

        if (favorites.indexOf(sequence.key) === -1) {
            favorites.push(sequence.key);
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        }
    }

    public static removeFavorite(sequence: Sequence): void {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(sequence.key);

        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        }
    }

    public static getFavorites(): string[] {
        const favoriteSequences = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return favoriteSequences ? JSON.parse(favoriteSequences) : [];
    }

    public readonly key: string;

    public favorite: boolean = false;

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
