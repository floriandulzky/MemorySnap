import {useEffect, useState} from "react";
import {Navigate, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {loadChallenges} from "../../../integrations/challenge-loader";
import {BUCKET_URL} from "../../../config";

export function Overview() {
    const {id} = useParams()
    const navigate = useNavigate()
    const {showAll} = useOutletContext()
    const [config, setConfig] = useState({})

    useEffect(() => {
        loadChallenges(id).then((c) => {
            setConfig(c)
            setTimeout(() => {
                const el = document.getElementById(window.location.hash.slice(1))
                if (el) el.scrollIntoView({block: "center"})
            }, 100)
        })
    }, [id]);

    if (!showAll) return <Navigate to={`/wedding/${id}/challenge`} replace/>

    return (
        <>
            <h1 className="page-title">Alle Challenges</h1>
            <p className="page-sub">{config.description}</p>
            <div className="challenge-grid">
                {(config.challenges || []).map((c) => (
                    <button key={c.id} id={c.id} className="challenge-tile"
                            onClick={() => navigate(`/wedding/${id}/${c.id}`)}>
                        <span className="pic">
                            {c.default_image?.url
                                ? <img src={`${BUCKET_URL}/${c.default_image.url}`} alt="" loading="lazy"/>
                                : <i className="pi pi-image"/>}
                            <span className="badge">{c.id}</span>
                        </span>
                        <span className="label">{c.title}</span>
                    </button>
                ))}
            </div>
        </>
    )
}
