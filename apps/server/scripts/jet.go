package main

import (
	"fijoy/config"
	"fmt"

	_ "github.com/lib/pq"

	"github.com/go-jet/jet/v2/generator/metadata"
	"github.com/go-jet/jet/v2/generator/postgres"
	"github.com/go-jet/jet/v2/generator/template"
	postgres2 "github.com/go-jet/jet/v2/postgres"
	"github.com/serenize/snaker"
)

func main() {
	cfg, err := config.LoadAppConfig()
	if err != nil {
		panic(err)
	}

	err = postgres.GenerateDSN(
		cfg.DB_URL,
		"public",
		"./.gen",
		template.Default(postgres2.Dialect).
			UseSchema(func(schemaMetaData metadata.Schema) template.Schema {
				return template.DefaultSchema(schemaMetaData).
					UseModel(template.DefaultModel().
						UseTable(func(table metadata.Table) template.TableModel {
							return template.DefaultTableModel(table).
								UseField(func(columnMetaData metadata.Column) template.TableModelField {
									defaultTableModelField := template.DefaultTableModelField(columnMetaData)
									return defaultTableModelField.UseTags(
										fmt.Sprintf(`json:"%s"`, snaker.SnakeToCamel(columnMetaData.Name)),
									)
								})
						}).
						UseView(func(table metadata.Table) template.ViewModel {
							return template.DefaultViewModel(table).
								UseField(func(columnMetaData metadata.Column) template.TableModelField {
									defaultTableModelField := template.DefaultTableModelField(columnMetaData)
									return defaultTableModelField
								})
						}),
					)
			}),
	)
	if err != nil {
		fmt.Println(err)
	}
}
