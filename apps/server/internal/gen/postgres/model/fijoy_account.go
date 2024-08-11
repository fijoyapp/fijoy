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
	ID          string           `sql:"primary_key" json:"ID"`
	ProfileID   string           `json:"ProfileID"`
	Name        string           `json:"Name"`
	Symbol      *string          `json:"Symbol"`
	AccountType FijoyAccountType `json:"AccountType"`
	Alance      float64          `json:"Alance"`
	Currency    string           `json:"Currency"`
	Active      bool             `json:"Active"`
	CreatedAt   time.Time        `json:"CreatedAt"`
	UpdatedAt   time.Time        `json:"UpdatedAt"`
}
