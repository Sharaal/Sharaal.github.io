---
layout: "post"
language: "de"
title: "Daily AI News GitHub Action With Langdock API"
assets:
    tts: "assets/2025-06-14-daily-ai-news-github-action-with-langdock-api/tts.mp3"
---

Ich wollte etwas Produktives mit der Langdock-API in einem GitHub-Action-Workflow machen. Da ich mich für Neuigkeiten rund um KI interessiere, habe ich beides einfach verbunden, um KI-generierte Artikel für meinen Blog erstellen zu lassen.

<!--more-->

Anfangs habe ich einen Assistenten in Langdock erstellt, der für einen bestimmten Zeitraum (z.B. heute) und ein Thema die aktuellen News zusammensucht. Dieser war in einer GitHub Action eingebunden, die die Ausgabe dann direkt als neuen Artikel veröffentlicht hat. Das Prompt des Assistenten habe ich mir ebenfalls von der KI generieren lassen. Es war sehr umfangreich und vielversprechend.
Die daraus entstandenen News-Artikel waren aber dennoch relativ schlecht. Zum einen waren die Themen nicht nur von heute, haben sich also über mehrere Tage wiederholt, und zum anderen war der gemischte Artikel über mehrere Themen nicht sehr ausführlich.

Also habe ich den Workflow wie folgt geändert:
* Es werden alle Titel der bereits existierenden Posts und Drafts eingelesen.
* Es wird ein Request an die Langdock-API geschickt, der nur die Titel der drei wichtigsten heutigen Neuigkeiten zurückgibt und im Prompt auch alle existierenden Titel samt der Anweisung, diese zu ignorieren, mitgibt.
* Für jeden dieser Titel wird ein eigener Request geschickt, um einen umfassenden News-Artikel zu schreiben und die Quellenangaben am Ende hinzuzufügen.
* Statt diese direkt als Posts zu veröffentlichen, werden sie als Drafts gespeichert.
* Das Überprüfen, Bereinigen und Veröffentlichen (durch das Verschieben aus dem _drafts- ins _posts-Verzeichnis) wird dann von Hand gemacht.

Dabei gab es auch einige neue Herausforderungen:
* Da ich die Websuche für aktuelle News benötige, funktioniert die Chat-API nicht und es muss ein temporärer Assistent verwendet werden.
* Da die Ausgabe immer KI-generierter Text ist, ist es nicht möglich, wirklich strukturierte Daten (wie ein valides JSON-Objekt) zurückzubekommen. Man kann dem Prompt zwar mitgeben, "gib mir ein valides JSON-Objekt zurück", aber die KI hat in der Ausgabe dann dennoch Einleitungstext oder Backtick-Blöcke hinzugefügt.
* Dadurch musste die Ausgabe umfangreicher geparst werden. Also habe ich kein JSON zurückgeben lassen, sondern eine Liste der Titel, bei der jeder Titel mit "- " startet.
* Dieses Verhalten ist ebenfalls bei den Artikeln wiederzufinden, wo die KI einleitende oder abschließende Worte hinzufügt, die manuell entfernt werden müssen.

Die fehlende Möglichkeit, strukturierte JSON-Objekte zurückgeben zu lassen, ist schade für eine API. Dennoch sind der Workflow und die daraus resultierenden Artikel nun deutlich sinnvoller, und der manuelle Schritt des Reviews und der Veröffentlichung fügt dem Ganzen noch ein "Quality Gate" hinzu.
