package main

import (
	"fijoy/config"
	"fmt"
)

func main() {
	cfg, err := config.LoadAppConfig()
	if err != nil {
		panic(err)
	}

	fmt.Println(cfg.DB_URL)
}
