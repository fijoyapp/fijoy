// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fijoy/ent/account"
	"fijoy/ent/accountsnapshot"
	"fijoy/ent/overallsnapshot"
	"fijoy/ent/profile"
	"fijoy/ent/schema"
	"fijoy/ent/transaction"
	"fijoy/ent/user"
	"time"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	accountFields := schema.Account{}.Fields()
	_ = accountFields
	// accountDescName is the schema descriptor for name field.
	accountDescName := accountFields[1].Descriptor()
	// account.NameValidator is a validator for the "name" field. It is called by the builders before save.
	account.NameValidator = accountDescName.Validators[0].(func(string) error)
	// accountDescArchived is the schema descriptor for archived field.
	accountDescArchived := accountFields[3].Descriptor()
	// account.DefaultArchived holds the default value on creation for the archived field.
	account.DefaultArchived = accountDescArchived.Default.(bool)
	// accountDescIncludeInNetWorth is the schema descriptor for include_in_net_worth field.
	accountDescIncludeInNetWorth := accountFields[4].Descriptor()
	// account.DefaultIncludeInNetWorth holds the default value on creation for the include_in_net_worth field.
	account.DefaultIncludeInNetWorth = accountDescIncludeInNetWorth.Default.(bool)
	// accountDescSymbol is the schema descriptor for symbol field.
	accountDescSymbol := accountFields[5].Descriptor()
	// account.SymbolValidator is a validator for the "symbol" field. It is called by the builders before save.
	account.SymbolValidator = accountDescSymbol.Validators[0].(func(string) error)
	// accountDescCreatedAt is the schema descriptor for created_at field.
	accountDescCreatedAt := accountFields[11].Descriptor()
	// account.DefaultCreatedAt holds the default value on creation for the created_at field.
	account.DefaultCreatedAt = accountDescCreatedAt.Default.(func() time.Time)
	// accountDescUpdatedAt is the schema descriptor for updated_at field.
	accountDescUpdatedAt := accountFields[12].Descriptor()
	// account.DefaultUpdatedAt holds the default value on creation for the updated_at field.
	account.DefaultUpdatedAt = accountDescUpdatedAt.Default.(func() time.Time)
	// accountDescID is the schema descriptor for id field.
	accountDescID := accountFields[0].Descriptor()
	// account.DefaultID holds the default value on creation for the id field.
	account.DefaultID = accountDescID.Default.(func() string)
	accountsnapshotFields := schema.AccountSnapshot{}.Fields()
	_ = accountsnapshotFields
	// accountsnapshotDescID is the schema descriptor for id field.
	accountsnapshotDescID := accountsnapshotFields[0].Descriptor()
	// accountsnapshot.DefaultID holds the default value on creation for the id field.
	accountsnapshot.DefaultID = accountsnapshotDescID.Default.(func() string)
	overallsnapshotFields := schema.OverallSnapshot{}.Fields()
	_ = overallsnapshotFields
	// overallsnapshotDescID is the schema descriptor for id field.
	overallsnapshotDescID := overallsnapshotFields[0].Descriptor()
	// overallsnapshot.DefaultID holds the default value on creation for the id field.
	overallsnapshot.DefaultID = overallsnapshotDescID.Default.(func() string)
	profileFields := schema.Profile{}.Fields()
	_ = profileFields
	// profileDescCreatedAt is the schema descriptor for created_at field.
	profileDescCreatedAt := profileFields[4].Descriptor()
	// profile.DefaultCreatedAt holds the default value on creation for the created_at field.
	profile.DefaultCreatedAt = profileDescCreatedAt.Default.(func() time.Time)
	// profileDescID is the schema descriptor for id field.
	profileDescID := profileFields[0].Descriptor()
	// profile.DefaultID holds the default value on creation for the id field.
	profile.DefaultID = profileDescID.Default.(func() string)
	transactionFields := schema.Transaction{}.Fields()
	_ = transactionFields
	// transactionDescCreatedAt is the schema descriptor for created_at field.
	transactionDescCreatedAt := transactionFields[8].Descriptor()
	// transaction.DefaultCreatedAt holds the default value on creation for the created_at field.
	transaction.DefaultCreatedAt = transactionDescCreatedAt.Default.(func() time.Time)
	// transactionDescUpdatedAt is the schema descriptor for updated_at field.
	transactionDescUpdatedAt := transactionFields[9].Descriptor()
	// transaction.DefaultUpdatedAt holds the default value on creation for the updated_at field.
	transaction.DefaultUpdatedAt = transactionDescUpdatedAt.Default.(func() time.Time)
	// transactionDescID is the schema descriptor for id field.
	transactionDescID := transactionFields[0].Descriptor()
	// transaction.DefaultID holds the default value on creation for the id field.
	transaction.DefaultID = transactionDescID.Default.(func() string)
	userFields := schema.User{}.Fields()
	_ = userFields
	// userDescEmail is the schema descriptor for email field.
	userDescEmail := userFields[1].Descriptor()
	// user.EmailValidator is a validator for the "email" field. It is called by the builders before save.
	user.EmailValidator = userDescEmail.Validators[0].(func(string) error)
	// userDescCreatedAt is the schema descriptor for created_at field.
	userDescCreatedAt := userFields[2].Descriptor()
	// user.DefaultCreatedAt holds the default value on creation for the created_at field.
	user.DefaultCreatedAt = userDescCreatedAt.Default.(func() time.Time)
	// userDescID is the schema descriptor for id field.
	userDescID := userFields[0].Descriptor()
	// user.DefaultID holds the default value on creation for the id field.
	user.DefaultID = userDescID.Default.(func() string)
}
