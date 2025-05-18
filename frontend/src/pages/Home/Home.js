import React from "react";
import { Button } from "primereact/button";
import {Stepper} from "primereact/stepper";
import {StepperPanel} from "primereact/stepperpanel";
import {FAQSection} from "../../components/Faq";
import LandingPageFotoChallengeSection from "../../components/LandingPageFotoChallengeSection";
import ReactGA from "react-ga4";

export default function LandingPage() {
    ReactGA.initialize("G-X19LP2QSQD");

    const trackButtonClick = (event) => {
        ReactGA.event({
            category: 'Button',
            action: 'Click',
            label: event.currentTarget.innerText,
        });
    }

    const stepperRef = React.useRef(null);

    return (
        <div className="text-gray-900">
            {/* Hero Section */}
            <section
                className="flex flex-column align-items-center justify-content-center min-h-screen text-center p-4"
                style={{
                    backgroundImage: "url('lp_bg.JPG')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-primary-50 p-4 border-round-2xl m-4" >
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Eure Gäste. Eure Erinnerungen. <br /> Ein unvergessliches Spiel.
                        </h1>
                        <p className="text-xl text-gray-600 mb-4">
                            Mit <strong>Memory Hunt</strong> wird eure Hochzeit zur <br />
                            interaktiven Foto-Challenge – ganz ohne App.
                        </p>
                        <a href="#we-host-for-you" onClick={trackButtonClick}
                           className="m-1 no-underline p-button p-button-rounded p-button-lg p-button-primary">
                            Jetzt starten ab 5€
                        </a>
                        <a href="#howitworks" onClick={trackButtonClick}
                           className="m-1 no-underline p-button p-button-rounded p-button-lg p-button-outlined border-primary-500">
                            So funktioniert’s
                        </a>
                    </div>
                </div>
            </section>

            <section className="flex flex-column align-items-center justify-content-center min-h-screen text-center p-4">
                <div className="text-center">
                    <img src="/logo.png" className="xl:max-w-30rem" alt={"Memory Hunt"} />
                    <h1>
                        Das kreative Fotospiel für Hochzeiten
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                        Erstelle persönliche Fotoaufgaben für eure Gäste und sammelt unvergessliche Erinnerungen. <br /> Ohne App-Installation, einfach und sofort loslegen.
                    </p>
                </div>
            </section>

            <section id={"howitworks"} className="flex flex-column md:flex-row min-h-screen p-4 gap-4 justify-content-center align-items-center bg-primary-50">

                <div className="surface-card shadow-2 border-round p-6 w-full md:w-5 text-center">
                    <h2 className="text-2xl font-semibold mb-3">Design Your Challenge</h2>
                    <p className="mb-4 text-gray-600">Erstelle dein eigenes Fotospiel mit individuellen Fotoaufgaben – perfekt für Hochzeiten, Geburtstage oder Junggesellenabschiede.</p>
                    <img
                        src="/product-1.png"
                        alt="Memory Hunt – Fotoaufgaben Hochzeit Beispiel"
                        className="border-round shadow-2 w-full max-h-96 object-contain"
                    />
                </div>

                <div className="surface-card shadow-2 border-round p-6 w-full md:w-5 text-center">
                    <h2 className="text-2xl font-semibold mb-3">Upload & Share</h2>
                    <p className="mb-4 text-gray-600">Gäste fotografieren eure schönsten Momente anhand der Aufgaben und laden sie direkt hoch – alle Bilder landen in eurer persönlichen Online-Galerie.</p>
                    <img
                        src="/product-2.png"
                        alt="Memory Hunt – Hochzeitsfotos Challenge Galerie"
                        className="border-round shadow-2 w-full max-h-96 object-contain"
                    />
                </div>

            </section>

            <section className="flex flex-column bg-primary-100 align-items-center justify-content-center text-center min-h-screen p-4">
                <div>
                    <h2 className="text-3xl font-bold mb-3">Memory Hunt Hosting – Fotospiel für deine Hochzeit selbst hosten oder betreuen lassen</h2>
                    <p className="text-gray-600 mb-4">
                        Entscheide dich, wie du Memory Hunt nutzen möchtest. Du kannst es entweder selbst hosten oder wir hosten es für dich.
                    </p>
                    <ul className="list-none">
                        <li>
                            ✔️ kein Account für dich und deine Gäste notwendig
                        </li>
                        <li>
                            ✔️ Schon ab 5€ – bezahle einfach via "Buy Me a Coffee"
                        </li>
                        <li>
                            ✔️ Alternativ: kostenlos selbst hosten
                        </li>
                    </ul>
                    <div className="flex flex-column md:flex-row justify-content-center gap-4">
                        <div className="bg-yellow-100 border-round p-4 w-full md:w-5">
                            <h3 className="text-xl font-semibold mb-2">Sehr gerne Hosten wir für dich</h3>
                            <p className="mb-3">In nur 6 Schritten zu deinen Memory Hunt Erinnerungen</p>
                            <p className="mb-3">
                                Du zahlst nur, was dir Memory Hunt wert ist – schon ab 5 € geht's los! Keine versteckten Kosten
                            </p>
                            <a
                                href="#we-host-for-you"
                                onClick={trackButtonClick}
                            >
                                <Button label="siehe 6 Schritte Details" className="p-button-warning p-button-outlined m-1" />
                            </a>
                            <a
                                href="https://buymeacoffee.com/floriandula"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={trackButtonClick}
                            >
                                <Button label="Buy Me a Coffee" className="p-button-warning m-1" />
                            </a>

                        </div>

                        <div className="bg-blue-100 border-round p-4 w-full md:w-5">
                            <h3 className="text-xl font-semibold mb-2">Selbst hosten</h3>
                            <p className="mb-3">Du bevorzugst es selber zu machen? Hol dir den vollen Zugang und leg los!</p>
                            <p className="mb-3">Siehe auf GitHub für Details</p>
                            <a
                                href="https://github.com/floriandulzky/memorysnap"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={trackButtonClick}
                            >
                                <Button label="Gehe zu GitHub" className="p-button-outlined" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-column align-items-center justify-content-center text-center min-h-screen p-4" id={"we-host-for-you"}>
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Jetzt loslegen!</h2>
                    <p className="mb-3">In nur 6 Schritten zu deinen Memory Hunt Erinnerungen</p>
                    <Stepper ref={stepperRef} orientation="vertical" >
                        <StepperPanel header="Zusammen gestalten wir die schönsten Momente deines Events!">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Schön, dass du zu uns gefunden hast!</p>
                                <p className="text-gray-600">"Buy Me a Coffee" und wir melden uns innerhalb von 3 Werktagen bei dir</p>
                                <p className="text-gray-600">Oder sende uns eine email an <a href={"mailto:florian.dulzky@gmail.com"} className={"text-primary"}>florian.dulzky@gmail.com</a></p>
                                <p className="text-gray-600">Wir freuen uns auf deine Ideen und Wünsche!</p>
                                <a
                                    href="https://buymeacoffee.com/floriandula"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={trackButtonClick}
                                >
                                    <Button label="Jetzt starten ab 5€" className="p-button-warning" />
                                </a>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-column">
                                <div />
                                <Button label="Weiter"
                                        className={"align-items-end"} icon="pi pi-arrow-right" iconPos="right"
                                        onClick={(event) => {
                                            stepperRef.current.nextCallback();
                                            trackButtonClick(event)
                                        } } />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Erstes Kennenlernen">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Lass uns gemeinsam in einem Online-Meeting über deine Wünsche und Ideen sprechen</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Weiter"
                                        className={"align-items-end"} icon="pi pi-arrow-right" iconPos="right"
                                        onClick={(event) => {
                                            stepperRef.current.nextCallback();
                                            trackButtonClick(event)
                                        } } />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Erster Eindruck">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Innerhalb weniger Tage lassen wir dir per link den ersten Entwurf zukommen.</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Weiter"
                                        className={"align-items-end"} icon="pi pi-arrow-right" iconPos="right"
                                        onClick={(event) => {
                                            stepperRef.current.nextCallback();
                                            trackButtonClick(event)
                                        } } />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Ab in die Zielgerade">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Gemeinsam bearbeiten wir die letzten Details und runden die ganze Sache ab.</p>
                                <p className="text-gray-600">Via E-Mail oder in einem Online-Meeting - wir nehmen auch hier Rücksicht auf eure Wünsche.</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Weiter"
                                        className={"align-items-end"} icon="pi pi-arrow-right" iconPos="right"
                                        onClick={(event) => {
                                            stepperRef.current.nextCallback();
                                            trackButtonClick(event)
                                        } } />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="EUER MEMORY HUNT EVENT">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Es ist vollbracht!</p>
                                <p className="text-gray-600">Ihr seid bereit für euer Event. Sammelt Schnappschüsse und Erinnerungen von euch und euren Liebsten. Get the party started!</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Weiter"
                                        className={"align-items-end"} icon="pi pi-arrow-right" iconPos="right"
                                        onClick={(event) => {
                                            stepperRef.current.nextCallback();
                                            trackButtonClick(event)
                                        } } />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Eure Erinnerungen">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Nach eurem Event bekommt ihr alle eure Erinnerungsfotos in original Qualität von uns zugeschickt</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                            </div>
                        </StepperPanel>
                    </Stepper>
                </div>
            </section>

            <FAQSection />

            <LandingPageFotoChallengeSection />

            <footer className="text-center text-sm text-gray-500 py-4">
                &copy; {new Date().getFullYear()} Memory Hunt — Built with ❤️
            </footer>
        </div>
    );
}
