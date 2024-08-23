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

type FijoyAccount struct {
	ID                string                 `sql:"primary_key" json:"ID"`
	ProfileID         string                 `json:"ProfileID"`
	Name              string                 `json:"Name"`
	AccountType       FijoyAccountType       `json:"AccountType"`
	Archived          bool                   `json:"Archived"`
	IncludeInNetWorth bool                   `json:"IncludeInNetWorth"`
	Symbol            string                 `json:"Symbol"`
	SymbolType        FijoyAccountSymbolType `json:"SymbolType"`
	Amount            float64                `json:"Amount"`
	Value             float64                `json:"Value"`
	FxRate            *float64               `json:"FxRate"`
	Balance           float64                `json:"Balance"`
	CreatedAt         time.Time              `json:"CreatedAt"`
	UpdatedAt         time.Time              `json:"UpdatedAt"`
}
