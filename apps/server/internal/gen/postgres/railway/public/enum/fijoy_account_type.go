//
// Code generated by go-jet DO NOT EDIT.
//
// WARNING: Changes to this file may cause incorrect behavior
// and will be lost if the code is regenerated
//

package enum

import "github.com/go-jet/jet/v2/postgres"

var FijoyAccountType = &struct {
	Cash       postgres.StringExpression
	Debt       postgres.StringExpression
	Investment postgres.StringExpression
	OtherAsset postgres.StringExpression
}{
	Cash:       postgres.NewEnumValue("cash"),
	Debt:       postgres.NewEnumValue("debt"),
	Investment: postgres.NewEnumValue("investment"),
	OtherAsset: postgres.NewEnumValue("other_asset"),
}
