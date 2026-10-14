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

const LandingPageFotoChallengeSection = () => (
    <section id="fotoaufgaben" className="section">
        <div className="container center">
            <span className="eyebrow">Inspiration</span>
            <h2>Ideen für eure Fotoaufgaben</h2>
            <p className="lead">Noch unsicher, welche Aufgaben eure Gäste fotografieren sollen? Hier ein paar kreative Vorschläge für euer Memory Hunt Spiel:</p>
            <div className="ideas">
                {challenges.map((task) => <span className="chip" key={task}>📸 {task}</span>)}
            </div>
            <p style={{marginTop: 36}}>
                <a href="#we-host-for-you" className="btn btn-primary">Jetzt dein eigenes Spiel starten</a>
            </p>
        </div>
    </section>
);

export default LandingPageFotoChallengeSection;
