package main

import (
	"context"
	"database/sql"
	"log"
	"math/rand"
	"net/http"
	"time"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	"fijoy.app"
	"fijoy.app/ent"
	"fijoy.app/ent/account"
	"fijoy.app/ent/user"
	"fijoy.app/ent/userhousehold"
	"fijoy.app/internal/fxrate"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"

	_ "github.com/lib/pq"
	"github.com/shopspring/decimal"
)

func main() {
	ctx := context.Background()

	db, err := sql.Open(
		"postgres",
		"postgres://localhost:5432/database?sslmode=enable",
	)
	if err != nil {
		panic(err)
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		panic(err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file:///ent/migrate/migrations",
		"postgres", driver)
	if err != nil {
		panic(err)
	}
	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Fatalf("migration failed: %v", err)
		panic(err)
	}

	log.Println("migration completed successfully")

	drv := entsql.OpenDB(dialect.Postgres, db)
	entClient := ent.NewClient(ent.Driver(drv))
	defer entClient.Close()

	fxrateProvider := fxrate.NewFrankfurterProvider()
	fxrateClient := fxrate.NewClient(fxrateProvider)

	if err := seed(ctx, entClient); err != nil {
		log.Fatalf("failed seeding database: %v", err)
	}

	gqlHandler := handler.NewDefaultServer(
		fijoy.NewSchema(entClient, fxrateClient),
	)

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			// TODO: DO NOT HARDCODE
			"http://localhost:5173",
		}, // Use this to allow specific origin hosts
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{
			"Accept",
			"Authorization",
			"Content-Type",
			"X-CSRF-Token",
			"sentry-trace",
			"baggage",
		},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
		Debug:            false,
	}))

	r.Use(middleware.Logger)
	r.Handle("/", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", gqlHandler)
	http.ListenAndServe(":3000", r)
}

func seed(ctx context.Context, entClient *ent.Client) error {
	alreadySeeded := entClient.User.Query().
		Where(user.EmailEQ("joey@jyu.dev")).
		ExistX(ctx)
	if alreadySeeded {
		return nil
	}

	cad := entClient.Currency.Create().SetCode("CAD").SaveX(ctx)
	usd := entClient.Currency.Create().SetCode("USD").SaveX(ctx)

	user := entClient.User.Create().SetEmail("joey@jyu.dev").SaveX(ctx)

	household := entClient.Household.Create().
		SetName("Joey's Household").
		SetCurrency(cad).
		SetLocale("en-CA").
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
				SetCurrency(usd).
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
				SetCurrency(cad).
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
