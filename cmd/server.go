package main

import (
	"context"
	"log"
	"math/rand"
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

	_ "github.com/lib/pq"
	"github.com/shopspring/decimal"
)

func main() {
	ctx := context.Background()

	entClient, err := ent.Open(
		"postgres",
		"postgresql://user:password@localhost:2345/fijoy?sslmode=disable",
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

	{
		const n = 10000
		txCreates := make([]*ent.TransactionCreate, n)
		for i := range txCreates {
			txCreates[i] = entClient.Transaction.Create().
				SetDatetime(genRandomDatetime())
		}
		transactions := entClient.Transaction.CreateBulk(txCreates...).
			SaveX(ctx)

		txEntryCreates := make([]*ent.TransactionEntryCreate, n)
		for i, t := range transactions {
			txEntryCreates[i] = entClient.TransactionEntry.Create().
				SetAccount(chase).
				SetTransaction(t).
				SetAmount(genRandomAmount())
		}
		entClient.TransactionEntry.CreateBulk(txEntryCreates...).SaveX(ctx)
	}

	{
		const n = 10000
		txCreates := make([]*ent.TransactionCreate, n)
		for i := range txCreates {
			txCreates[i] = entClient.Transaction.Create().
				SetDatetime(genRandomDatetime())
		}
		transactions := entClient.Transaction.CreateBulk(txCreates...).
			SaveX(ctx)

		txEntryCreates := make([]*ent.TransactionEntryCreate, n)
		for i, t := range transactions {
			txEntryCreates[i] = entClient.TransactionEntry.Create().
				SetAccount(wealthsimple).
				SetTransaction(t).
				SetAmount(genRandomAmount())
		}
		entClient.TransactionEntry.CreateBulk(txEntryCreates...).SaveX(ctx)
	}

	return nil
}

func genRandomAmount() decimal.Decimal {
	minInt := 0
	maxInt := 10000
	randomInt := rand.Intn(maxInt-minInt) + minInt

	return decimal.NewFromInt(int64(randomInt)).Div(decimal.NewFromInt(100))
}

func genRandomDatetime() time.Time {
	return time.Now().Add(time.Duration(-rand.Intn(365*24)) * time.Hour).UTC()
}
