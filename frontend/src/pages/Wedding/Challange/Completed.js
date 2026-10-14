import {useState} from "react";
import {Link, useOutletContext, useParams} from "react-router-dom";
import {deletePhoto} from "../../../integrations/challenge-loader";
import {readCompleted, removePhoto} from "../../../integrations/progress";
import {BUCKET_URL} from "../../../config";

export function Completed() {
    const {id} = useParams()
    const {config} = useOutletContext()
    const [, setVersion] = useState(0)
    const [error, setError] = useState(null)
    const [busy, setBusy] = useState(null)
    const byId = new Map(((config && config.challenges) || []).map((c) => [c.id, c]))
    const completed = readCompleted(id).filter((c) => byId.has(c.id)).reverse()
    const total = byId.size

    const remove = async (challengeId, photo) => {
        if (!window.confirm("Foto löschen? Du bekommst die Challenge danach erneut, wenn es dein letztes Foto dafür ist.")) {
            return
        }
        setBusy(photo.url)
        setError(null)
        try {
            await deletePhoto(photo.url, photo.token)
            removePhoto(id, challengeId, photo.url)
            setVersion((v) => v + 1)
        } catch (e) {
            setError("Das Foto konnte nicht gelöscht werden. Bitte versuche es später erneut.")
        } finally {
            setBusy(null)
        }
    }

    return (
        <>
            <h1 className="page-title">Absolvierte Challenges</h1>
            <p className="page-sub">
                {total > 0 ? `${completed.length} von ${total} geschafft` : " "}
            </p>
            {total > 0 && (
                <div className="progress" style={{marginBottom: 24}} aria-hidden="true">
                    <span style={{width: `${(completed.length / total) * 100}%`}}/>
                </div>
            )}
            {error && <div className="notice err" role="alert" style={{marginBottom: 16}}>{error}</div>}
            {completed.length === 0 ? (
                <div className="empty">
                    <p>Noch keine Challenge geschafft.</p>
                    <Link className="btn btn-primary" to={`/wedding/${id}/challenge`}>Zur aktuellen Challenge</Link>
                </div>
            ) : (
                <ul className="completed-list">
                    {completed.map(({id: cid, at, photos}) => (
                        <li key={cid} className="completed-item">
                            <span className="check"><i className="pi pi-check"/></span>
                            <div>
                                <strong>#{cid} · {byId.get(cid).title}</strong>
                                <p>{byId.get(cid).description}</p>
                                <small>{new Date(at).toLocaleString("de-AT", {dateStyle: "medium", timeStyle: "short"})}</small>
                                {photos && photos.length > 0 && (
                                    <div className="thumbs" style={{marginTop: 12}}>
                                        {photos.map((photo) => (
                                            <div className="thumb" key={photo.url}>
                                                <img src={`${BUCKET_URL}/${photo.url}`} alt={`Dein Foto für ${byId.get(cid).title}`} loading="lazy"/>
                                                <button type="button" aria-label="Foto löschen" disabled={busy === photo.url}
                                                        onClick={() => remove(cid, photo)}>
                                                    <i className="pi pi-trash"/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
