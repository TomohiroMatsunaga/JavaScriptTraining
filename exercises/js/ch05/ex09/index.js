export function parseJson(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: error.toString() };
    }
}
