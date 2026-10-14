import {useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {Uploader} from "../../components/Uploader";
import {PhotoGrid} from "../../components/PhotoGrid";
import {loadChallenges, loadPhotos} from "../../integrations/challenge-loader";

export function Photobox() {
    const {id} = useParams()
    const [config, setConfig] = useState({})
    const [photos, setPhotos] = useState([])
    const [justUploaded, setJustUploaded] = useState(false)

    const challenges = useMemo(() => new Map((config.challenges || []).map((c) => [c.id, c])), [config])

    const refresh = useCallback(async () => setPhotos(await loadPhotos(id)), [id])

    useEffect(() => {
        loadChallenges(id).then(setConfig)
        refresh()
    }, [id, refresh])

    return (
        <>
            <h1 className="page-title">{config.title || "Fotobox"}</h1>
            <p className="page-sub">Teile deine schönsten Momente – alle Fotos landen in der gemeinsamen Galerie.</p>
            <div className="card">
                <Uploader url={`/api/${id}/upload`} label="Fotos hinzufügen"
                          onUploaded={() => {setJustUploaded(true); refresh()}}/>
                {justUploaded && <div className="notice ok" style={{marginTop: 14}} role="status">Danke! Deine Fotos sind in der Galerie. 🎉</div>}
            </div>
            <p className="section-label">Galerie · {photos.length}</p>
            <PhotoGrid photos={photos} challenges={challenges}/>
        </>
    )
}
