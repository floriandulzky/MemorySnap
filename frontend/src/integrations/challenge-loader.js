export async function loadChallenges(id) {
    const resp = await fetch(`/api/${id}`, {})
    return await resp.json()
}

export async function loadChallenge(weddingId, challengeId) {
    const resp = await fetch(`/api/${weddingId}/${challengeId}`, {})
    return await resp.json()
}

export async function loadPhotos(id) {
    const resp = await fetch(`/api/${id}/photos`, {})
    return await resp.json()
}

// photoUrl is the stored key `<uuid>/<challengeId>/<file>`; the token comes from the upload response.
export async function deletePhoto(photoUrl, token) {
    const [uuid, challengeId, file] = photoUrl.split("/")
    const resp = await fetch(`/api/${uuid}/${challengeId}/${file}`, {method: "DELETE", headers: {"X-Delete-Token": token}})
    if (!resp.ok) {
        throw new Error(`delete failed: ${resp.status}`)
    }
}
