package convert

import (
	"fijoy/ent"
	"fijoy/ent/account"

	fijoyv1 "fijoy/proto/fijoy/v1"

	"google.golang.org/protobuf/types/known/timestamppb"
)

func AccountModelToProto(account *ent.Account) *fijoyv1.Account {
	return &fijoyv1.Account{
		Id:          account.ID,
		Name:        account.Name,
		AccountType: AccountTypeModelToProto(account.AccountType),

		Archived: account.Archived,

		Symbol:     account.Symbol,
		SymbolType: AccountSymbolTypeModelToProto(account.SymbolType),

		Amount:  account.Amount.String(),
		Value:   account.Value.String(),
		FxRate:  account.FxRate.String(),
		Balance: account.Balance.String(),

		CreatedAt: timestamppb.New(account.CreatedAt),
		UpdatedAt: timestamppb.New(account.UpdatedAt),
	}
}

func AccountsModelToProto(accounts []*ent.Account) *fijoyv1.AccountList {
	protoAccounts := make([]*fijoyv1.Account, len(accounts))
	for i, account := range accounts {
		protoAccounts[i] = AccountModelToProto(account)
	}
	return &fijoyv1.AccountList{
		Items: protoAccounts,
	}
}

func AccountTypeModelToProto(accountType account.AccountType) fijoyv1.AccountType {
	switch accountType {
	case account.AccountTypeLiquidity:
		return fijoyv1.AccountType_ACCOUNT_TYPE_LIQUIDITY
	case account.AccountTypeInvestment:
		return fijoyv1.AccountType_ACCOUNT_TYPE_INVESTMENT
	case account.AccountTypeProperty:
		return fijoyv1.AccountType_ACCOUNT_TYPE_PROPERTY
	case account.AccountTypeReceivable:
		return fijoyv1.AccountType_ACCOUNT_TYPE_RECEIVABLE
	case account.AccountTypeLiability:
		return fijoyv1.AccountType_ACCOUNT_TYPE_LIABILITY
	default:
		panic("unknown account type")
	}
}

func AccountSymbolTypeModelToProto(accountSymbolType account.SymbolType) fijoyv1.AccountSymbolType {
	switch accountSymbolType {
	case account.SymbolTypeCurrency:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CURRENCY
	case account.SymbolTypeCrypto:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CRYPTO
	case account.SymbolTypeStock:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_STOCK
	default:
		panic("unknown account symbol type")
	}
}
