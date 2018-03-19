package twitch

import (
    "fmt"
    "net/http"
    "io/ioutil"
    "os"
    )
func init() {
	fmt.Println("Initializing Twitch API...")
}

func DoSomething() string{
	response, err := http.Get("https://api.twitch.tv/kraken/streams?client_id=j35khhm6vul5t4dq971xv8rlwfp9oo")
	fmt.Printf("Response is received ......")
	var contents = ""
	 if err != nil {
			 fmt.Printf("%s", err)
			 os.Exit(1)
	 } else {
			 defer response.Body.Close()
			 contents, err := ioutil.ReadAll(response.Body)
			 if err != nil {
					 fmt.Printf("%s", err)
					 os.Exit(1)
			 }
			 return string(contents)
			 // fmt.Printf("%s\n", string(contents))
		}
    return string(contents)
	}
