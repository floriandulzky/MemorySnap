import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {FileUpload} from "primereact/fileupload";
import {loadChallenge} from "../../../integrations/challenge-loader";
import {Galleria} from "primereact/galleria";
import {Button} from "primereact/button";

export function Detail() {
    const {id, challenge} = useParams();
    const [challengeDetail, setChallengeDetails] = useState({})
    const [activeIndex, setActiveIndex] = useState(0);
    const galleria = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const start = async () => {
            const c = await loadChallenge(id, challenge)
            setChallengeDetails(c)
        }
        start()
    }, [id, challenge])

    const itemTemplate = (item) => {
        return <img src={`https://memory-snap.eu-central-1.linodeobjects.com/${item.url}`} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.url} alt={item.alt} style={{ display: 'block' }} />;
    }
    const chooseOptions = {
        icon: 'pi pi-fw pi-plus',
        iconOnly: false,
        className: 'custom-upload-btn p-button-rounded'
    }
    const uploadOptions = {
        icon: 'pi pi-fw pi-cloud-upload',
        iconOnly: false,
        className: 'custom-upload-btn p-button-success p-button-rounded'
    };
    const cancelOptions = {
        iconOnly: false,
        className: 'custom-upload-btn p-button-danger p-button-rounded p-button-outlined',
    };

    return (
        <div className={"flex flex-column flex-grow-1"}>
            <Galleria ref={galleria} value={challengeDetail.images} numVisible={7}
                      style={{ maxWidth: '95%', maxHeight: '95%' }}
                      activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
                      circular fullScreen showItemNavigators showThumbnails={false}
                      item={itemTemplate} thumbnail={thumbnailTemplate} />
            <div className={"flex justify-content-between p-2"}>
                <div className={"flex align-items-start p-2"}>
                    <Button icon={"pi pi-angle-left"} onClick={
                        () => {
                            navigate(`/wedding/${id}#${challenge}`)
                        }
                    } outlined rounded />
                </div>
                <div className={"flex flex-column p-2"}>
                    <h2 className={"text-center"}>#{challenge} - {challengeDetail.title}</h2>
                    <p className={"text-center"}>{challengeDetail.description}</p>
                </div>
            </div>
            <div className={"flex flex-row p-5 flex-grow-1 justify-content-center align-items-center"}>
                <FileUpload name="image[]" url={`/api/${id}/${challenge}/upload`}
                            mode="advanced"
                            multiple={true}
                            accept="image/*"
                            chooseOptions={chooseOptions}
                            uploadOptions={uploadOptions}
                            cancelOptions={cancelOptions}
                            onUpload={
                                async (e) => {
                                    const c = await loadChallenge(id, challenge)
                                    setChallengeDetails(c)
                                }
                            }
                            contentStyle={{"max-height": "200px", "overflow": "scroll"}}
                />
            </div>
            <div className="flex flex-wrap flex-grow-1 justify-content-center align-items-center">
                {
                    challengeDetail.images && challengeDetail.images.map((image, index) => {
                        let imgEl = <img style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                         alt={image.alt_text}
                                         src={`https://memory-snap.eu-central-1.linodeobjects.com/${image.url}`}
                                         onClick={
                            () => {setActiveIndex(index); galleria.current.show()}
                        } />
                        return (
                            <div className="flex flex-column p-1" key={index}>
                                {imgEl}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
