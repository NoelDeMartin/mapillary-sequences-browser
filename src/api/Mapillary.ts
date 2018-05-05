import Image from '@/api/Image';
import Sequence from '@/api/Sequence';

const API_URL = 'https://a.mapillary.com/v3/';

export interface FeatureCollection {
    features: Feature[];
}

export interface Feature {

    id?: string;

    geometry: any;

    properties: {
        camera_make: string;
        captured_at: string;
        created_at: string;
        coordinateProperties: {
            cas: number[];
            image_keys: string[];
        };
        key: string;
        pano: boolean;
        starred: boolean;
        user_key: string;
        username: string;
    };

}

export default class {

    public readonly clientId: string;

    constructor(clientId: string) {
        this.clientId = clientId;
    }

    public searchSequences(perPage: number = 10): Promise<Sequence[]> {
        return this.get('sequences', {
            'client_id': this.clientId,
            'max-lat': 90,
            'max-lon': 180,
            'min-lat': -90,
            'min-lon': -180,
            'per_page': perPage,
            'starred': true,
        })
            .then((collection: FeatureCollection) => {
                return collection.features.map(feature => {
                    const sequence = new Sequence(feature.properties.key);
                    sequence.load(feature);
                    return sequence;
                });
            });
    }

    private get(endpoint: string, params: object): Promise<any> {
        const url = new URL(API_URL + endpoint);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url.href).then(response => response.json());
    }

}
