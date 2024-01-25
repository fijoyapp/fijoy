package main

import (
	. "fijoy/.gen/neondb/public/table"
	"fijoy/config"
	"fmt"

	. "github.com/go-jet/jet/v2/postgres"
)

func main() {
	cfg, err := config.LoadAppConfig()
	if err != nil {
		panic(err)
	}

	fmt.Println(cfg.DB_URL)
}
