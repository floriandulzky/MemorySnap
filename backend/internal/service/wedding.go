package service

import (
	"encoding/json"
	"fmt"
	"github.com/floriandulzky/wedding-foto-challenge-backend/internal/model"
	"github.com/floriandulzky/wedding-foto-challenge-backend/internal/repository"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"regexp"
)

type WeddingService struct {
	s3Repo repository.S3
}

func NewWeddingService(s3Repo repository.S3) WeddingService {
	return WeddingService{
		s3Repo: s3Repo,
	}
}

func (s *WeddingService) GetWedding(weddingUUID string) (model.Wedding, error) {
	configFile, err := s.s3Repo.LoadChallengeConfig(weddingUUID)
	if err != nil {
		log.Error().Err(err).Msgf("could not load challenge config")
		return model.Wedding{}, fmt.Errorf("could not load challenge config")
	}

	var challengeConfig model.Wedding
	err = json.Unmarshal(configFile, &challengeConfig)
	if err != nil {
		log.Error().Err(err).Msgf("could not unmarshal challenge config")
		return model.Wedding{}, fmt.Errorf("could not unmarshal challenge config")
	}

	files, err := s.s3Repo.GetFileList(weddingUUID + "/")
	if err != nil {
		log.Error().Err(err).Msgf("could not load file list")
		return model.Wedding{}, fmt.Errorf("could not load file list")
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
func (s *WeddingService) GetWeddingChallenge(weddingUUID string, challengeId string) (model.Challenge, error) {
	challangeConfigFile, err := s.s3Repo.LoadChallengeConfig(weddingUUID)
	if err != nil {
		log.Error().Err(err).Msgf("could not load challenge config")
		return model.Challenge{}, fmt.Errorf("could not load challenge config")
	}
	var challengeConfig model.Wedding
	err = json.Unmarshal(challangeConfigFile, &challengeConfig)
	if err != nil {
		log.Error().Err(err).Msgf("could not unmarshal challenge config")
		return model.Challenge{}, fmt.Errorf("could not unmarshal challenge config")
	}

	files, err := s.s3Repo.GetFileList(weddingUUID + "/" + challengeId + "/")
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

func (s *WeddingService) SaveImage(weddingUUID string, challengeId string, image []byte) error {
	newUUID := uuid.New().String()
	err := s.s3Repo.UploadFile(
		fmt.Sprintf("%s/%s/%s", weddingUUID, challengeId, newUUID),
		image,
	)
	if err != nil {
		log.Error().Err(err).Msg("Failed to upload image")
		return fmt.Errorf("failed to upload image")
	}
	return nil
}
