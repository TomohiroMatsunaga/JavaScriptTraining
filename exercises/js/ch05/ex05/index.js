export function filterEvenValues(obj) {
    const result = {};
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'number' && value % 2 === 0) {
            result[key] = value;
        }
    }
    return result;
}
