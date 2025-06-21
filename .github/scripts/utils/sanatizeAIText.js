export function sanitizeAIText(text) {
    return text
        .replace(/```markdown/, '')
        .replace(/```/, '')
        .replace(/[„“‘’]/g, '"')
        .replace(/【.*?】/g, '')
        .trim();
}
