export function distance(value: number): string {
    if (value > 1000) {
        return (value / 1000).toFixed(2) + ' Km';
    } else {
        return value.toFixed() + ' m';
    }
}
