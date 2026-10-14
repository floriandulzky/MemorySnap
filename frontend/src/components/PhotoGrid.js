import {useRef, useState} from "react";
import {Galleria} from "primereact/galleria";
import {BUCKET_URL} from "../config";

// challenges: optional Map(challengeId -> challenge); photos from a challenge get its label as info.
export function PhotoGrid({photos, challenges}) {
    const galleria = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const src = (p) => `${BUCKET_URL}/${p.url}`
    const challengeOf = (p) => challenges && challenges.get(p.url.split("/")[1])
    const label = (p) => {
        const c = challengeOf(p)
        return c ? `#${c.id} · ${c.title}` : null
    }

    if (!photos || photos.length === 0) {
        return <p className="empty">Noch keine Fotos – sei der Erste! 📸</p>
    }
    return (
        <>
            <Galleria ref={galleria} value={photos} activeIndex={activeIndex}
                      onItemChange={(e) => setActiveIndex(e.index)}
                      circular fullScreen showItemNavigators showThumbnails={false}
                      item={(p) => <img src={src(p)} alt={p.alt_text} style={{maxWidth: '100vw', maxHeight: '90vh', objectFit: 'contain'}}/>}
                      caption={(p) => label(p) && <span>{label(p)}</span>}/>
            <div className="grid-photos">
                {photos.map((p, i) => (
                    <button key={p.id} aria-label={`Foto ${i + 1} öffnen`}
                            onClick={() => {setActiveIndex(i); galleria.current.show()}}>
                        <img src={src(p)} alt={p.alt_text} loading="lazy"/>
                        {challengeOf(p) && <span className="photo-tag">#{challengeOf(p).id} · {challengeOf(p).title}</span>}
                    </button>
                ))}
            </div>
        </>
    )
}
