---
layout: "post"
language: "de"
title: "Podcast: KI in der Softwareentwicklung"
tts: "assets/tts/2025-06-19-podcast-ki-in-der-softwareentwicklung.wav"
aigenerated: true
---

Ich wollte mich etwas intensiver mit ElevenLabs beschäftigen und die Podcast-Funktion anhand eines praktischen Beispiels ausprobieren. Dafür habe ich ein Interview-Skript von GPT-4o erstellen lassen, das Informationen zu unserer Initiative "KI in der Softwareentwicklung" enthält – einem Projekt, das ich in meiner Firma leite.
Leider habe ich erst später festgestellt, dass die Podcast-Funktion im kostenlosen Plan von ElevenLabs nicht verfügbar ist. Deshalb habe ich stattdessen das neue TTS-Modell von Gemini verwendet.
Auch wenn ich selbst nicht oft Podcasts höre, finde ich die Möglichkeit spannend, aus einem Dokument mit wenigen Schritten einen Podcast zu erstellen. So lassen sich auch Nutzer erreichen, die lieber zuhören, anstatt lange Texte zu lesen.

Hier also mein erstes Experiment – viel Spaß damit!

<!--more-->

## Zur Ergänzung das Transkript zum Podcast

**Susi:** Herzlich willkommen zu unserem Podcast über KI in der Softwareentwicklung. Heute sprechen wir über eine Initiative, die sich gezielt mit der Frage beschäftigt, wie KI in der Softwareentwicklung effizient und qualitativ hochwertig eingesetzt werden kann.

**Susi:** Hierfür haben wir Otto eingeladen. Hallo Otto, beginnen wir doch direkt mit der ersten Frage. Was ist das Hauptziel dieser KI-Initiative?

**Otto:** Hallo Susi, danke für die Einladung. Das zentrale Ziel unserer Initiative ist es, KI gezielt in der Softwareentwicklung zu nutzen, um unsere Arbeit effizienter und qualitativ hochwertiger zu gestalten. Dabei verfolgen wir drei konkrete Ziele: Erstens wollen wir wiederkehrende oder aufwändige Aufgaben automatisieren, um mehr Zeit für andere wichtige Themen zu haben. Zweitens möchten wir die Qualität der Softwareentwicklung steigern, indem KI beispielsweise bei Code-Reviews, Tests oder Dokumentation unterstützt. Und drittens geht es darum, Know-how rund um KI in der Softwareentwicklung besser zu verteilen, sodass Teams die Technologie sinnvoll und effektiv nutzen können.

**Susi:** Welche Tools sind für die KI unterstützte Softwareentwicklung am besten geeignet?

**Otto:** Bei der Auswahl geeigneter Tools schauen wir auf verschiedene Kriterien. Entwicklerfreundlichkeit ist natürlich wichtig, aber auch Datenschutz spielt eine große Rolle. Cursor bietet mit dem Business Plan eine zentralgesteuerte Privacy-Einstellung, und GitHub Copilot nutzt ebenfalls keine Daten der privaten Repos oder der Ein-/Ausgabe im VSCode. Bei den Kosten ist GitHub Copilot in unserem Team Plan integriert, während Cursor Business mit 40 Dollar pro Monat pro Benutzer relativ teuer, aber bisher das effektivste Tool für Entwickler ist. Ein wichtiger Punkt ist auch die Integration in bestehende Prozesse - durch die MCP-Unterstützung sowohl in GitHub Copilot als auch in Cursor gibt es eine breite Palette an erweiterten Funktionen für beide Tools.

**Susi:** Wie hat sich die Landschaft der Sprachmodelle entwickelt?

**Otto:** Die Sprachmodelle hatten teilweise noch sehr große Sprünge mit jeder Generation, wobei diese mittlerweile nicht mehr allzu gravierend sind. Ein praktisches Problem ist noch, welches Modell wo unterstützt wird und wie lange die Unterstützung eines neuen Modells dauert. Zum Beispiel wurde am 16. April ChatGPT o4-mini veröffentlicht - GitHub Copilot und Cursor Editor hatten direkt die Unterstützung, bei Langdock dauerte die Unterstützung ein paar Wochen.

**Susi:** Welche Datenschutzaspekte sind besonders wichtig?

**Otto:** Datenschutz ist ein kritischer Punkt. Die meisten kostenlosen Tools, wie zum Beispiel Jules, nutzen die Eingabedaten beziehungsweise den ausgegebenen Code für weitere Trainings. Daher sollten diese nur für Testzwecke und am besten nicht in den wichtigen Repositories verwendet werden. Ein wichtiger Punkt: Seit Mai 2025 gibt es für OpenAI ein Gerichtsurteil, das die Löschung von Chats verbietet. Daher werden alle Chats dauerhaft gespeichert. Langdock hostet alle Modelle in der EU und damit unter den Datenschutzbedingungen der EU, allerdings gibt es bisher noch keine Möglichkeit, Cursor oder GitHub Copilot mit Langdock zu verwenden.

