package internal

import (
	"github.com/floriandulzky/wedding-foto-challenge-backend/internal/handler"
	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog/log"
	"net/http"
)

type server struct {
	weddingHandler handler.WeddingHandler
}

type Server interface {
	Start()
}

func NewServer(weddingHandler handler.WeddingHandler) Server {
	return &server{
		weddingHandler: weddingHandler,
	}
}

func (s *server) Start() {
	r := chi.NewRouter()
	r.Route("/", func(r chi.Router) {
		r.Get("/{weddingUuid}", s.weddingHandler.GetWedding)
		r.Get("/{weddingUuid}/{challengeId}", s.weddingHandler.GetWeddingChallenge)
		r.Post("/{weddingUuid}/{challengeId}/upload", s.weddingHandler.PostWeddingChallenge)
	})
	log.Info().Msgf("Starting server on port %d", 1909)
	err := http.ListenAndServe(":1909", r)
	if err != nil {
		log.Error().Err(err).Msg("Failed to start server")
	}
}
