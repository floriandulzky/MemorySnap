import { Accordion, AccordionTab } from "primereact/accordion";

export function FAQSection() {
    return (
        <section className="min-h-screen bg-primary-50 p-4 flex flex-column justify-content-center align-items-center text-center">
            <div className="w-full md:w-8 lg:w-6">
                <h2 className="text-3xl font-bold mb-4">Häufige Fragen (FAQ)</h2>
                <Accordion multiple>
                    <AccordionTab header="Was ist Memory Hunt genau?">
                        <p className="text-gray-600">
                            Memory Hunt ist ein digitales Foto-Spiel für Hochzeiten und andere Events. Gäste erhalten kleine Foto-Aufgaben und laden ihre Bilder direkt hoch – für einzigartige Erinnerungen.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Wie viel kostet Memory Hunt?">
                        <p className="text-gray-600">
                            Das Hosting durch uns erfolgt auf Spendenbasis via „Buy Me a Coffee“ ☕. Wer lieber selbst hostet, kann Memory Hunt kostenlos über GitHub beziehen.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Brauchen meine Gäste eine App?">
                        <p className="text-gray-600">
                            Nein! Memory Hunt funktioniert vollständig im Browser – ganz ohne App-Installation. Einfach Link öffnen, Aufgabe ansehen, Foto hochladen – fertig.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Wie lange bleiben die Fotos online?">
                        <p className="text-gray-600">
                            Die Galerie bleibt ein paar Tage online.
                            Auf Wunsch können wir sie auch früher löschen oder länger verfügbar machen.
                            Wir besprechen das gerne mit euch.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Was passiert nach dem Event?">
                        <p className="text-gray-600">
                            Ihr bekommt einen Link zu allen Originalbildern in voller Qualität – perfekt für eure Dankeskarten oder Fotoalben.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Kann ich auch eigene Aufgaben definieren?">
                        <p className="text-gray-600">
                            Ja, du kannst Texte, Farben und Aufgaben frei gestalten – wir helfen dir beim Setup!
                        </p>
                    </AccordionTab>
                </Accordion>
            </div>
        </section>
    );
}
