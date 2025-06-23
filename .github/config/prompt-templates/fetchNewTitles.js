export const fetchNewTitles = {
    model: 'gpt-4o',
    temperature: 0.3,
    prompt: `
Gib mir eine Übersicht über alle aktuellen Neuigkeiten zum Thema {topic}.

Beachte dabei aber nur Neuigkeiten der letzten 7 Tage und nur die 3 wichtigsten Neuigkeiten.

Formatiere die Antwort EXAKT in diesem Markdown-Format:
- Titel 1
- Titel 2
- Titel 3

Wichtig:
- Jede Zeile beginnt mit "- " (Bindestrich + Leerzeichen)
- Ein Titel pro Zeile
- Die Titel sollten in deutscher Sprache sein

Ignoriere aber dabei folgende bereits bekannte Neuigkeiten: {existingTitles}
    `,
};
