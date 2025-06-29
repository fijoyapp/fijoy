package fijoy

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.76

import (
	"context"
	"errors"
	"fijoy/ent"
	"fijoy/ent/account"
	"fijoy/ent/profile"
	"fijoy/ent/user"
	"fijoy/internal/util/auth"
	"fijoy/internal/util/currency"
	"fijoy/internal/util/pointer"
	"fmt"
	"strings"
	"time"

	"github.com/samber/lo"
	"github.com/shopspring/decimal"
)

// CreateProfile is the resolver for the createProfile field.
func (r *mutationResolver) CreateProfile(ctx context.Context, input ent.CreateProfileInput) (*ent.Profile, error) {
	client := ent.FromContext(ctx)
	userData, err := auth.GetUserDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	currencies := strings.Split(input.Currencies, ",")

	allExist := lo.EveryBy(currencies, func(code string) bool {
		return currency.IsValidCurrency(code)
	})
	if !allExist {
		return nil, fmt.Errorf("invalid currencies: %s", input.Currencies)
	}

	defaultCurrency := currency.GetPrimaryCurrency(input.Currencies)

	profile, err := client.Profile.Create().
		SetCurrencies(input.Currencies).
		SetNetWorthGoal(input.NetWorthGoal).
		SetLocale(defaultCurrency.Locale).
		SetUserID(userData.UserId).
		Save(ctx)

	_, tokenString, _ := r.authConfig.JWT_AUTH.Encode(
		map[string]any{
			"user_id":    userData.UserId,
			"profile_id": profile.ID,
		},
	)

	auth.SetJwtCookie(ctx, tokenString)

	return profile, err
}

// UpdateProfile is the resolver for the updateProfile field.
func (r *mutationResolver) UpdateProfile(ctx context.Context, id string, input ent.UpdateProfileInput) (*ent.Profile, error) {
	client := ent.FromContext(ctx)
	userData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	if userData.ProfileId != id {
		return nil, errors.New("unauthorized to update this profile")
	}

	profile, err := client.Profile.UpdateOneID(id).SetInput(input).Save(ctx)
	if err != nil {
		return nil, err
	}
	return profile, nil
}

// CreateAccount is the resolver for the createAccount field.
func (r *mutationResolver) CreateAccount(ctx context.Context, input ent.CreateAccountInput) (*ent.Account, error) {
	client := ent.FromContext(ctx)
	userData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	profile, err := client.Profile.Query().Where(profile.ID(userData.ProfileId)).Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("profile not found: %w", err)
	}

	primaryCurrency := currency.GetPrimaryCurrency(profile.Currencies)

	var value decimal.Decimal
	var fxRate decimal.Decimal
	var currencySymbol string

	switch input.AccountType {
	case account.AccountTypeInvestment:
		assetInfo, err := r.marketDataClient.GetAssetInfo(ctx, input.Ticker)
		if err != nil {
			return nil, fmt.Errorf("failed to get asset info: %w", err)
		}
		// currencySymbol
		currencySymbol = assetInfo.Currency
		// value
		value = assetInfo.CurrentPrice
		// fxRate
		marketFxRate, err := r.marketDataClient.GetFxRate(ctx, assetInfo.Currency, primaryCurrency.Code)
		if err != nil {
			return nil, fmt.Errorf("failed to get fx rate: %w", err)
		}
		fxRate = marketFxRate.Rate
	case account.AccountTypeLiquidity, account.AccountTypeLiability, account.AccountTypeProperty, account.AccountTypeReceivable:
		// currencySymbol
		currencySymbol = input.CurrencySymbol
		// value
		value = decimal.NewFromInt(1)
		// fxRate
		if primaryCurrency.Code == input.CurrencySymbol {
			fxRate = decimal.NewFromInt(1)
		} else {
			marketFxRate, err := r.marketDataClient.GetFxRate(ctx, input.CurrencySymbol, primaryCurrency.Code)
			if err != nil {
				return nil, fmt.Errorf("failed to get fx rate: %w", err)
			}
			fxRate = marketFxRate.Rate
		}
	default:
		return nil, errors.New("invalid account type")
	}

	account, err := client.Account.Create().
		SetName(input.Name).
		SetAccountType(input.AccountType).
		SetTicker(input.Ticker).
		SetTickerType(input.TickerType).
		SetCurrencySymbol(currencySymbol).
		SetAmount(decimal.NewFromInt(0)).
		SetProfileID(userData.ProfileId).
		SetValue(value).
		SetFxRate(fxRate).
		SetBalance(decimal.NewFromInt(0)).
		Save(ctx)
	if err != nil {
		return nil, err
	}

	createTransactionInput := CreateTransactionWithTransactionEntriesInput{
		Note: pointer.To("Initial account setup"),
		TransactionEntries: []*ent.CreateTransactionEntryInput{{
			Amount:    input.Amount,
			AccountID: account.ID,
		}},
		Datetime: &time.Time{},
	}
	_, err = r.CreateTransactionWithTransactionEntries(ctx, createTransactionInput)
	if err != nil {
		return nil, err
	}

	return account, err
}

// CreateTransactionWithTransactionEntries is the resolver for the createTransactionWithTransactionEntries field.
func (r *mutationResolver) CreateTransactionWithTransactionEntries(ctx context.Context, input CreateTransactionWithTransactionEntriesInput) (*ent.Transaction, error) {
	client := ent.FromContext(ctx)
	userData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	balance := decimal.NewFromInt(0)

	transaction, err := client.Transaction.Create().SetProfileID(userData.ProfileId).SetBalance(balance).SetNote(*input.Note).Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create transaction: %w", err)
	}

	for _, entry := range input.TransactionEntries {
		input := ent.CreateTransactionEntryInput{
			TransactionID: transaction.ID,
			AccountID:     entry.AccountID,
			Amount:        entry.Amount,
		}
		transactionEntry, err := r.CreateTransactionEntry(ctx, input)
		if err != nil {
			return nil, fmt.Errorf("failed to create transaction entry: %w", err)
		}

		balance = balance.Add(transactionEntry.Balance)
	}

	transaction, err = transaction.Update().SetBalance(balance).Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to update transaction balance: %w", err)
	}

	return transaction, nil
}

// CreateTransactionEntry is the resolver for the createTransactionEntry field.
func (r *mutationResolver) CreateTransactionEntry(ctx context.Context, input ent.CreateTransactionEntryInput) (*ent.TransactionEntry, error) {
	client := ent.FromContext(ctx)
	userData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	account, err := client.Account.Query().Where(account.ID(input.AccountID), account.HasProfileWith(profile.ID(userData.ProfileId))).Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("account not found: %w", err)
	}

	balance := account.FxRate.Mul(account.Value).Mul(input.Amount)

	transactionEntry, err := client.TransactionEntry.Create().
		SetInput(input).
		SetValue(account.Value).
		SetFxRate(account.FxRate).
		SetBalance(balance).
		Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create transaction: %w", err)
	}

	_, err = account.Update().AddAmount(input.Amount).AddBalance(balance).Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to update account balance: %w", err)
	}

	return transactionEntry, nil
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context) (*ent.User, error) {
	authData, err := auth.GetUserDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	return r.client.User.Query().Where(user.ID(authData.UserId)).Only(ctx)
}

// Currencies is the resolver for the currencies field.
func (r *queryResolver) Currencies(ctx context.Context) ([]*Currency, error) {
	currencies := lo.Map(lo.Values(currency.Currencies),
		func(currency currency.Currency, _ int) *Currency {
			return &Currency{
				Code: currency.Code, Locale: currency.Locale,
			}
		})

	return currencies, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
