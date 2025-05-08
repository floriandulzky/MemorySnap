import {useEffect, useState} from "react";
import {loadChallenges} from "../../../integrations/challenge-loader";
import {useParams} from "react-router-dom";
import {Preview} from "../../../components/Preview";

export function Overview() {

    const { id } = useParams()
    const [challenges, setChallenges] = useState({})
    useEffect(() => {
        const start = async () => {
            const c = await loadChallenges(id)
            setChallenges(c)
            setTimeout( () => {
                const hash = window.location.hash.slice(1); // Remove the '#' character from the hash
                if (hash) {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView();
                    }
                }
            }, 100)
        }
        start()
    }, [id]);

    return (
        <div className={"flex flex-column flex-grow-1"}>
            <div className={"flex flex-column justify-content-center align-items-center p-2"}>
                <h2 className={"text-center"}>{challenges.title}</h2>
                <p className={"text-center"}>{challenges.description}</p>
            </div>
            <div className={"flex flex-wrap flex-grow-1 justify-content-center align-items-center"}>
                {
                    challenges && challenges.challenges && challenges.challenges.map((challenge, index) => (
                        <Preview
                            previewUrl={challenge.default_image?.url}
                            key={index}
                            weddingId={id}
                            id={challenge.id}
                            title={challenge.title}
                            description={challenge.description} />
                    ))
                }
            </div>
        </div>
    )
}
