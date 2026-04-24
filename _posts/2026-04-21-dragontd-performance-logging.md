---
layout: "post"
title: "DragonTD: Performance Logging"
---

Um herauszufinden, ob es in DragonTD aktuell Performance-Probleme gibt, habe ich dafür das Logging erweitert. Es werden die wichtigsten Performance-Metriken während eines Spieldurchlaufs zusammen mit den bereits vorhandenen Playthrough-Daten geloggt.

<!--more-->

## Vorgaben an das Rendering

Das Spiel hat rendertechnisch grundlegend die Vorgaben: 60 FPS zu erreichen, die Größe des verfügbaren Browserfensters zu nutzen, Fullscreen optional anzubieten für die Browserversion und immer im Format 16:9 zu sein.  
Für die Performance ist davon vor allem zunächst die Zielgröße von 60 FPS der wichtigste Parameter. Daher darf jeder Frame nicht länger als 16,67 ms dauern.

## Metriken für die Performance

Für jeden Messzeitraum werden die Performance-Daten in mehrere Bereiche aufgeteilt. Der wichtigste Einstieg ist `framePacing`, weil dieser Bereich beschreibt, was Spielerinnen und Spieler tatsächlich als Framerate wahrnehmen.

Dabei werden nicht nur Durchschnittswerte gespeichert, sondern konkrete Grenzwerte gezählt:
- `framesBelow60Fps` / `framesBelow30Fps` / `framesBelow20Fps`: Frames, die zu lange gedauert haben um die FPS zu erreichen

Für die Ursachenanalyse gibt es zusätzlich den Bereich `timing`:
- `simulation`: Zeit für die reine Spielsimulation, also die deterministische Spiellogik
- `cpu`: gemessene CPU-Zeit des eigenen Frame-Updates
- `outsideMeasuredCpu`: Differenz aus Frame-Zeit und gemessener eigener CPU-Zeit

Diese Timing-Bereiche speichern jeweils:
- `avgMs`: durchschnittliche Dauer
- `p95Ms` / `p99Ms`: Wert, unter dem 95 % / 99 % der Messungen liegen
- `maxMs`: langsamste gemessene Dauer

Für die erste Einschätzung sind die gezählten FPS-Grenzwerte praktischer als nur `p95Ms` oder `p99Ms`, weil direkt sichtbar wird, wie oft ein relevantes FPS-Budget verfehlt wurde. Die Perzentile helfen danach eher dabei, die Verteilung der gemessenen Zeiten einzuordnen für die Ursachenfindung.

Wichtig ist dabei: `outsideMeasuredCpu` ist keine echte Rendering-Metrik. Der Wert ist eine Diagnose-Heuristik und kann Rendering, Browser-Compositing, GPU-Wartezeit, Garbage Collection, Scheduling oder andere Arbeit außerhalb der gemessenen eigenen CPU-Zeit enthalten.

Zusätzlich gibt es `simulationCadence`. Dieser Bereich beschreibt nicht, wie teuer die Simulation in Millisekunden ist, sondern wie der Fixed-Timestep-Loop mit der Frame-Rate Schritt hält:
- `maxTicksPerFrame`: Wie viele Simulation-Ticks im schlimmsten Frame verarbeitet wurden
- `accumulatorClampFrames`: Wie oft der angesammelte Simulationsrückstand gekappt wurde
- `byFrameMode`: Aufteilung nach `paused`, `speed1` und `speed3`

Gerade die Aufteilung nach `byFrameMode` ist wichtig, weil Pause und dreifache Geschwindigkeit die Anzahl der Simulation-Ticks pro Frame stark beeinflussen. Ein Durchschnittswert ohne diese Aufteilung wäre schwer zu interpretieren.

## Unterteilung in Spielbereiche und -phasen

Die Metriken werden für den gesamten Run gesammelt als `metrics` gespeichert und zusätzlich pro Abschnitt in `segments[]`. Ein Segment entspricht dabei einer Kombination aus Map und Wave.

Das ist wichtig, weil verschiedene Spielphasen sehr unterschiedlich teuer sein können. 
Zum Beispiel kann die Performance grundsätzlich gut sein, aber immer dann einbrechen, wenn ein bestimmter Tower mit einem bestimmten Effekt gebaut wird. Oder sie ist nur in einer bestimmten Welle schlecht, weil es dort einen Gegner mit einem bestimmten Effekt gibt.

Welche Tower gebaut werden, habe ich bereits in den Playthrough-Daten geloggt.  
Welche Wellen und Gegner es gibt und welche Effekte Tower und Gegner haben, ist in den Mod-Daten vorhanden.  
Mit den Segment-Metriken kann ich diese Daten nun direkt mit der Performance einer konkreten Map/Wave verbinden.

Als weiterer Kontext wird unter `load` gespeichert, wie viele Türme, Gegner und Projektile im Durchschnitt und maximal aktiv waren. Das hilft einzuschätzen, ob ein Performance-Problem mit hoher Spiellast zusammenhängt oder bereits bei wenig Inhalt auftritt.

## Gerätekontext

Performance-Daten sind ohne Gerätekontext nur begrenzt vergleichbar. Deshalb enthält der Payload zusätzlich `device`.

Darin werden unter anderem gespeichert:
- `controlProfile`: Desktop- oder Mobile-Steuerprofil
- `platformClass`: Desktop, Android, iOS oder unbekannt
- `graphicsQualityMode`: aktuell gewählter Grafikmodus
- `viewportWidth` und `viewportHeight`
- `devicePixelRatio`
- `hardwareConcurrency`

Damit kann ich später unterscheiden, ob ein Problem allgemein im Spiel liegt oder eher an bestimmten Geräten, Bildschirmgrößen, Mobile/Desktop-Profilen oder Grafikmodi hängt.

## Ergebnis

Und genau das ist nun das Performance-Logging:  
Strukturierte Performance-Daten für den gesamten Run und für jede Map/Wave. Die Daten zeigen zuerst, ob ein Playthrough überhaupt auffällig ist, und anschließend, welche Spielphase genauer untersucht werden sollte.

Für die erste Bewertung sind vor allem `framePacing` und `simulationCadence` hilfreich. Danach zeigen `timing`, `load`, die Segmentdaten und der `device`-Kontext, ob das Problem eher in der Simulation, im eigenen Frame-Update, in einer bestimmten Welle oder außerhalb der gemessenen eigenen CPU-Zeit liegt.

Dazu gibt es auch ein kleines, schickes UI, das mir alle Spieldurchläufe auflistet und alle notwendigen Daten zur Analyse in die Zwischenablage kopiert, um anschließend zusammen mit Codex eine Analyse durchzuführen:

![DragonTD Analytics](/assets/2026-04-21-dragontd-performance-logging/images/dragontd-analytics.png)

Link zum Spiel: [DragonTD (https://dragontd.de)](https://dragontd.de)
