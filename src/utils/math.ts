const EARTH_RADIUS = 6371e3;

export function degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

export function distanceBetweenCoordinates(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number,
): number {

    const deltaLatitude = degreesToRadians(latitude2 - latitude1);
    const deltaLongitude = degreesToRadians(longitude2 - longitude1);

    latitude1 = degreesToRadians(latitude1);
    latitude2 = degreesToRadians(latitude2);

    // Use harversine formula

    const a =
        Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
        Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2) *
        Math.cos(latitude1) * Math.cos(latitude2);

    return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
