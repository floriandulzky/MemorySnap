package handler

import (
	"encoding/json"
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
		saveFileErr := wh.service.SaveImage(uuid, challengeId, bytes)
		if saveFileErr != nil {
			log.Error().Err(saveFileErr).Msgf("Failed to save image")
			http.Error(w, "Failed to save image", http.StatusInternalServerError)
			return
		}
	}
}
