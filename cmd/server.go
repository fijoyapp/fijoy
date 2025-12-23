package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"fijoy.app"
	"fijoy.app/ent"
	"fijoy.app/ent/account"
	"fijoy.app/ent/userhousehold"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/mattn/go-sqlite3"
	"github.com/shopspring/decimal"
)

func main() {
	ctx := context.Background()

	// TODO: Switch to Postgres later
	entClient, err := ent.Open(
		"sqlite3",
		"file:ent?mode=memory&cache=shared&_fk=1",
	)
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}
	defer entClient.Close()

	// Run the auto migration tool.
	if err := entClient.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	if err := seed(ctx, entClient); err != nil {
		log.Fatalf("failed seeding database: %v", err)
	}

	log.Println("migration completed successfully")

	gqlHandler := handler.NewDefaultServer(
		fijoy.NewSchema(entClient),
	)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Handle("/", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", gqlHandler)
	http.ListenAndServe(":3000", r)
}

func seed(ctx context.Context, entClient *ent.Client) error {
	cad := entClient.Currency.Create().SetCode("CAD").SaveX(ctx)
	usd := entClient.Currency.Create().SetCode("USD").SaveX(ctx)

	user := entClient.User.Create().SetEmail("joey@jyu.dev").SaveX(ctx)

	household := entClient.Household.Create().
		SetName("Joey's Household").
		SetCurrency(cad).
		SaveX(ctx)

	entClient.UserHousehold.Create().
		SetUser(user).
		SetHousehold(household).
		SetRole(userhousehold.RoleAdmin).
		SaveX(ctx)

	chase := entClient.Account.Create().
		SetName("Chase Total Checking").
		SetCurrency(usd).
		SetHousehold(household).
		SetType(account.TypeLiquidity).
		SaveX(ctx)

	wealthsimple := entClient.Account.Create().
		SetName("Wealthsimple Chequing").
		SetCurrency(cad).
		SetHousehold(household).
		SetType(account.TypeLiquidity).
		SaveX(ctx)

	t1 := entClient.Transaction.Create().SetDatetime(time.Now()).SaveX(ctx)
	entClient.TransactionEntry.Create().
		SetAccount(chase).
		SetTransaction(t1).SetAmount(decimal.NewFromFloat(100.00)).SaveX(ctx)

	t2 := entClient.Transaction.Create().SetDatetime(time.Now()).SaveX(ctx)
	entClient.TransactionEntry.Create().
		SetAccount(wealthsimple).
		SetTransaction(t2).SetAmount(decimal.NewFromFloat(200.00)).SaveX(ctx)

	t3 := entClient.Transaction.Create().SetDatetime(time.Now()).SaveX(ctx)
	entClient.TransactionEntry.Create().
		SetAccount(chase).
		SetTransaction(t3).SetAmount(decimal.NewFromFloat(-69.00)).SaveX(ctx)

	return nil
}
