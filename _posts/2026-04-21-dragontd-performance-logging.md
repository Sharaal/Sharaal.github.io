---
layout: "post"
title: "DragonTD: Performance Logging"
---

Um herauszufinden, ob es in DragonTD aktuell Performance-Probleme gibt, habe ich dafür das Logging erweitert. Es werden die wichtigsten Performance-Metriken während eines Spieldurchlaufs zusammen mit den bereits vorhandenen Playthrough-Daten geloggt.

<!--more -->

Link zum Spiel: [DragonTD (https://dragontd.de)](https://dragontd.de)

## Vorgaben an das Rendering

Das Spiel hat rendertechnisch grundlegend die Vorgaben: 60 FPS zu erreichen, die Größe des verfügbaren Browserfensters zu nutzen, Fullscreen optional anzubieten für die Browserversion und immer im Format 16:9 zu sein.  
Für die Performance ist davon vor allem zunächst die Zielgröße von 60 FPS der wichtigste Parameter. Daher darf jeder Frame nicht länger als 16,67 ms dauern.

## Metriken für die Performance

Es gibt grundlegend folgende Metriken für jeden Spieldurchlauf:
- `frames`: Wie viele Frames wurden berechnet
- `avgMs`: Wie lange hat ein Frame im Durchschnitt gedauert
- `p95Ms` / `p99Ms`: Wie lange haben die schnellsten 95 % / 99 % der Frames jeweils im Durchschnitt gedauert
- `maxMs`: Wie lange hat der langsamste Frame gedauert

Diese Metriken sind zusammengenommen zunächst nur nützlich für die Entscheidung, wie gut die Performance ist.  
Wenn diese nicht gut ist, braucht es eine Aufteilung der Metriken auf verschiedene Bereiche und Zeitpunkte, um herauszufinden, wo das Problem liegen könnte.

## Unterteilung in Spielbereiche und -phasen

Denn jeder Frame wird in zwei Bereiche unterteilt:
- Die Simulation berechnet alle Parameter der Spiellogik
- Das Rendering kümmert sich um die Anzeige

Daher werden alle Metriken zweimal erhoben, jeweils unterteilt in Simulation und Rendering.

Des Weiteren gibt es verschiedene Spielphasen, nämlich die verschiedenen Maps und Waves, die großen Einfluss auf die Performance haben können. 
Zum Beispiel kann die Performance grundsätzlich gut sein, aber immer dann einbrechen, wenn ein bestimmter Tower mit einem bestimmten Effekt gebaut wird. Oder sie ist nur in einer bestimmten Welle schlecht, weil es dort einen Gegner mit einem bestimmten Effekt gibt.
Welche Tower gebaut werden, habe ich bereits in den Playthrough-Daten geloggt.  
Welche Wellen und Gegner es gibt und welche Effekte Tower und Gegner haben, ist in den Mod-Daten vorhanden.  
Was also noch fehlt, sind die Metriken, aufgesplittet nach den verschiedenen Maps und Waves.

## Ergebnis

Und genau das ist nun das Performance-Logging:  
Fünf Metriken, jeweils für Simulation und Rendering, für den gesamten Durchlauf sowie unterteilt nach jeder Map und Wave.

Dazu gibt es auch ein kleines, schickes UI, das mir alle Spieldurchläufe auflistet und alle notwendigen Daten zur Analyse in die Zwischenablage kopiert, um anschließend zusammen mit Codex eine Analyse durchzuführen:

![DragonTD Analytics](/assets/2026-04-21-dragontd-performance-logging/images/dragontd-analytics.png)
