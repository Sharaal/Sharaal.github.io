Also bin ich erstmal ein Schritt zurückgegangen und habe mir Gedanken um ein Layout System gemacht, sodass die Größe und Positionierung aller Elemente definiert ist und es egal ist in welcher Auflösung gerendert wird bzw. die Auflösung sich dynamisch an der Größe des Viewports anpassen kann.
Ich hatte gelesen es gibt für Phaser fertige Systeme, aber da ich bisher nur sehr wenig abseits von HTML mit UI Design zu tun hatte, wollte ich es selbst von Grund auf selbst verstehen und habe ein eigenes System gebaut.

Daher es gibt nun:
Ein LayoutContext der sämtliche fest definierten Größen und Positionen in einem 4k Reference Koordinatensystem hat. Diese müssen dann skaliert werden auf die Auflösung des Viewports
Layouts die in jeder Scene jedes Element beschreiben in ihrer Größe und Position
Das Rendering selbst ist komplett getrennt davon und nutzt diese Layouts

Das heißt um Elemente zu verschieben oder ihre Größe ändern mache ich nun nicht mehr ein Prompt an Codex mit "Mach den Button größer" sodass alle notwendigen Konstanten angepasst werden. 
Sondern kann es einfach selbst im Layout oder dem LayoutContext sehr einfach anpassen.

Als Spieler bekommt man davon leider wenig mit, außer dass sich Einiges verschoben oder andere Größen hat, da es jetzt wirklich mal definiert ist und nicht nur Pi mal Daumen.