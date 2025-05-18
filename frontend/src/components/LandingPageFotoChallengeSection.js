import { DataView } from 'primereact/dataview';

const challenges = [
    "Ein Selfie mit dem Brautpaar",
    "Jemand, der beim Tanzen völlig ausrastet",
    "Die schönste Tischdeko",
    "Ein Gruppenfoto mit mindestens 5 Gästen",
    "Ein emotionaler Moment",
    "Die kreativste Frisur",
    "Jemand mit Tränen in den Augen (vor Rührung!)",
    "Ein Schnappschuss von Kindern beim Spielen",
    "Ein romantisches Detail",
    "Das leckerste Essen des Abends"
];

const LandingPageFotoChallengeSection = () => {
    const itemTemplate = (task) => (
        <div className="p-4 border rounded-xl shadow-sm bg-white text-gray-800">
            📸 {task}
        </div>
    );

    return (
        <section id="fotoaufgaben" className="flex flex-column align-items-center justify-content-center text-center p-4">
            <h2 className="text-3xl font-bold mb-6">Ideen für eure Fotoaufgaben</h2>
            <p className="text-lg text-gray-700 mb-10">
                Noch unsicher, welche Aufgaben eure Gäste fotografieren sollen? Hier ein paar kreative Vorschläge für euer Memory Hunt Spiel:
            </p>
            <DataView
                value={challenges}
                layout="grid"
                itemTemplate={itemTemplate}
                rows={10}
                paginator={false}
                className="text-left"
            />
            <div className="mt-5">
                <a href="#we-host-for-you" className="no-underline inline-block bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary-dark transition">
                    Jetzt dein eigenes Spiel starten
                </a>
            </div>
        </section>
    );
};

export default LandingPageFotoChallengeSection;
