package main

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/floriandulzky/memory-snap/backend/internal"
	"github.com/floriandulzky/memory-snap/backend/internal/handler"
	"github.com/floriandulzky/memory-snap/backend/internal/repository"
	"github.com/floriandulzky/memory-snap/backend/internal/service"
	"os"
)

func main() {
	baseEndpoint := os.Getenv("AWS_S3_ENDPOINT_URL")
	client := s3.NewFromConfig(aws.Config{
		Region: os.Getenv("AWS_S3_REGION"),
		Credentials: credentials.NewStaticCredentialsProvider(
			os.Getenv("AWS_ACCESS_KEY_ID"),
			os.Getenv("AWS_SECRET_ACCESS_KEY"),
			"memory-snap-backend"),
		BaseEndpoint: &baseEndpoint,
	}, func(o *s3.Options) {
		o.UsePathStyle = true
	})
	server := internal.NewServer(handler.NewHttpHandler(
		service.NewMemorySnapService(
			repository.NewS3(client),
		),
	))
	server.Start()
}