**Susi:** Welche Best Practices haben sich für den KI-Einsatz entwickelt?

**Otto:** Wir setzen auf den "Expert in the Loop"-Ansatz: KI generiert, Entwickler prüft und optimiert. Dabei haben wir verschiedene Workflows getestet: Langdock mit dem Copy-and-Paste Workflow, GitHub Copilot und Cursor im Agent Mode. Jules haben wir auch ausprobiert, aber die Resultate waren mehr oder weniger unbrauchbar - sehr lange Wartezeiten, Abbruch des Workflows, fehlerhafte Ergebnisse die manuelle Nachbesserung benötigten. Async Workflow braucht anscheinend sehr gute Architektur, Dokumentation und Prompting um ohne Zutun gute Ergebnisse zu liefern.

**Susi:** Wie entwickeln Sie Prompt-Templates für Ihre Projekte?

**Otto:** Wir entwickeln Prompt-Templates und System-Prompts speziell für unsere Projekte. Eine Idee ist, Tooling rund um unsere Design Records zu nutzen, um diese automatisch mit zu berücksichtigen während der Entwicklung und auch in GitHub Copilot Code Reviews. Das könnte durch manuelles Copy-and-Paste oder GitHub Actions geschehen, um sie von Confluence in ein NPM Paket zu packen und sie dann per postinstall Skript ins System Prompt oder Cursor Rule reinzunehmen.

**Susi:** Welche Rolle spielt die Softwarearchitektur beim KI-Einsatz?

**Otto:** Wir untersuchen, wie wir unsere Softwarearchitektur anpassen können, um die Vorteile der KI besser zu nutzen. Ein wichtiger Aspekt sind Microservices versus Monolithen aufgrund der Kontextfensterbegrenzungen von Sprachmodellen. Auch die Wahl zwischen etablierten versus experimentellen Technologien spielt eine Rolle für den KI-Support durch bestehende Modelle. Dies hat sich jedoch seit Kurzem durch die MCP Server sehr geändert, da es damit nun sehr einfach ist, aktuelle Dokumentationen der genutzten Bibliotheken mit in den Context zu geben.

**Susi:** Welche Bedenken gibt es beim KI-Einsatz?

**Otto:** Es gibt mehrere wichtige Bedenken. Eine zentrale Frage ist: Wenn wir immer mehr mit KI beziehungsweise von der KI machen lassen, wie können wir unser eigenes Entwickler-Know-How langfristig sicherstellen? Auch der CO2-Fußabdruck ist ein Thema - KI-Einsatz bedeutet auch mehr Energieverbrauch, Stichwort Rebound-Effekt. Zusätzlich müssen wir Datenschutz, ethische Fragestellungen und technische Einschränkungen berücksichtigen.

**Susi:** Wie ist der Betriebsrat in diese Initiative einbezogen?

**Otto:** Das ist ein wichtiger Punkt. Sobald geplant ist, wie auch immer geartete KI im Betrieb einzusetzen, muss der Betriebsrat rechtzeitig - also deutlich vor Inbetriebnahme, am besten in der Planungsphase - und umfassend informiert werden. Wenn eine "technische Einrichtung" sich zur Leistungs- und Verhaltenskontrolle eignet, bedarf die Inbetriebnahme und die Ausgestaltung der Nutzung der Zustimmung des Betriebsrats. Das wird normalerweise über eine Betriebsvereinbarung geregelt.

**Susi:** Welche Zukunftsperspektiven sehen Sie für eigenes Hosting von KI-Modellen?

**Otto:** Das ist eine spannende Frage, die wir untersuchen. Es sinnvoll, selbst gehostete Modelle zu verwenden, wenn volle Kontrolle über Ein- und Ausgaben zu behalten wichtig ist, insbesondere in sensiblen Bereichen. Dabei müssen Fragen geklärt werden wie: Welche technischen und infrastrukturellen Voraussetzungen sind dafür notwendig? Eine Alternative wäre, unsere Tools über die Langdock API und somit über EU-gehostete Modelle zu nutzen.

**Susi:** Vielen Dank für diese umfassenden Einblicke in Ihre KI-Initiative. Es zeigt sich, dass der Einsatz von KI in der Softwareentwicklung nicht nur technische, sondern auch organisatorische, rechtliche und ethische Aspekte umfasst. Die Balance zwischen Effizienzsteigerung und dem Erhalt von Entwickler-Know-how wird sicherlich eine der zentralen Herausforderungen der kommenden Jahre bleiben.

**Otto:** Vielen Dank für das interessante Gespräch. Es war mir eine Freude, unsere Erfahrungen und Erkenntnisse zu teilen.

**Susi:** Das war unser Podcast zu KI in der Softwareentwicklung. Vielen Dank fürs Zuhören und bis zum nächsten Mal!
