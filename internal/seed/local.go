package seed

import (
	"context"
	"math/rand"
	"time"

	"beavermoney.app/ent"
	"beavermoney.app/ent/account"
	"beavermoney.app/ent/currency"
	"beavermoney.app/ent/investment"
	"beavermoney.app/ent/transactioncategory"
	"beavermoney.app/ent/user"
	"beavermoney.app/ent/userhousehold"
	"beavermoney.app/internal/contextkeys"
	"beavermoney.app/internal/fxrate"
	"beavermoney.app/internal/market"
	"github.com/shopspring/decimal"
)

// Seed populates the database with test data for development.
func Seed(
	ctx context.Context,
	entClient *ent.Client,
	fxrateClient *fxrate.Client,
	marketClient *market.Client,
) error {
	alreadySeeded := entClient.User.Query().
		Where(user.EmailEQ("joey@beavermoney.app")).
		ExistX(contextkeys.NewPrivacyBypassContext(ctx))
	if alreadySeeded {
		return nil
	}

	cad := entClient.Currency.Query().Where(currency.CodeEQ("CAD")).OnlyX(ctx)
	entClient.Currency.Query().Where(currency.CodeEQ("CNY")).OnlyX(ctx)
	usd := entClient.Currency.Query().Where(currency.CodeEQ("USD")).OnlyX(ctx)

	usdToCadRate, err := fxrateClient.GetRate(ctx, "USD", "CAD", time.Now())
	if err != nil {
		panic(err)
	}

	joey := entClient.User.Create().
		SetEmail("joey@beavermoney.app").
		SetName("Joey").
		SaveX(ctx)

	household := entClient.Household.Create().
		SetName("Joey's Household").
		SetCurrency(cad).
		SetLocale("en-CA").
		SaveX(ctx)

	household2 := entClient.Household.Create().
		SetName("Acme Corp").
		SetCurrency(cad).
		SetLocale("en-CA").
		SaveX(ctx)

	ctx = context.WithValue(ctx, contextkeys.HouseholdIDKey(), household.ID)

	entClient.UserHousehold.Create().
		SetUser(joey).
		SetHousehold(household).
		SetRole(userhousehold.RoleAdmin).
		SaveX(ctx)

	ctx = context.WithValue(ctx, contextkeys.HouseholdIDKey(), household2.ID)

	entClient.UserHousehold.Create().
		SetUser(joey).
		SetHousehold(household2).
		SetRole(userhousehold.RoleAdmin).
		SaveX(ctx)

	differentJoey := entClient.User.Create().
		SetEmail("joey@jyu.dev").
		SetName("Different Joey").
		SaveX(ctx)

	differentHousehold := entClient.Household.Create().
		SetName("Different Joey's Household").
		SetCurrency(cad).
		SetLocale("en-CA").
		SaveX(ctx)

	differentCtx := context.WithValue(
		ctx,
		contextkeys.HouseholdIDKey(),
		differentHousehold.ID,
	)

	entClient.UserHousehold.Create().
		SetUser(differentJoey).
		SetHousehold(differentHousehold).
		SetRole(userhousehold.RoleAdmin).
		SaveX(differentCtx)

	entClient.UserHousehold.Create().
		SetUser(differentJoey).
		SetHousehold(household).
		SetRole(userhousehold.RoleMember).
		SaveX(ctx)

	entClient.Account.Create().
		SetName("You should not see this account").
		SetCurrency(usd).
		SetFxRate(usdToCadRate).
		SetUser(differentJoey).
		SetHousehold(differentHousehold).
		SetType(account.TypeLiquidity).
		SaveX(differentCtx)

	chase := entClient.Account.Create().
		SetName("Chase Total Checking").
		SetCurrency(usd).
		SetFxRate(usdToCadRate).
		SetIcon("chase.com").
		SetUser(joey).
		SetHousehold(household).
		SetType(account.TypeLiquidity).
		SaveX(ctx)

	wealthsimple := entClient.Account.Create().
		SetName("Wealthsimple Visa Infinite").
		SetUser(joey).
		SetIcon("wealthsimple.com").
		SetFxRate(decimal.NewFromInt(1)).
		SetCurrency(cad).
		SetHousehold(household).
		SetType(account.TypeLiability).
		SaveX(ctx)

	webull := entClient.Account.Create().
		SetHousehold(household).
		SetFxRate(decimal.NewFromInt(1)).
		SetIcon("webull.ca").
		SetName("Webull").
		SetUser(joey).
		SetCurrency(cad).
		SetType(account.TypeInvestment).
		SaveX(ctx)

	restaurant := entClient.TransactionCategory.Create().
		SetName("Restaurant").
		SetHousehold(household).
		SetIcon("soup").
		SetType(transactioncategory.TypeExpense).
		SaveX(ctx)

	grocery := entClient.TransactionCategory.Create().
		SetName("Grocery").
		SetHousehold(household).
		SetIcon("apple").
		SetType(transactioncategory.TypeExpense).
		SaveX(ctx)

	buyCategory := entClient.TransactionCategory.Create().
		SetName("Buy").
		SetHousehold(household).
		SetIcon("banknote-arrow-down").
		SetType(transactioncategory.TypeInvestment).
		SetIsImmutable(true).
		SaveX(ctx)

	_ = entClient.TransactionCategory.Create().
		SetName("Sell").
		SetHousehold(household).
		SetIcon("banknote-arrow-up").
		SetType(transactioncategory.TypeInvestment).
		SetIsImmutable(true).
		SaveX(ctx)

	_ = entClient.TransactionCategory.Create().
		SetName("Move").
		SetHousehold(household).
		SetIcon("arrow-left-right").
		SetType(transactioncategory.TypeInvestment).
		SetIsImmutable(true).
		SaveX(ctx)

	_ = entClient.TransactionCategory.Create().
		SetName("Credit Card Bill").
		SetIcon("credit-card").
		SetHousehold(household).
		SetType(transactioncategory.TypeTransfer).
		SetIsImmutable(true).
		SaveX(ctx)

	salary := entClient.TransactionCategory.Create().
		SetName("Salary").
		SetHousehold(household).
		SetIcon("hand-coins").
		SetType(transactioncategory.TypeIncome).
		SaveX(ctx)

	{
		transaction := entClient.Transaction.Create().
			SetUser(joey).
			SetHousehold(household).
			SetCategory(salary).
			SetDatetime(genRandomDatetime()).SaveX(ctx)
		entClient.TransactionEntry.Create().
			SetAccount(chase).
			SetHousehold(household).
			SetTransaction(transaction).
			SetCurrency(usd).
			SetAmount(decimal.NewFromInt(1000000)).SaveX(ctx)
	}

	{
		const n = 1000
		txCreates := make([]*ent.TransactionCreate, n)
		for i := range txCreates {
			txCreates[i] = entClient.Transaction.Create().
				SetUser(joey).
				SetHousehold(household).
				SetCategory(restaurant).
				SetDatetime(genRandomDatetime())
		}
		transactions := entClient.Transaction.CreateBulk(txCreates...).
			SaveX(ctx)

		txEntryCreates := make([]*ent.TransactionEntryCreate, n)
		for i, t := range transactions {
			txEntryCreates[i] = entClient.TransactionEntry.Create().
				SetAccount(chase).
				SetHousehold(household).
				SetTransaction(t).
				SetCurrency(usd).
				SetAmount(genRandomAmount().Mul(decimal.NewFromInt(-1)))
		}
		entClient.TransactionEntry.CreateBulk(txEntryCreates...).SaveX(ctx)
	}

	{
		const n = 1000
		txCreates := make([]*ent.TransactionCreate, n)
		for i := range txCreates {
			txCreates[i] = entClient.Transaction.Create().
				SetUser(joey).
				SetHousehold(household).
				SetCategory(grocery).
				SetDatetime(genRandomDatetime())
		}
		transactions := entClient.Transaction.CreateBulk(txCreates...).
			SaveX(ctx)

		txEntryCreates := make([]*ent.TransactionEntryCreate, n)
		for i, t := range transactions {
			txEntryCreates[i] = entClient.TransactionEntry.Create().
				SetAccount(wealthsimple).
				SetHousehold(household).
				SetTransaction(t).
				SetCurrency(cad).
				SetAmount(genRandomAmount().Mul(decimal.NewFromInt(-1)))
		}
		entClient.TransactionEntry.CreateBulk(txEntryCreates...).SaveX(ctx)
	}

	xeqtQuote, err := marketClient.StockQuote(ctx, "XEQT.TO")
	if err != nil {
		panic(err)
	}

	xeqt := entClient.Investment.Create().
		SetHousehold(household).
		SetSymbol("XEQT.TO").
		SetName("XEQT").
		SetQuote(xeqtQuote.CurrentPrice).
		SetCurrency(cad).
		SetType(investment.TypeStock).
		SetAccount(webull).
		SaveX(ctx)

	{
		transaction := entClient.Transaction.Create().
			SetUser(joey).
			SetHousehold(household).
			SetCategory(buyCategory).
			SetDatetime(genRandomDatetime()).SaveX(ctx)

		entClient.InvestmentLot.Create().
			SetInvestment(xeqt).
			SetTransaction(transaction).
			SetHousehold(household).
			SetAmount(decimal.NewFromInt(100)).
			SetPrice(decimal.NewFromFloat(25.50)).
			SaveX(ctx)
	}

	{
		transaction := entClient.Transaction.Create().
			SetUser(joey).
			SetHousehold(household).
			SetCategory(buyCategory).
			SetDatetime(genRandomDatetime()).SaveX(ctx)
		entClient.InvestmentLot.Create().
			SetInvestment(xeqt).
			SetTransaction(transaction).
			SetHousehold(household).
			SetAmount(decimal.NewFromInt(50)).
			SetPrice(decimal.NewFromFloat(27.75)).
			SaveX(ctx)
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
