import {Image} from "primereact/image";
import {useNavigate} from "react-router-dom";

export function Preview(attr) {

    const navigate = useNavigate();

    return (
        <div id={attr.id}
             className={"flex m-2 p-4 bg-primary-50 justify-content-center flex-column p-2 cursor-pointer hover:bg-primary-100 border-round-2xl w-20rem"}>
            <div className="flex justify-content-center">
                <Image src={`https://memory-snap.eu-central-1.linodeobjects.com/${attr.previewUrl}`}
                       alt="Image"
                       imageClassName={"border-round-2xl w-18rem"}
                       onClick={() => {
                           navigate(`/wedding/${attr.weddingId}/${attr.id}`)
                       }}
                       imageStyle={{ width: '200px', height: '200px', objectFit: 'cover' }}
                       onError={(e) => e.target.src = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"}
                />
            </div>
            <div className="flex justify-content-center">
                {attr.id} - {attr.title}
            </div>
        </div>
    )
}
