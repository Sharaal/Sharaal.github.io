export const fetchContent = {
    model: 'gpt-4o',
    temperature: 0.3,
    prompt: `
Schreibe mir einen News Artikel mit dem Titel "{title}". 
Der Artikel soll etwa 1 Seite lang sein und mit Markdown formatiert sein. Der Titel soll nicht im Artikel enthalten sein, der Artikel soll direkt mit dem ersten Absatz beginnen. Füge ein <!--more--> zwischen dem ersten und zweiten Absatz ein.
Verwende dabei nur Informationen der letzten 7 Tage, sodass der Artikel nur die aktuellen Neuigkeiten zu dem Thema enthält.
Füge am Ende des Artikels einen Absatz mit den verlinkten Quellen hinzu.
Der Artikel soll in deutscher Sprache sein.
    `,
};
