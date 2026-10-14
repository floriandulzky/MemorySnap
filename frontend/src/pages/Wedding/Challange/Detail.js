import {Navigate, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {loadChallenge} from "../../../integrations/challenge-loader";
import {Uploader} from "../../../components/Uploader";
import {PhotoGrid} from "../../../components/PhotoGrid";

export function Detail() {
    const {id, challenge} = useParams();
    const [detail, setDetail] = useState({})
    const navigate = useNavigate();
    const {showAll} = useOutletContext()

    const refresh = useCallback(async () => setDetail(await loadChallenge(id, challenge)), [id, challenge])
    useEffect(() => {refresh()}, [refresh])

    if (!showAll) return <Navigate to={`/wedding/${id}/challenge`} replace/>

    return (
        <>
            <button className="back" onClick={() => navigate(`/wedding/${id}/challenges#${challenge}`)}>
                <i className="pi pi-angle-left"/> Alle Challenges
            </button>
            <div className="challenge-card">
                <span className="eyebrow">Challenge #{challenge}</span>
                <h1>{detail.title}</h1>
                <p>{detail.description}</p>
            </div>
            <div className="card" style={{marginTop: 16}}>
                <Uploader url={`/api/${id}/${challenge}/upload`} onUploaded={refresh}/>
            </div>
            <p className="section-label">Fotos · {detail.images ? detail.images.length : 0}</p>
            <PhotoGrid photos={(detail.images || []).map((im, i) => ({...im, id: im.url || i}))}/>
        </>
    )
}
