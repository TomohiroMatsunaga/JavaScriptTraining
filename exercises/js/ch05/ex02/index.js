    export function escapeCharactersIfElse(inputString) {
    let escapedString = '';

    for (const char of inputString) {
        if (char === '0') {
            escapedString += '\0';
        } else if (char === 'b') {
            escapedString += '\b';
        } else if (char === 't') {
            escapedString += '\t';
        } else if (char === 'n') {
            escapedString += '\n';
        } else if (char === 'v') {
            escapedString += '\v';
        } else if (char === 'f') {
            escapedString += '\f';
        } else if (char === 'r') {
            escapedString += '\r';
        } else if (char === '"') {
            escapedString += '\"';
        } else if (char === "'") {
            escapedString += '\'';
        } else {
            escapedString += char;
        }
    }

    return escapedString;
}

export function escapeCharactersSwitch(inputString) {
    let escapedString = '';

    for (const char of inputString) {
        switch (char) {
            case '0':
                escapedString += '\0';
                break;
            case 'b':
                escapedString += '\b';
                break;
            case 't':
                escapedString += '\t';
                break;
            case 'n':
                escapedString += '\n';
                break;
            case 'v':
                escapedString += '\v';
                break;
            case 'f':
                escapedString += '\f';
                break;
            case 'r':
                escapedString += '\r';
                break;
            case '"':
                escapedString += '\"';
                break;
            case "'":
                escapedString += '\'';
                break;
            default:
                escapedString += char;
                break;
        }
    }

    return escapedString;
}
