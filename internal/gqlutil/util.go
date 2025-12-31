package gqlutil

import (
	"encoding/base64"
	"fmt"

	"fijoy.app/ent"
)

func EncodeCursor(id int) ent.Cursor {
	// Ent's default cursor format is just the ID as a string, base64 encoded
	// Format: "Cursor:<value>" or just "<value>" depending on your setup.
	// Standard Ent usually uses generic cursors, but for simple ID sorting:

	s := fmt.Sprintf("%v", id)
	return ent.Cursor{
		Value: base64.StdEncoding.EncodeToString([]byte(s)),
	}
}
