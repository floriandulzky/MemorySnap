export async function loadChallenges(id) {
    const resp = await fetch(`/api/${id}`, {})
    return await resp.json()
}

export async function loadChallenge(weddingId, challengeId) {
    const resp = await fetch(`/api/${weddingId}/${challengeId}`, {})
    return await resp.json()
}
