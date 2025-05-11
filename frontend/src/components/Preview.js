import {Image} from "primereact/image";
import {useNavigate} from "react-router-dom";

export function Preview(attr) {

    const navigate = useNavigate();

    return (
        <div id={attr.id} className={"flex justify-content-center flex-column p-2 cursor-pointer hover:bg-black-alpha-10"}>
            <div className="flex">
                <Image src={`https://memory-snap.eu-central-1.linodeobjects.com/${attr.previewUrl}`}
                       alt="Image"
                       width="250"
                       onClick={() => {
                           navigate(`/wedding/${attr.weddingId}/${attr.id}`)
                       }}
                       imageStyle={{ width: '200px', height: '200px', objectFit: 'cover' }}
                       onError={(e) => e.target.src = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"}
                />
            </div>
            <div className="flex justify-content-center">
                <p>{attr.id} - {attr.title}</p>
            </div>
        </div>
    )
}
