package service

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/floriandulzky/memory-snap/backend/internal/model"
	"github.com/floriandulzky/memory-snap/backend/internal/repository"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"regexp"
	"strings"
)

var ErrForbidden = errors.New("invalid delete token")

type MemorySnapService struct {
	s3Repo       repository.S3
	deleteSecret []byte
}

// NewMemorySnapService takes the secret used to sign delete tokens. Guests have no accounts, so
// the token handed out at upload time is the only proof that someone may delete a photo.
func NewMemorySnapService(s3Repo repository.S3, deleteSecret []byte) MemorySnapService {
	return MemorySnapService{
		s3Repo:       s3Repo,
		deleteSecret: deleteSecret,
	}
}

func (s *MemorySnapService) deleteToken(key string) string {
	mac := hmac.New(sha256.New, s.deleteSecret)
	mac.Write([]byte(key))
	return hex.EncodeToString(mac.Sum(nil))
}

func (s *MemorySnapService) GetBy(uuid string) (model.MemorySnap, error) {
	configFile, err := s.s3Repo.LoadChallengeConfig(uuid)
	if err != nil {
		log.Error().Err(err).Msgf("could not load challenge config")
		return model.MemorySnap{}, fmt.Errorf("could not load challenge config")
	}

	var challengeConfig model.MemorySnap
	err = json.Unmarshal(configFile, &challengeConfig)
	if err != nil {
		log.Error().Err(err).Msgf("could not unmarshal challenge config")
		return model.MemorySnap{}, fmt.Errorf("could not unmarshal challenge config")
	}

	files, err := s.s3Repo.GetFileList(uuid + "/")
	if err != nil {
		log.Error().Err(err).Msgf("could not load file list")
		return model.MemorySnap{}, fmt.Errorf("could not load file list")
	}
	fileMap := make(map[string]model.Image)
	for _, file := range files {
		re, _ := regexp.Compile("(.*)/(.*)/(.*)")
		matches := re.FindStringSubmatch(file)
		if len(matches) != 4 {
			log.Debug().Msgf("could not parse file %s", file)
			continue
		}
		if _, ok := fileMap[matches[2]]; ok {
			continue
		}
		fileMap[matches[2]] = model.Image{
			Id:      matches[3],
			Url:     file,
			AltText: "img",
		}
	}

	if len(fileMap) > 0 {
		for i := range challengeConfig.Challenges {
			if _, ok := fileMap[challengeConfig.Challenges[i].Id]; ok {
				challengeConfig.Challenges[i].Preview = fileMap[fmt.Sprintf("%s", challengeConfig.Challenges[i].Id)]
			}
		}
	}

	return challengeConfig, nil
}
func (s *MemorySnapService) GetChallenge(uuid string, challengeId string) (model.Challenge, error) {
	challangeConfigFile, err := s.s3Repo.LoadChallengeConfig(uuid)
	if err != nil {
		log.Error().Err(err).Msgf("could not load challenge config")
		return model.Challenge{}, fmt.Errorf("could not load challenge config")
	}
	var challengeConfig model.MemorySnap
	err = json.Unmarshal(challangeConfigFile, &challengeConfig)
	if err != nil {
		log.Error().Err(err).Msgf("could not unmarshal challenge config")
		return model.Challenge{}, fmt.Errorf("could not unmarshal challenge config")
	}

	files, err := s.s3Repo.GetFileList(uuid + "/" + challengeId + "/")
	if err != nil {
		log.Error().Err(err).Msgf("could not load file list")
		return model.Challenge{}, fmt.Errorf("could not load file list")
	}
	images := make([]model.Image, len(files))
	for i, file := range files {
		images[i] = model.Image{
			Id:      string(rune(i)),
			Url:     file,
			AltText: "img",
		}
	}
	for _, c := range challengeConfig.Challenges {
		if c.Id == challengeId {
			return model.Challenge{
				Id:          c.Id,
				Title:       c.Title,
				Description: c.Description,
				Images:      images,
			}, nil
		}
	}
	log.Error().Msgf("could not find challenge %s", challengeId)
	return model.Challenge{}, fmt.Errorf("could not find challenge %s", challengeId)
}

func (s *MemorySnapService) SaveImage(UUID string, challengeId string, image []byte) (model.UploadedPhoto, error) {
	key := fmt.Sprintf("%s/%s/%s.jpg", UUID, challengeId, uuid.New().String())
	// UploadFile appends the .jpg extension itself
	err := s.s3Repo.UploadFile(strings.TrimSuffix(key, ".jpg"), image)
	if err != nil {
		log.Error().Err(err).Msg("Failed to upload image")
		return model.UploadedPhoto{}, fmt.Errorf("failed to upload image")
	}
	return model.UploadedPhoto{Url: key, Token: s.deleteToken(key)}, nil
}

// DeletePhoto removes a photo if token matches the one issued at upload.
func (s *MemorySnapService) DeletePhoto(UUID string, challengeId string, photoId string, token string) error {
	key := fmt.Sprintf("%s/%s/%s", UUID, challengeId, photoId)
	if !hmac.Equal([]byte(token), []byte(s.deleteToken(key))) {
		return ErrForbidden
	}
	return s.s3Repo.DeleteFile(key)
}

const photoboxFolder = "photobox"

// ListPhotos returns every uploaded photo of a memory snap, newest folders unordered.
func (s *MemorySnapService) ListPhotos(uuid string) ([]model.Image, error) {
	files, err := s.s3Repo.GetFileList(uuid + "/")
	if err != nil {
		log.Error().Err(err).Msgf("could not load file list")
		return nil, fmt.Errorf("could not load file list")
	}
	images := make([]model.Image, 0, len(files))
	for _, file := range files {
		if strings.HasSuffix(file, "/challenge.json") {
			continue
		}
		images = append(images, model.Image{
			Id:      file,
			Url:     file,
			AltText: "img",
		})
	}
	return images, nil
}

func (s *MemorySnapService) SavePhoto(uuid string, image []byte) (model.UploadedPhoto, error) {
	return s.SaveImage(uuid, photoboxFolder, image)
}
