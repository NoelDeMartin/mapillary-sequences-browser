import Api from '@/api/Api';

import Location from '@/models/Location';

const API_URL = 'https://nominatim.openstreetmap.org/';

interface Place {
    place_id: string;
    osm_id: string;
    osm_type: string;
    lat: string;
    lon: string;
    category: string;
    type: string;
    addresstype: string;
    name: string;
    display_name: string;
    address: {
        road: string;
        village: string;
        state_district: string;
        state: string;
        postcode: string;
        country: string;
        country_code: string;
    };
}

export default class extends Api {

    constructor() {
        super(API_URL);
    }

    public searchLocation(latitude: number, longitude: number): Promise<Location> {
        return this.get('reverse', {
            format: 'jsonv2',
            lat: latitude,
            lon: longitude,
        })
            .then((place: Place) => new Location(place.display_name, place.address.country));
    }

    protected handleError(response: Response): Promise<any> {
        throw new Error('[Nominatim API] Unknown Error');
    }

}
