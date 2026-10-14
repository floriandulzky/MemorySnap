import {useEffect} from "react";
import ReactGA from "react-ga4";
import {FAQSection} from "../../components/Faq";
import LandingPageFotoChallengeSection from "../../components/LandingPageFotoChallengeSection";

const COFFEE_URL = "https://buymeacoffee.com/floriandula"

const PROCESS = [
    {
        title: "Zusammen gestalten wir die schönsten Momente deines Events!",
        text: <>
            <p>Schön, dass du zu uns gefunden hast! „Buy Me a Coffee“ und wir melden uns innerhalb von 3 Werktagen bei dir.</p>
            <p>Oder schreib uns eine E-Mail an <a href="mailto:florian.dulzky@gmail.com">florian.dulzky@gmail.com</a> – wir freuen uns auf deine Ideen und Wünsche!</p>
        </>,
    },
    {title: "Erstes Kennenlernen", text: <p>Lass uns gemeinsam in einem Online-Meeting über deine Wünsche und Ideen sprechen.</p>},
    {title: "Erster Eindruck", text: <p>Innerhalb weniger Tage lassen wir dir per Link den ersten Entwurf zukommen.</p>},
    {
        title: "Ab in die Zielgerade",
        text: <p>Gemeinsam bearbeiten wir die letzten Details und runden die ganze Sache ab – per E-Mail oder im Online-Meeting, ganz nach euren Wünschen.</p>,
    },
    {
        title: "Euer Memory Hunt Event",
        text: <p>Es ist vollbracht! Ihr seid bereit für euer Event. Sammelt Schnappschüsse und Erinnerungen von euch und euren Liebsten. Get the party started!</p>,
    },
    {title: "Eure Erinnerungen", text: <p>Nach eurem Event bekommt ihr alle Erinnerungsfotos in Originalqualität von uns zugeschickt.</p>},
]

export default function LandingPage() {
    useEffect(() => {
        ReactGA.initialize("G-X19LP2QSQD")
    }, [])

    const track = (event) => {
        ReactGA.event({category: 'Button', action: 'Click', label: event.currentTarget.innerText})
    }

    return (
        <>
            <section className="hero" style={{backgroundImage: "url(/lp_bg.JPG)"}}>
                <div className="nav">
                    <div className="container">
                        <span className="brand" style={{color: "#fff"}}><i className="pi pi-camera"/> Memory Hunt</span>
                    </div>
                </div>
                <div className="container">
                    <h1>Eure Gäste. Eure Erinnerungen. <em>Ein unvergessliches Spiel.</em></h1>
                    <p>Mit <strong>Memory Hunt</strong> wird eure Hochzeit zur interaktiven Foto-Challenge – ganz ohne App.</p>
                    <div className="hero-actions">
                        <a href="#we-host-for-you" onClick={track} className="btn btn-accent">Jetzt starten ab 5€</a>
                        <a href="#howitworks" onClick={track} className="btn btn-outline-light">So funktioniert’s</a>
                    </div>
                </div>
            </section>

            <section id="howitworks" className="section">
                <div className="container center">
                    <span className="eyebrow">So funktioniert’s</span>
                    <h2>Das kreative Fotospiel für Hochzeiten</h2>
                    <p className="lead">Erstelle persönliche Fotoaufgaben für eure Gäste und sammelt unvergessliche Erinnerungen. Ohne App-Installation, einfach und sofort loslegen.</p>
                    <div className="steps3">
                        <div className="showcase">
                            <span className="num">01</span>
                            <h3>Design Your Challenge</h3>
                            <p>Erstelle dein eigenes Fotospiel mit individuellen Fotoaufgaben – perfekt für Hochzeiten, Geburtstage oder Junggesellenabschiede.</p>
                            <img src="/product-1.png" alt="Memory Hunt – Fotoaufgaben Hochzeit Beispiel" loading="lazy"/>
                        </div>
                        <div className="showcase">
                            <span className="num">02</span>
                            <h3>Upload &amp; Share</h3>
                            <p>Gäste fotografieren eure schönsten Momente anhand der Aufgaben und laden sie direkt hoch – alle Bilder landen in eurer persönlichen Online-Galerie.</p>
                            <img src="/product-2.png" alt="Memory Hunt – Hochzeitsfotos Challenge Galerie" loading="lazy"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-dark">
                <div className="container">
                    <span className="eyebrow" style={{color: "#f0c9b8"}}>Hosting</span>
                    <h2>Wir hosten für dich – oder du selbst</h2>
                    <p style={{color: "rgba(244,239,227,.8)", maxWidth: "40rem"}}>Entscheide dich, wie du Memory Hunt nutzen möchtest.</p>
                    <ul className="checks">
                        <li>Kein Account für dich und deine Gäste notwendig</li>
                        <li>Schon ab 5€ – bezahle einfach via „Buy Me a Coffee“</li>
                        <li>Alternativ: kostenlos selbst hosten</li>
                    </ul>
                    <div className="plans">
                        <div className="plan featured">
                            <h3>Sehr gerne hosten wir für dich</h3>
                            <p>In nur 6 Schritten zu deinen Memory Hunt Erinnerungen. Du zahlst nur, was dir Memory Hunt wert ist – schon ab 5 € geht’s los! Keine versteckten Kosten.</p>
                            <div className="actions">
                                <a href={COFFEE_URL} target="_blank" rel="noopener noreferrer" onClick={track} className="btn btn-light">Buy Me a Coffee</a>
                                <a href="#we-host-for-you" onClick={track} className="btn btn-outline-light">Die 6 Schritte</a>
                            </div>
                        </div>
                        <div className="plan">
                            <h3>Selbst hosten</h3>
                            <p>Du bevorzugst es selber zu machen? Hol dir den vollen Zugang und leg los! Details findest du auf GitHub.</p>
                            <div className="actions">
                                <a href="https://github.com/floriandulzky/memorysnap" target="_blank" rel="noopener noreferrer" onClick={track} className="btn btn-ghost">Gehe zu GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="we-host-for-you" className="section">
                <div className="container">
                    <span className="eyebrow">Jetzt loslegen</span>
                    <h2>In nur 6 Schritten zu euren Erinnerungen</h2>
                    <ol className="timeline">
                        {PROCESS.map((step) => (
                            <li key={step.title}>
                                <h3>{step.title}</h3>
                                {step.text}
                            </li>
                        ))}
                    </ol>
                    <a href={COFFEE_URL} target="_blank" rel="noopener noreferrer" onClick={track} className="btn btn-accent">Jetzt starten ab 5€</a>
                </div>
            </section>

            <FAQSection/>
            <LandingPageFotoChallengeSection/>

            <footer className="footer">
                <div className="container">&copy; {new Date().getFullYear()} Memory Hunt — Built with ❤️</div>
            </footer>
        </>
    )
}
