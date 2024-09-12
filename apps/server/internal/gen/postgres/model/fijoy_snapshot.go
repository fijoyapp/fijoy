//
// Code generated by go-jet DO NOT EDIT.
//
// WARNING: Changes to this file may cause incorrect behavior
// and will be lost if the code is regenerated
//

package model

import (
	"time"
)

type FijoySnapshot struct {
	ID         string    `sql:"primary_key" json:"ID"`
	ProfileID  string    `json:"ProfileID"`
	Date       time.Time `json:"Date"`
	Liquidity  float64   `json:"Liquidity"`
	Investment float64   `json:"Investment"`
	Property   float64   `json:"Property"`
	Receivable float64   `json:"Receivable"`
	Liability  float64   `json:"Liability"`
}