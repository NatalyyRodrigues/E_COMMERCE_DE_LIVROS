export function normalizeRow(row) {
    if (!row) {
        return row;
    }

    const normalized = {};
    for (const [key, value] of Object.entries(row)) {
        normalized[key.toLowerCase()] = value;
    }
    return normalized;
}

export function normalizeRows(rows = []) {
    return rows.map((row) => normalizeRow(row));
}