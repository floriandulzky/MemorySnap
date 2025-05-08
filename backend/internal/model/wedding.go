package model

type Wedding struct {
	Id          string      `json:"id"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Challenges  []Challenge `json:"challenges"`
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
