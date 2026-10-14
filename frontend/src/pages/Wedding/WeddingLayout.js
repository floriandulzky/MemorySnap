import {useEffect, useState} from "react";
import {NavLink, Outlet, useParams} from "react-router-dom";
import {loadChallenges} from "../../integrations/challenge-loader";

export function WeddingLayout() {
    const {id} = useParams()
    const [config, setConfig] = useState(null)
    const tab = ({isActive}) => "tab" + (isActive ? " active" : "")

    useEffect(() => {
        loadChallenges(id).then(setConfig)
    }, [id])

    // unset means visible, so existing configs keep working
    const showAll = !config || config.show_all_challenges !== false

    return (
        <div className="guest">
            <header className="guest-header">
                <span className="brand"><i className="pi pi-camera"/> Memory Hunt</span>
                <nav className="tabs" aria-label="Bereiche">
                    <NavLink end to={`/wedding/${id}`} className={tab}>Fotobox</NavLink>
                    <NavLink to={`/wedding/${id}/challenge`} className={tab}>Meine Challenge</NavLink>
                    <NavLink to={`/wedding/${id}/completed`} className={tab}>Absolviert</NavLink>
                    {showAll && <NavLink to={`/wedding/${id}/challenges`} className={tab}>Alle Challenges</NavLink>}
                </nav>
            </header>
            <main className="guest-main">
                <Outlet context={{config, showAll}}/>
            </main>
        </div>
    )
}
