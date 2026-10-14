import { Accordion, AccordionTab } from "primereact/accordion";

export function FAQSection() {
    return (
        <section className="section section-alt faq">
            <div className="container" style={{maxWidth: 760}}>
                <span className="eyebrow">FAQ</span>
                <h2>Häufige Fragen</h2>
                <Accordion multiple>
                    <AccordionTab header="Was ist Memory Hunt genau?">
                        <p>
                            Memory Hunt ist ein digitales Foto-Spiel für Hochzeiten und andere Events. Gäste erhalten kleine Foto-Aufgaben und laden ihre Bilder direkt hoch – für einzigartige Erinnerungen.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Wie viel kostet Memory Hunt?">
                        <p>
                            Das Hosting durch uns erfolgt auf Spendenbasis via „Buy Me a Coffee“ ☕. Wer lieber selbst hostet, kann Memory Hunt kostenlos über GitHub beziehen.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Brauchen meine Gäste eine App?">
                        <p>
                            Nein! Memory Hunt funktioniert vollständig im Browser – ganz ohne App-Installation. Einfach Link öffnen, Aufgabe ansehen, Foto hochladen – fertig.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Wie lange bleiben die Fotos online?">
                        <p>
                            Die Galerie bleibt ein paar Tage online.
                            Auf Wunsch können wir sie auch früher löschen oder länger verfügbar machen.
                            Wir besprechen das gerne mit euch.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Was passiert nach dem Event?">
                        <p>
                            Ihr bekommt einen Link zu allen Originalbildern in voller Qualität – perfekt für eure Dankeskarten oder Fotoalben.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Kann ich auch eigene Aufgaben definieren?">
                        <p>
                            Ja, du kannst Texte, Farben und Aufgaben frei gestalten – wir helfen dir beim Setup!
                        </p>
                    </AccordionTab>
                </Accordion>
            </div>
        </section>
    );
}
