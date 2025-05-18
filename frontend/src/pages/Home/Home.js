import React from "react";
import { Button } from "primereact/button";
import {Stepper} from "primereact/stepper";
import {StepperPanel} from "primereact/stepperpanel";

export default function LandingPage() {
    const stepperRef = React.useRef(null);
    return (
        <div className="text-gray-900">
            {/* Hero Section */}
            <section className="flex flex-column align-items-center justify-content-center min-h-screen text-center p-4">
                <div className="text-center">
                    <img src="/logo.png" className="xl:max-w-30rem" alt={"Memory Hunt"} />
                    <p className="text-xl text-gray-600 mb-4">
                        Erstelle lustige Foto-Challenges für Hochzeiten oder andere Events. Halte die besten Momente gemeinsam fest.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="flex flex-column md:flex-row min-h-screen p-4 gap-4 justify-content-center align-items-center bg-primary-50">

                <div className="surface-card shadow-2 border-round p-6 w-full md:w-5 text-center">
                    <h2 className="text-2xl font-semibold mb-3">Design Your Challenge</h2>
                    <p className="mb-4 text-gray-600">Anpassbares Design, Texte, Challenges und vieles mehr.</p>
                    <img
                        src="/product-1.png"
                        alt="Editor Screenshot"
                        className="border-round shadow-2 w-full max-h-96 object-contain"
                    />
                </div>

                <div className="surface-card shadow-2 border-round p-6 w-full md:w-5 text-center">
                    <h2 className="text-2xl font-semibold mb-3">Upload & Share</h2>
                    <p className="mb-4 text-gray-600">Gäste laden ihre Fotos hoch und sie sind sofort für alle in einer Gallerie sichtbar.</p>
                    <img
                        src="/product-2.png"
                        alt="Upload Screenshot"
                        className="border-round shadow-2 w-full max-h-96 object-contain"
                    />
                </div>

            </section>

            <section className="flex flex-column align-items-center justify-content-center text-center min-h-screen p-4">
                <div>
                    <h2 className="text-3xl font-bold mb-3">Get Started</h2>
                    <p className="text-gray-600 mb-4">
                        Entscheide dich, wie du Memory Hunt nutzen möchtest. Du kannst es entweder selbst hosten oder wir hosten es für dich.
                    </p>
                    <div className="flex flex-column md:flex-row justify-content-center gap-4">
                        <div className="bg-yellow-100 border-round p-4 w-full md:w-5">
                            <h3 className="text-xl font-semibold mb-2">Sehr gerne Hosten wir für dich</h3>
                            <p className="mb-3">In nur 6 Schritten zu deinen Memory Hunt Erinnerungen</p>
                            <p className="mb-3">
                                "Buy Me a Coffee" und wir melden uns innerhalb von 3 Werktagen bei dir bezüglich deiner Anfrage
                            </p>
                            <a
                                href="#we-host-for-you"
                            >
                                <Button label="siehe 6 Schritte Details" className="p-button-warning p-button-outlined m-1" />
                            </a>
                            <a
                                href="https://buymeacoffee.com/floriandula"
                                target="_blank"
                                rel="noopener noreferrer"
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
                            >
                                <Button label="Gehe zu GitHub" className="p-button-outlined" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-column align-items-center justify-content-center text-center min-h-screen p-4" id={"we-host-for-you"}>
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Sehr gerne hosten wir für dich</h2>
                    <p className="mb-3">In nur 6 Schritten zu deinen Memory Hunt Erinnerungen</p>
                    <Stepper ref={stepperRef} orientation="vertical" >
                        <StepperPanel header="Zusammen gestalten wir die schönsten Momente deines Events!">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Schön, dass du zu uns gefunden hast!</p>
                                <p className="text-gray-600">"Buy Me a Coffee" und wir melden uns innerhalb von 3 Werktagen bei dir</p>
                                <a
                                    href="https://buymeacoffee.com/floriandula"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button label="Buy Me a Coffee" className="p-button-warning" />
                                </a>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-column">
                                <div />
                                <Button label="Weiter" className={"align-items-end"} icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Erstes Kennenlernen">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Lass uns gemeinsam in einem Online-Meeting über deine Wünsche und Ideen sprechen</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Weiter" className={"flex-grow-1"} icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Erster Eindruck">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Innerhalb weniger Tage lassen wir dir per link den ersten Entwurf zukommen.</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Weiter" className={"flex-grow-1"} icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Ab in die Zielgerade">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Gemeinsam bearbeiten wir die letzten Details und runden die ganze Sache ab.</p>
                                <p className="text-gray-600">Via E-Mail oder in einem Online-Meeting - wir nehmen auch hier Rücksicht auf eure Wünsche.</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Weiter" className={"flex-grow-1"} icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="EUER MEMORY HUNT EVENT">
                            <div className="flex flex-column text-center border-round-2xl p-4 bg-primary-50">
                                <p className="text-gray-600">Es ist vollbracht!</p>
                                <p className="text-gray-600">Ihr seid bereit für euer Event. Sammelt Schnappschüsse und Erinnerungen von euch und euren Liebsten. Get the party started!</p>
                            </div>
                            <div className="flex py-4 flex-grow-1 flex-row">
                                <Button label="Zurück" className={"flex-grow-1"} severity="secondary" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Weiter" className={"flex-grow-1"} icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
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
            {/* Hosting Options */}


            {/* Footer */}
            <footer className="text-center text-sm text-gray-500 py-4">
                &copy; {new Date().getFullYear()} Memory Hunt — Built with ❤️
            </footer>
        </div>
    );
}
