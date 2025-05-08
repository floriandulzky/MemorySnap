package main

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/floriandulzky/wedding-foto-challenge-backend/internal"
	"github.com/floriandulzky/wedding-foto-challenge-backend/internal/handler"
	"github.com/floriandulzky/wedding-foto-challenge-backend/internal/repository"
	"github.com/floriandulzky/wedding-foto-challenge-backend/internal/service"
)

func main() {
	baseEndpoint := "https://eu-central-1.linodeobjects.com"
	client := s3.NewFromConfig(aws.Config{
		Region: "eu-central-1",
		Credentials: credentials.NewStaticCredentialsProvider(
			"9RV8LVXNGEHNQKQX9YWK",
			"wsEmOcYCGMZfhvzz70DJ5ovzFgNfEyTQtz4hDbYy",
			"test"),
		BaseEndpoint: &baseEndpoint,
	}, func(o *s3.Options) {
		o.UsePathStyle = true
	})
	server := internal.NewServer(handler.NewWeddingHandler(
		service.NewWeddingService(
			repository.NewS3(client),
		),
	))
	server.Start()
}
