Das neue Performance Logging hat nämlich gezeigt, dass es Performance Probleme auf sehr schwachen Geräten gibt. 
Die Hauptursache war sehr einfach zu finden: Das Spiel rendert bisher immer in nativer 4k Auflösung, unabhängig davon wie groß es dargestellt wird. 

Die Behebung des Problems gestaltet sich aber als schwierig, erster Ansatz war einfach das Ändern der Renderauflösung. Aber dadurch wurden alle Elemente kreuz und quer verschoben oder ihre Größe hat sich geändert. 
Bisher hat sich nämlich Codex um die Positionierung gekümmert und da ich dazu keine Vorgaben gemacht hatte, hat er das mal mit komplett hardgecodeten Pixelwerten, mal im Bezug zu anderen Elementen, mal mit festen Containern für die Größe, mal abhängig von der Grafikgröße der Bildatei mit sehr vielen Hardgecodeten Konstanten und so weiter gemacht. 
Ergebnis davon wie schrecklich das dann wurde siehe Screenshot bzw. kann hier auch Live angeschaut werden: 
https://branches.dragontd.de/feature-refactor-world-size/.

Zweiter Anlauf war eine andere Phaser Skalierungstechnik und wesentlich erfolgreicher, die Performance wurde deutlich besser und da es immer noch ein internes 4k Koordinatensystem gab, haben sich nur ein paar Elemente verschoben bei denen direkt die Grafikgröße der Bilddatei verwendet wurde (z.B. das Logo in der Start Scene).
Allerdings hat es auch dazu geführt, dass Grafiken und Text sehr verwaschen und pixelig wurden durch die niedrige Auflösung des Renderings und Hochskalierung auf den Viewport per Zoom. 
Deswegen habe ich dann ein mal versucht Text und wichtigsten grafischen Elemente aus Phaser rauszuziehen und per DOM Layer zu rendern. Da der DOM Layer aber über dem Phaser Bereich liegt und ich auch modale Fenster habe, müssen all diese Elemente ausgeblendet werden, wenn sich ein solches Fenster öffnet (sieht man sehr gut, wenn man in der Spielscene mal die Settings öffnet, siehe Screenshot). Das finde ich unschön und außerdem würde der Ansatz darauf hinauslaufen, dass ich das komplette Spiel in HTML nachbaue bis auf die Elemente wofür ich wirklich Phaser brauche. 
Aber nichts desto trotz ein interessanter Ansatz und kann ebenfalls Live angeschaut werden: 
https://branches.dragontd.de/feature-refactor-rendering/.