package main

import (
	"crypto/rand"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/floriandulzky/memory-snap/backend/internal"
	"github.com/floriandulzky/memory-snap/backend/internal/handler"
	"github.com/floriandulzky/memory-snap/backend/internal/repository"
	"github.com/floriandulzky/memory-snap/backend/internal/service"
	"github.com/rs/zerolog/log"
	"os"
)

func main() {
	baseEndpoint := os.Getenv("AWS_S3_ENDPOINT_URL")
	client := s3.NewFromConfig(aws.Config{
		Region: os.Getenv("AWS_S3_REGION"),
		Credentials: credentials.NewStaticCredentialsProvider(
			os.Getenv("AWS_ACCESS_KEY_ID"),
			os.Getenv("AWS_SECRET_ACCESS_KEY"),
			""),
		BaseEndpoint: &baseEndpoint,
	}, func(o *s3.Options) {
		o.UsePathStyle = true
	})
	server := internal.NewServer(handler.NewHttpHandler(
		service.NewMemorySnapService(
			repository.NewS3(client),
			deleteSecret(),
		),
	))
	server.Start()
}

// deleteSecret signs photo delete tokens. Without MEMORY_SNAP_DELETE_SECRET a random one is used,
// which invalidates all delete tokens on restart (and differs between replicas).
func deleteSecret() []byte {
	if secret := os.Getenv("MEMORY_SNAP_DELETE_SECRET"); secret != "" {
		return []byte(secret)
	}
	log.Warn().Msg("MEMORY_SNAP_DELETE_SECRET is not set; using a random secret, delete tokens will not survive a restart")
	secret := make([]byte, 32)
	if _, err := rand.Read(secret); err != nil {
		log.Fatal().Err(err).Msg("could not generate delete secret")
	}
	return secret
}
