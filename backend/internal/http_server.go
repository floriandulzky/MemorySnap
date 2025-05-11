package internal

import (
	"github.com/floriandulzky/memory-snap/backend/internal/handler"
	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog/log"
	"net/http"
)

type server struct {
	httpHandler handler.HttpHandler
}

type Server interface {
	Start()
}

func NewServer(httpHandler handler.HttpHandler) Server {
	return &server{
		httpHandler: httpHandler,
	}
}

func (s *server) Start() {
	r := chi.NewRouter()
	r.Route("/", func(r chi.Router) {
		r.Get("/{uuid}", s.httpHandler.GetMemorySnap)
		r.Get("/{uuid}/{challengeId}", s.httpHandler.GetChallenge)
		r.Post("/{uuid}/{challengeId}/upload", s.httpHandler.PostChallenge)
	})
	log.Info().Msgf("Starting server on port %d", 1909)
	err := http.ListenAndServe(":1909", r)
	if err != nil {
		log.Error().Err(err).Msg("Failed to start server")
	}
}
