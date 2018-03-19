package main

import (
	"fmt"
	"gawkbox-assignment/twitch"
	"net/http"
	"time"
	"encoding/json"
)
type Streams struct {
	Total   int `json:"_total"`
	Streams []stream `json:"streams"`
}
type stream struct {
	ID          int64     `json:"_id"`
	Game        string    `json:"game"`
	Viewers     int       `json:"viewers"`
	VideoHeight int       `json:"video_height"`
	AverageFps  float64   `json:"average_fps"`
	Delay       int       `json:"delay"`
	CreatedAt   time.Time `json:"created_at"`
	IsPlaylist  bool      `json:"is_playlist"`
	StreamType  string    `json:"stream_type"`
	Preview     Preview 	`json:"preview"`
	Channel 		Channel   `json:"channel"`
}
type Preview struct {
	Small    string `json:"small"`
	Medium   string `json:"medium"`
	Large    string `json:"large"`
	Template string `json:"template"`
}
type Channel struct {
	Mature                       bool        `json:"mature"`
	Partner                      bool        `json:"partner"`
	Status                       string      `json:"status"`
	BroadcasterLanguage          string      `json:"broadcaster_language"`
	DisplayName                  string      `json:"display_name"`
	Game                         string      `json:"game"`
	Language                     string      `json:"language"`
	ID                           int         `json:"_id"`
	Name                         string      `json:"name"`
	CreatedAt                    time.Time   `json:"created_at"`
	UpdatedAt                    time.Time   `json:"updated_at"`
	Delay                        interface{} `json:"delay"`
	Logo                         string      `json:"logo"`
	Banner                       interface{} `json:"banner"`
	VideoBanner                  string      `json:"video_banner"`
	Background                   interface{} `json:"background"`
	ProfileBanner                string      `json:"profile_banner"`
	ProfileBannerBackgroundColor string      `json:"profile_banner_background_color"`
	URL                          string      `json:"url"`
	Views                        int         `json:"views"`
	Followers                    int         `json:"followers"`
	Links                        Links 				`json:"_links"`
}
type Links struct {
	Self          string `json:"self"`
	Follows       string `json:"follows"`
	Commercial    string `json:"commercial"`
	StreamKey     string `json:"stream_key"`
	Chat          string `json:"chat"`
	Features      string `json:"features"`
	Subscriptions string `json:"subscriptions"`
	Editors       string `json:"editors"`
	Teams         string `json:"teams"`
	Videos        string `json:"videos"`
	}

func main() {
	fmt.Println("Booting the server...")

	response := twitch.DoSomething()
	var users Streams
	err := json.Unmarshal([]byte(response), &users)
	if err != nil {
	    panic(err)
	}
	for i := 0; i < len(users.Streams); i++ {
	fmt.Println("User Type: " + users.Streams[i].Channel.URL)
}

	// Configure a sample route
	// http.HandleFunc("/sample_route", myHandlerFunc)
	// // Run your server
	// http.ListenAndServe(":8080", nil)
}

// myHandlerFunc - A sample handler function for the route /sample_route for your HTTP server
func myHandlerFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Recieved the following request:", r.Body)
	time.Sleep(time.Second * 2)

	response := twitch.DoSomething()
  fmt.Fprintln(w, response)
	// YOUR ROUTES LOGIC GOES HERE
	//
	// Feel free to structure your routing however you see fit, this is just an example to get you started.

}

func extractLinks(){

}
