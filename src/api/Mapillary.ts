import moment from 'moment';

import Api from '@/api/Api';

import Image from '@/models/Image';
import Sequence from '@/models/Sequence';
import User from '@/models/User';

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

    public searchSequences(page: number = 1): Promise<Sequence[]> {
        return this.get('sequences', {
            '_page': page,
            'client_id': this.clientId,
            'max-lat': 90,
            'max-lon': 180,
            'min-lat': -90,
            'min-lon': -180,
            'page': page,
            'per_page': 10,
            'starred': true,
        })
            .then(collection => collection.features)
            .then(features => features.map((feature: Feature) => this.parseFeature(feature)));
    }

    public retrieveSequence(key: string): Promise<Sequence> {
        return this.get('sequences/' + key, { client_id: this.clientId })
            .then(feature => this.parseFeature(feature));
    }

    protected handleError(response: Response): Promise<any> {
        return response.json().then(error => {
            throw new Error('[Mapillary API] ' + error.message || 'Unknown error');
        });
    }

    private parseFeature(feature: Feature): Sequence {
        const sequence = new Sequence(feature.properties.key);
        sequence.author = new User(feature.properties.user_key, feature.properties.username);
        sequence.device = feature.properties.camera_make;
        sequence.capturedAt = moment(feature.properties.captured_at);
        sequence.createdAt = moment(feature.properties.created_at);
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
