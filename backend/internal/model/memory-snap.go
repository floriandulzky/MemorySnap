package model

type MemorySnap struct {
	Id          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	// ShowAllChallenges controls whether guests may browse all challenges; nil (unset) means yes.
	ShowAllChallenges *bool       `json:"show_all_challenges"`
	Challenges        []Challenge `json:"challenges"`
}
type Challenge struct {
	Id          string  `json:"id"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Images      []Image `json:"images"`
	Preview     Image   `json:"default_image"`
}

type Image struct {
	Id      string `json:"id"`
	Url     string `json:"url"`
	AltText string `json:"alt_text"`
}

// UploadedPhoto is returned after an upload. Token authorises deleting exactly this photo.
type UploadedPhoto struct {
	Url   string `json:"url"`
	Token string `json:"token"`
}
