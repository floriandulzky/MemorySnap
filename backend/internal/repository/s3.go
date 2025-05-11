package repository

import (
	"bytes"
	"context"
	"errors"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/aws/smithy-go"
	"github.com/rs/zerolog/log"
	"io"
)

type S3 struct {
	client *s3.Client
}

func NewS3(s3Client *s3.Client) S3 {
	return S3{
		client: s3Client,
	}
}

func (s *S3) LoadChallengeConfig(uuid string) ([]byte, error) {
	resp, err := s.client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String("memory-snap"),
		Key:    aws.String(uuid + "/challenge.json"),
	})
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return body, nil
}

func (s *S3) UploadFile(filePath string, file []byte) error {
	reader := bytes.NewReader(file) // []byte → io.ReadSeeker
	_, err := s.client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String("memory-snap"),
		Key:    aws.String(filePath + ".jpg"),
		Body:   reader,
		ACL:    types.ObjectCannedACLPublicRead,
	})
	if err != nil {
		var apiErr smithy.APIError
		if errors.As(err, &apiErr) && apiErr.ErrorCode() == "EntityTooLarge" {
			log.Info().Msgf("Error while uploading object to %s. The object is too large.\n"+
				"To upload objects larger than 5GB, use the S3 console (160GB max)\n"+
				"or the multipart upload API (5TB max).", "memory-snap")
		} else {
			log.Info().Msgf("Couldn't upload file %v to %v:%v. Here's why: %v\n",
				filePath, "memory-snap", filePath, err)
		}
	}
	return nil
}

func (s *S3) GetFileList(path string) ([]string, error) {
	resp, err := s.client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String("memory-snap"),
		Prefix: aws.String(path),
	})
	if err != nil {
		return nil, err
	}

	var fileList []string
	for _, obj := range resp.Contents {
		fileList = append(fileList, *obj.Key)
	}
	return fileList, nil
}
