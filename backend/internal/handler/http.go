package handler

import (
	"encoding/json"
	"errors"
	"github.com/floriandulzky/memory-snap/backend/internal/model"
	"github.com/floriandulzky/memory-snap/backend/internal/service"
	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog/log"
	"io"
	"net/http"
)

type HttpHandler struct {
	service service.MemorySnapService
}

func NewHttpHandler(memorySnapService service.MemorySnapService) HttpHandler {
	return HttpHandler{
		service: memorySnapService,
	}
}

func (wh *HttpHandler) GetMemorySnap(w http.ResponseWriter, r *http.Request) {
	uuid := chi.URLParam(r, "uuid")
	if uuid == "" {
		http.Error(w, "UUID is required", http.StatusBadRequest)
		return
	}
	memorySnap, err := wh.service.GetBy(uuid)
	if err != nil {
		http.Error(w, "Failed to get memorySnap", http.StatusInternalServerError)
		return
	}
	resp, err := json.Marshal(memorySnap)
	if err != nil {
		http.Error(w, "Failed to marshal memorySnap data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, writerErr := w.Write(resp)
	if writerErr != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
		return
	}
}

func (wh *HttpHandler) GetChallenge(w http.ResponseWriter, r *http.Request) {
	uuid := chi.URLParam(r, "uuid")
	if uuid == "" {
		http.Error(w, "UUID is required", http.StatusBadRequest)
		return
	}
	challengeId := chi.URLParam(r, "challengeId")
	if challengeId == "" {
		http.Error(w, "Challenge ID is required", http.StatusBadRequest)
		return
	}
	challenge, err := wh.service.GetChallenge(uuid, challengeId)
	if err != nil {
		http.Error(w, "Failed to get challenge", http.StatusInternalServerError)
		return
	}
	resp, err := json.Marshal(challenge)
	if err != nil {
		http.Error(w, "Failed to marshal challenge data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, writerErr := w.Write(resp)
	if writerErr != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
	}
}

func (wh *HttpHandler) GetPhotos(w http.ResponseWriter, r *http.Request) {
	uuid := chi.URLParam(r, "uuid")
	if uuid == "" {
		http.Error(w, "UUID is required", http.StatusBadRequest)
		return
	}
	photos, err := wh.service.ListPhotos(uuid)
	if err != nil {
		http.Error(w, "Failed to get photos", http.StatusInternalServerError)
		return
	}
	resp, err := json.Marshal(photos)
	if err != nil {
		http.Error(w, "Failed to marshal photos", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	if _, err := w.Write(resp); err != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
	}
}

// PostPhoto stores photos in the free-form photobox, without a challenge.
func (wh *HttpHandler) PostPhoto(w http.ResponseWriter, r *http.Request) {
	uuid := chi.URLParam(r, "uuid")
	if uuid == "" {
		http.Error(w, "UUID is required", http.StatusBadRequest)
		return
	}
	wh.upload(w, r, func(bytes []byte) (model.UploadedPhoto, error) { return wh.service.SavePhoto(uuid, bytes) })
}

func (wh *HttpHandler) PostChallenge(w http.ResponseWriter, r *http.Request) {
	uuid := chi.URLParam(r, "uuid")
	if uuid == "" {
		http.Error(w, "UUID is required", http.StatusBadRequest)
		return
	}
	challengeId := chi.URLParam(r, "challengeId")
	if challengeId == "" {
		http.Error(w, "Challenge ID is required", http.StatusBadRequest)
		return
	}
	wh.upload(w, r, func(bytes []byte) (model.UploadedPhoto, error) { return wh.service.SaveImage(uuid, challengeId, bytes) })
}

func (wh *HttpHandler) upload(w http.ResponseWriter, r *http.Request, save func([]byte) (model.UploadedPhoto, error)) {
	// Assuming the body contains the image data
	if r.Body == nil {
		http.Error(w, "Image data is required", http.StatusBadRequest)
		return
	}
	err := r.ParseMultipartForm(10 << 20) // Limit upload size to 10MB
	if err != nil {
		http.Error(w, "Failed to parse multipart form", http.StatusBadRequest)
		return
	}
	files := r.MultipartForm.File["image[]"]
	if len(files) == 0 {
		http.Error(w, "No files uploaded", http.StatusBadRequest)
		return
	}
	uploaded := make([]model.UploadedPhoto, 0, len(files))
	for _, file := range files {
		f, err := file.Open()
		if err != nil {
			http.Error(w, "Failed to open uploaded file", http.StatusBadRequest)
			return
		}
		defer f.Close()
		bytes, err := io.ReadAll(f)
		if err != nil {
			http.Error(w, "Failed to read image file", http.StatusInternalServerError)
			return
		}
		photo, saveFileErr := save(bytes)
		if saveFileErr != nil {
			log.Error().Err(saveFileErr).Msgf("Failed to save image")
			http.Error(w, "Failed to save image", http.StatusInternalServerError)
			return
		}
		uploaded = append(uploaded, photo)
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(uploaded); err != nil {
		log.Error().Err(err).Msg("Failed to write response")
	}
}

func (wh *HttpHandler) DeletePhoto(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("X-Delete-Token")
	if token == "" {
		http.Error(w, "Delete token is required", http.StatusUnauthorized)
		return
	}
	err := wh.service.DeletePhoto(
		chi.URLParam(r, "uuid"), chi.URLParam(r, "challengeId"), chi.URLParam(r, "photoId"), token)
	if errors.Is(err, service.ErrForbidden) {
		http.Error(w, "Invalid delete token", http.StatusForbidden)
		return
	}
	if err != nil {
		log.Error().Err(err).Msg("Failed to delete photo")
		http.Error(w, "Failed to delete photo", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
