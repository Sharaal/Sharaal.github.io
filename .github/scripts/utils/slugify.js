export function slugify(text) {
    return text.toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/g, '');
}
