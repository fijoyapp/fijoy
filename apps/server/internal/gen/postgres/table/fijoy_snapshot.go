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

var FijoySnapshot = newFijoySnapshotTable("public", "fijoy_snapshot", "")

type fijoySnapshotTable struct {
	postgres.Table

	// Columns
	ID         postgres.ColumnString
	ProfileID  postgres.ColumnString
	Date       postgres.ColumnDate
	Liquidity  postgres.ColumnFloat
	Investment postgres.ColumnFloat
	Property   postgres.ColumnFloat
	Receivable postgres.ColumnFloat
	Liability  postgres.ColumnFloat

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type FijoySnapshotTable struct {
	fijoySnapshotTable

	EXCLUDED fijoySnapshotTable
}

// AS creates new FijoySnapshotTable with assigned alias
func (a FijoySnapshotTable) AS(alias string) *FijoySnapshotTable {
	return newFijoySnapshotTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new FijoySnapshotTable with assigned schema name
func (a FijoySnapshotTable) FromSchema(schemaName string) *FijoySnapshotTable {
	return newFijoySnapshotTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new FijoySnapshotTable with assigned table prefix
func (a FijoySnapshotTable) WithPrefix(prefix string) *FijoySnapshotTable {
	return newFijoySnapshotTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new FijoySnapshotTable with assigned table suffix
func (a FijoySnapshotTable) WithSuffix(suffix string) *FijoySnapshotTable {
	return newFijoySnapshotTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newFijoySnapshotTable(schemaName, tableName, alias string) *FijoySnapshotTable {
	return &FijoySnapshotTable{
		fijoySnapshotTable: newFijoySnapshotTableImpl(schemaName, tableName, alias),
		EXCLUDED:           newFijoySnapshotTableImpl("", "excluded", ""),
	}
}

func newFijoySnapshotTableImpl(schemaName, tableName, alias string) fijoySnapshotTable {
	var (
		IDColumn         = postgres.StringColumn("id")
		ProfileIDColumn  = postgres.StringColumn("profile_id")
		DateColumn       = postgres.DateColumn("date")
		LiquidityColumn  = postgres.FloatColumn("liquidity")
		InvestmentColumn = postgres.FloatColumn("investment")
		PropertyColumn   = postgres.FloatColumn("property")
		ReceivableColumn = postgres.FloatColumn("receivable")
		LiabilityColumn  = postgres.FloatColumn("liability")
		allColumns       = postgres.ColumnList{IDColumn, ProfileIDColumn, DateColumn, LiquidityColumn, InvestmentColumn, PropertyColumn, ReceivableColumn, LiabilityColumn}
		mutableColumns   = postgres.ColumnList{ProfileIDColumn, DateColumn, LiquidityColumn, InvestmentColumn, PropertyColumn, ReceivableColumn, LiabilityColumn}
	)

	return fijoySnapshotTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:         IDColumn,
		ProfileID:  ProfileIDColumn,
		Date:       DateColumn,
		Liquidity:  LiquidityColumn,
		Investment: InvestmentColumn,
		Property:   PropertyColumn,
		Receivable: ReceivableColumn,
		Liability:  LiabilityColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}
