import Api from '@/api/Api';
import Image from '@/api/Image';
import Sequence from '@/api/Sequence';

const API_URL = 'https://a.mapillary.com/v3/';

interface FeatureCollection {
    features: Feature[];
}

interface Feature {

    id?: string;

    geometry: {
        type: string;
        coordinates: number[][];
    };

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

export default class extends Api {

    public readonly clientId: string;

    constructor(clientId: string) {
        super(API_URL);
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
            .then(collection => collection.features)
            .then(features => features.map((feature: Feature) => this.parseFeature(feature)));
    }

    private parseFeature(feature: Feature): Sequence {
        const sequence = new Sequence(feature.properties.key);
        sequence.author = feature.properties.username;
        sequence.images = [];

        const imageKeys = feature.properties.coordinateProperties.image_keys;
        const coordinates = feature.geometry.coordinates;
        for (let i = 0; i < imageKeys.length; i++) {
            const image = new Image(feature.properties.coordinateProperties.image_keys[i]);
            image.longitude = coordinates[i][0];
            image.latitude = coordinates[i][1];
            sequence.images.push(image);
        }

        return sequence;
    }

}
