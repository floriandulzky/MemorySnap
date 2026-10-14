import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Uploader} from "../../../components/Uploader";
import {loadChallenges} from "../../../integrations/challenge-loader";
import {isCompleted, markCompleted, readAssigned, readCompleted, writeAssigned} from "../../../integrations/progress";

// Hands out one random challenge per visitor and keeps it until a photo was uploaded for it.
export function Assigned() {
    const {id} = useParams()
    const [challenges, setChallenges] = useState(null)
    const [current, setCurrent] = useState(null)
    const [fulfilled, setFulfilled] = useState(false)

    // prefers challenges the visitor has not completed yet
    const assign = useCallback((all) => {
        if (!all || all.length === 0) {
            return
        }
        const done = new Set(readCompleted(id).map((c) => c.id))
        const open = all.filter((c) => !done.has(c.id))
        const pool = open.length > 0 ? open : all
        const pick = pool[Math.floor(Math.random() * pool.length)]
        writeAssigned(id, pick.id)
        setFulfilled(false)
        setCurrent(pick)
    }, [id])

    useEffect(() => {
        const start = async () => {
            const config = await loadChallenges(id)
            const all = config.challenges || []
            setChallenges(all)
            const stored = all.find((c) => c.id === readAssigned(id))
            if (!stored) {
                assign(all)
                return
            }
            setCurrent(stored)
            // survives a reload after the upload; other guests' photos must not count, so it is tracked per visitor
            setFulfilled(isCompleted(id, stored.id))
        }
        start()
    }, [id, assign])

    const onUpload = (photos) => {
        markCompleted(id, current.id, photos)
        setFulfilled(true)
    }

    const next = () => {
        writeAssigned(id, null)
        const others = (challenges || []).filter((c) => c.id !== current.id)
        assign(others.length > 0 ? others : challenges)
    }

    if (!current) {
        return <p className="empty">Deine Challenge wird geladen…</p>
    }

    return (
        <>
            <div className="challenge-card">
                <span className="eyebrow">Deine Challenge · #{current.id}</span>
                <h1>{current.title}</h1>
                <p>{current.description}</p>
            </div>
            <div className="card" style={{marginTop: 16}}>
                {fulfilled ? (
                    <div className="done">
                        <div className="big">🎉</div>
                        <h2>Geschafft!</h2>
                        <p className="page-sub">Dein Foto ist in der Galerie. Bereit für die nächste Aufgabe?</p>
                        <button className="btn btn-primary btn-block" onClick={next}>
                            <i className="pi pi-refresh"/> Nächste Challenge
                        </button>
                    </div>
                ) : (
                    <Uploader url={`/api/${id}/${current.id}/upload`} label="Foto aufnehmen oder auswählen"
                              onUploaded={onUpload}/>
                )}
            </div>
        </>
    )
}
