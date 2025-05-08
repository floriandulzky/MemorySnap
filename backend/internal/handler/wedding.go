package handler

import (
	"encoding/json"
	"github.com/floriandulzky/wedding-foto-challenge-backend/internal/service"
	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog/log"
	"io"
	"net/http"
)

type WeddingHandler struct {
	service service.WeddingService
}

func NewWeddingHandler(weddingService service.WeddingService) WeddingHandler {
	return WeddingHandler{
		service: weddingService,
	}
}

func (wh *WeddingHandler) GetWedding(w http.ResponseWriter, r *http.Request) {
	weddingUuid := chi.URLParam(r, "weddingUuid")
	if weddingUuid == "" {
		http.Error(w, "Wedding UUID is required", http.StatusBadRequest)
		return
	}
	wedding, err := wh.service.GetWedding(weddingUuid)
	if err != nil {
		http.Error(w, "Failed to get wedding", http.StatusInternalServerError)
		return
	}
	resp, err := json.Marshal(wedding)
	if err != nil {
		http.Error(w, "Failed to marshal wedding data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, writerErr := w.Write(resp)
	if writerErr != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
		return
	}
}

func (wh *WeddingHandler) GetWeddingChallenge(w http.ResponseWriter, r *http.Request) {
	weddingUuid := chi.URLParam(r, "weddingUuid")
	if weddingUuid == "" {
		http.Error(w, "Wedding UUID is required", http.StatusBadRequest)
		return
	}
	challengeId := chi.URLParam(r, "challengeId")
	if challengeId == "" {
		http.Error(w, "Challenge ID is required", http.StatusBadRequest)
		return
	}
	wedding, err := wh.service.GetWeddingChallenge(weddingUuid, challengeId)
	if err != nil {
		http.Error(w, "Failed to get wedding", http.StatusInternalServerError)
		return
	}
	resp, err := json.Marshal(wedding)
	if err != nil {
		http.Error(w, "Failed to marshal wedding data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, writerErr := w.Write(resp)
	if writerErr != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
	}
}
func (wh *WeddingHandler) PostWeddingChallenge(w http.ResponseWriter, r *http.Request) {
	weddingUuid := chi.URLParam(r, "weddingUuid")
	if weddingUuid == "" {
		http.Error(w, "Wedding UUID is required", http.StatusBadRequest)
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
		saveFileErr := wh.service.SaveImage(weddingUuid, challengeId, bytes)
		if saveFileErr != nil {
			log.Error().Err(saveFileErr).Msgf("Failed to save image")
			http.Error(w, "Failed to save image", http.StatusInternalServerError)
			return
		}
	}
}
