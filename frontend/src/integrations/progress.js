// Per-visitor progress, kept in localStorage (there are no accounts).
const key = (id, name) => `memorysnap:${id}:${name}`

function read(k) {
    try {
        return localStorage.getItem(k)
    } catch (e) {
        return null
    }
}

function write(k, value) {
    try {
        if (value === null) {
            localStorage.removeItem(k)
        } else {
            localStorage.setItem(k, value)
        }
    } catch (e) {
        // storage unavailable: progress only lasts for this page view
    }
}

export const readAssigned = (id) => read(key(id, "assigned-challenge"))
export const writeAssigned = (id, challengeId) => write(key(id, "assigned-challenge"), challengeId)

// Completed challenges: [{id, at, photos: [{url, token}]}] in completion order.
// The token is what the backend requires to delete that photo again.
export function readCompleted(id) {
    try {
        const list = JSON.parse(read(key(id, "completed")) || "[]")
        return Array.isArray(list) ? list : []
    } catch (e) {
        return []
    }
}

function writeCompleted(id, list) {
    write(key(id, "completed"), JSON.stringify(list))
}

export function markCompleted(id, challengeId, photos = []) {
    const list = readCompleted(id)
    const existing = list.find((c) => c.id === challengeId)
    if (existing) {
        existing.photos = [...(existing.photos || []), ...photos]
        writeCompleted(id, list)
    } else {
        writeCompleted(id, [...list, {id: challengeId, at: new Date().toISOString(), photos}])
    }
}

// Forgets one photo. When it was the last one the challenge counts as open again and
// becomes the visitor's assigned challenge.
export function removePhoto(id, challengeId, url) {
    const list = readCompleted(id)
    const entry = list.find((c) => c.id === challengeId)
    if (!entry) {
        return
    }
    entry.photos = (entry.photos || []).filter((p) => p.url !== url)
    if (entry.photos.length === 0) {
        writeCompleted(id, list.filter((c) => c.id !== challengeId))
        writeAssigned(id, challengeId)
    } else {
        writeCompleted(id, list)
    }
}

export const isCompleted = (id, challengeId) => readCompleted(id).some((c) => c.id === challengeId)
