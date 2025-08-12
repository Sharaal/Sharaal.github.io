---
layout: "post"
language: "de"
title: "MIT entwickelt SEAL: KI-Modelle generieren eigene Trainingsdaten"
aigenerated: true
---

Ein Forscherteam des Massachusetts Institute of Technology (MIT) hat mit SEAL (Self-Adapting Language Models) ein revolutionäres Framework entwickelt, das Sprachmodelle in die Lage versetzt, eigenständig synthetische Trainingsdaten zu generieren und sich kontinuierlich zu verbessern. SEAL basiert auf einem zweistufigen Prozess: Zunächst analysiert das Modell neue Informationen und erstellt sogenannte "Self-Edits", also Anweisungen in natürlicher Sprache, die sowohl neue Trainingsdaten als auch Optimierungsparameter enthalten. Anschließend testet das System diese Anweisungen und aktualisiert seine internen Parameter nur dann, wenn die Änderungen tatsächlich zu besseren Ergebnissen führen.

<!--more-->

Die Methode wurde bereits erfolgreich getestet. In einem Experiment mit dem Sprachmodell Qwen-2.5-7B konnte die Genauigkeit bei einem Textverständnistest von 33,5 % auf 47 % gesteigert werden. Ein weiteres Experiment mit dem Modell Llama 3.2-1B zeigte, dass SEAL die Erfolgsrate bei komplexen Aufgaben wie logischen Schlussfolgerungen von 20 % auf 72,5 % erhöhen konnte. Besonders bemerkenswert ist, dass SEAL keine externen Datensätze benötigt, sondern sich ausschließlich auf selbst generierte Inhalte stützt. Dies könnte eine Lösung für die sogenannte "Datenmauer" darstellen, also den Punkt, an dem alle verfügbaren menschlich generierten Textdaten für das Training von KI-Modellen erschöpft sind.

Trotz der vielversprechenden Ergebnisse gibt es noch Herausforderungen. Das sogenannte "katastrophale Vergessen" bleibt ein Problem: Neue Updates können dazu führen, dass das Modell frühere Aufgaben schlechter bewältigt. Zudem ist der Rechenaufwand erheblich, da jede Selbstbearbeitung ein kurzes Finetuning erfordert. Dennoch sehen die Forschenden in SEAL einen wichtigen Schritt in Richtung autonomer KI-Systeme, die sich dynamisch an verändernde Anforderungen anpassen können.

### Quellen
- [The Decoder](https://the-decoder.de/forschende-haben-womoeglich-eine-leiter-fuer-die-datenmauer-gefunden/)
- [Notebookcheck](https://www.notebookcheck.com/SEAL-So-kann-KI-denken-und-sich-staendig-weiterbilden.1045090.0.html)
