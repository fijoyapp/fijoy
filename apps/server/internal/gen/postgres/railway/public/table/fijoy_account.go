//
// Code generated by go-jet DO NOT EDIT.
//
// WARNING: Changes to this file may cause incorrect behavior
// and will be lost if the code is regenerated
//

package table

import (
	"github.com/go-jet/jet/v2/postgres"
)

var FijoyAccount = newFijoyAccountTable("public", "fijoy_account", "")

type fijoyAccountTable struct {
	postgres.Table

	// Columns
	ID          postgres.ColumnString
	Name        postgres.ColumnString
	AccountType postgres.ColumnString
	Balance     postgres.ColumnFloat
	Institution postgres.ColumnString
	WorkspaceID postgres.ColumnString
	Currency    postgres.ColumnString
	UpdatedAt   postgres.ColumnTimestampz

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type FijoyAccountTable struct {
	fijoyAccountTable

	EXCLUDED fijoyAccountTable
}

// AS creates new FijoyAccountTable with assigned alias
func (a FijoyAccountTable) AS(alias string) *FijoyAccountTable {
	return newFijoyAccountTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new FijoyAccountTable with assigned schema name
func (a FijoyAccountTable) FromSchema(schemaName string) *FijoyAccountTable {
	return newFijoyAccountTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new FijoyAccountTable with assigned table prefix
func (a FijoyAccountTable) WithPrefix(prefix string) *FijoyAccountTable {
	return newFijoyAccountTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new FijoyAccountTable with assigned table suffix
func (a FijoyAccountTable) WithSuffix(suffix string) *FijoyAccountTable {
	return newFijoyAccountTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newFijoyAccountTable(schemaName, tableName, alias string) *FijoyAccountTable {
	return &FijoyAccountTable{
		fijoyAccountTable: newFijoyAccountTableImpl(schemaName, tableName, alias),
		EXCLUDED:          newFijoyAccountTableImpl("", "excluded", ""),
	}
}

func newFijoyAccountTableImpl(schemaName, tableName, alias string) fijoyAccountTable {
	var (
		IDColumn          = postgres.StringColumn("id")
		NameColumn        = postgres.StringColumn("name")
		AccountTypeColumn = postgres.StringColumn("account_type")
		BalanceColumn     = postgres.FloatColumn("balance")
		InstitutionColumn = postgres.StringColumn("institution")
		WorkspaceIDColumn = postgres.StringColumn("workspace_id")
		CurrencyColumn    = postgres.StringColumn("currency")
		UpdatedAtColumn   = postgres.TimestampzColumn("updated_at")
		allColumns        = postgres.ColumnList{IDColumn, NameColumn, AccountTypeColumn, BalanceColumn, InstitutionColumn, WorkspaceIDColumn, CurrencyColumn, UpdatedAtColumn}
		mutableColumns    = postgres.ColumnList{NameColumn, AccountTypeColumn, BalanceColumn, InstitutionColumn, WorkspaceIDColumn, CurrencyColumn, UpdatedAtColumn}
	)

	return fijoyAccountTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:          IDColumn,
		Name:        NameColumn,
		AccountType: AccountTypeColumn,
		Balance:     BalanceColumn,
		Institution: InstitutionColumn,
		WorkspaceID: WorkspaceIDColumn,
		Currency:    CurrencyColumn,
		UpdatedAt:   UpdatedAtColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}
