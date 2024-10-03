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

var FijoyOverallSnapshot = newFijoyOverallSnapshotTable("public", "fijoy_overall_snapshot", "")

type fijoyOverallSnapshotTable struct {
	postgres.Table

	// Columns
	ID         postgres.ColumnString
	ProfileID  postgres.ColumnString
	Datehour   postgres.ColumnTimestampz
	Liquidity  postgres.ColumnFloat
	Investment postgres.ColumnFloat
	Property   postgres.ColumnFloat
	Receivable postgres.ColumnFloat
	Liability  postgres.ColumnFloat

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type FijoyOverallSnapshotTable struct {
	fijoyOverallSnapshotTable

	EXCLUDED fijoyOverallSnapshotTable
}

// AS creates new FijoyOverallSnapshotTable with assigned alias
func (a FijoyOverallSnapshotTable) AS(alias string) *FijoyOverallSnapshotTable {
	return newFijoyOverallSnapshotTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new FijoyOverallSnapshotTable with assigned schema name
func (a FijoyOverallSnapshotTable) FromSchema(schemaName string) *FijoyOverallSnapshotTable {
	return newFijoyOverallSnapshotTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new FijoyOverallSnapshotTable with assigned table prefix
func (a FijoyOverallSnapshotTable) WithPrefix(prefix string) *FijoyOverallSnapshotTable {
	return newFijoyOverallSnapshotTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new FijoyOverallSnapshotTable with assigned table suffix
func (a FijoyOverallSnapshotTable) WithSuffix(suffix string) *FijoyOverallSnapshotTable {
	return newFijoyOverallSnapshotTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newFijoyOverallSnapshotTable(schemaName, tableName, alias string) *FijoyOverallSnapshotTable {
	return &FijoyOverallSnapshotTable{
		fijoyOverallSnapshotTable: newFijoyOverallSnapshotTableImpl(schemaName, tableName, alias),
		EXCLUDED:                  newFijoyOverallSnapshotTableImpl("", "excluded", ""),
	}
}

func newFijoyOverallSnapshotTableImpl(schemaName, tableName, alias string) fijoyOverallSnapshotTable {
	var (
		IDColumn         = postgres.StringColumn("id")
		ProfileIDColumn  = postgres.StringColumn("profile_id")
		DatehourColumn   = postgres.TimestampzColumn("datehour")
		LiquidityColumn  = postgres.FloatColumn("liquidity")
		InvestmentColumn = postgres.FloatColumn("investment")
		PropertyColumn   = postgres.FloatColumn("property")
		ReceivableColumn = postgres.FloatColumn("receivable")
		LiabilityColumn  = postgres.FloatColumn("liability")
		allColumns       = postgres.ColumnList{IDColumn, ProfileIDColumn, DatehourColumn, LiquidityColumn, InvestmentColumn, PropertyColumn, ReceivableColumn, LiabilityColumn}
		mutableColumns   = postgres.ColumnList{ProfileIDColumn, DatehourColumn, LiquidityColumn, InvestmentColumn, PropertyColumn, ReceivableColumn, LiabilityColumn}
	)

	return fijoyOverallSnapshotTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:         IDColumn,
		ProfileID:  ProfileIDColumn,
		Datehour:   DatehourColumn,
		Liquidity:  LiquidityColumn,
		Investment: InvestmentColumn,
		Property:   PropertyColumn,
		Receivable: ReceivableColumn,
		Liability:  LiabilityColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}