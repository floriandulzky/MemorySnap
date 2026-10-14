import {useEffect, useRef, useState} from "react";

// Mobile-first photo uploader: pick/take photos, preview them, send them as multipart `image[]`.
export function Uploader({url, onUploaded, label = "Fotos auswählen"}) {
    const input = useRef(null)
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [state, setState] = useState("idle") // idle | uploading | error
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const urls = files.map((f) => URL.createObjectURL(f))
        setPreviews(urls)
        return () => urls.forEach((u) => URL.revokeObjectURL(u))
    }, [files])

    const pick = (e) => {
        setFiles((prev) => [...prev, ...Array.from(e.target.files)])
        setState("idle")
        e.target.value = ""
    }

    const upload = () => {
        const body = new FormData()
        files.forEach((f) => body.append("image[]", f))
        const xhr = new XMLHttpRequest()
        xhr.open("POST", url)
        xhr.upload.onprogress = (e) => e.lengthComputable && setProgress(Math.round((e.loaded / e.total) * 100))
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let result = []
                try {
                    result = JSON.parse(xhr.responseText)
                } catch (e) {
                    // an unreadable response still means the upload worked
                }
                setFiles([])
                setState("idle")
                onUploaded && onUploaded(result)
            } else {
                setState("error")
            }
        }
        xhr.onerror = () => setState("error")
        setProgress(0)
        setState("uploading")
        xhr.send(body)
    }

    return (
        <div className="uploader">
            <input ref={input} type="file" accept="image/*" multiple hidden onChange={pick}/>
            {files.length === 0 ? (
                <button type="button" className="dropzone" onClick={() => input.current.click()}>
                    <i className="pi pi-camera"/>
                    <span>{label}</span>
                    <small>Kamera oder Galerie</small>
                </button>
            ) : (
                <>
                    <div className="thumbs">
                        {previews.map((src, i) => (
                            <div className="thumb" key={src}>
                                <img src={src} alt=""/>
                                <button type="button" aria-label="Foto entfernen" disabled={state === "uploading"}
                                        onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}>×</button>
                            </div>
                        ))}
                    </div>
                    {state === "uploading" && <div className="progress"><span style={{width: `${progress}%`}}/></div>}
                    {state === "error" && <div className="notice err" role="alert">Upload fehlgeschlagen. Bitte versuche es erneut.</div>}
                    <div className="upload-actions">
                        <button type="button" className="btn btn-accent" onClick={upload} disabled={state === "uploading"}>
                            <i className="pi pi-cloud-upload"/>
                            {state === "uploading" ? `Lädt hoch… ${progress}%` : `${files.length} ${files.length === 1 ? "Foto" : "Fotos"} hochladen`}
                        </button>
                        <button type="button" className="btn btn-ghost" onClick={() => input.current.click()} disabled={state === "uploading"}>
                            Weitere
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
