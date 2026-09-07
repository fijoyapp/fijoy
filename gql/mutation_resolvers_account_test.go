package gql

import (
	"context"
	"testing"

	"beavermoney.app/ent/account"
	"beavermoney.app/internal/contextkeys"
)

func TestUnarchiveAccount(t *testing.T) {
	f := setupMemberFixture(t)
	ctx := memberCallCtx(f.client, f.adminUser.ID, f.household.ID)
	acc := f.client.Account.Create().
		SetName("Old savings").SetType(account.TypeLiquidity).
		SetHouseholdID(f.household.ID).SetUserID(f.adminUser.ID).
		SetHouseholdCurrencyID(f.primaryCurrency.ID).SetArchived(true).SaveX(ctx)
	mr := &mutationResolver{Resolver: newMemberTestResolver(f.client)}

	for range 2 {
		restored, err := mr.UnarchiveAccount(ctx, acc.ID)
		if err != nil {
			t.Fatalf("unarchive account: %v", err)
		}
		if restored.Archived || restored.ID != acc.ID || restored.Name != acc.Name ||
			!restored.Balance.Equal(acc.Balance) || !restored.Value.Equal(acc.Value) {
			t.Fatalf("unarchive changed account data or left it archived: %+v", restored)
		}
	}
	if f.client.Account.GetX(ctx, acc.ID).Archived {
		t.Fatal("account is still archived in storage")
	}
}

func TestUnarchiveAccountRejectsOtherHousehold(t *testing.T) {
	f := setupMemberFixture(t)
	otherCtx := memberCallCtx(f.client, f.adminUser.ID, f.otherHousehold.ID)
	acc := f.client.Account.Create().
		SetName("Other household savings").SetType(account.TypeLiquidity).
		SetHouseholdID(f.otherHousehold.ID).SetUserID(f.adminUser.ID).
		SetHouseholdCurrencyID(f.otherCurrency.ID).SetArchived(true).SaveX(otherCtx)
	mr := &mutationResolver{Resolver: newMemberTestResolver(f.client)}
	ctx := memberCallCtx(f.client, f.adminUser.ID, f.household.ID)
	if _, err := mr.UnarchiveAccount(ctx, acc.ID); err == nil {
		t.Fatal("expected household isolation to reject restore")
	}
	if !f.client.Account.GetX(otherCtx, acc.ID).Archived {
		t.Fatal("account in other household was changed")
	}
}

func TestUnarchiveAccountRejectsMissingContextAndAccount(t *testing.T) {
	f := setupMemberFixture(t)
	mr := &mutationResolver{Resolver: newMemberTestResolver(f.client)}
	ctx := memberCallCtx(f.client, f.adminUser.ID, f.household.ID)
	if _, err := mr.UnarchiveAccount(ctx, 999999); err == nil {
		t.Fatal("expected missing account error")
	}
	acc := f.client.Account.Create().
		SetName("Archived").SetType(account.TypeLiquidity).
		SetHouseholdID(f.household.ID).SetUserID(f.adminUser.ID).
		SetHouseholdCurrencyID(f.primaryCurrency.ID).SetArchived(true).SaveX(ctx)
	ctx = context.WithValue(ctx, contextkeys.HouseholdIDKey(), 0)
	if _, err := mr.UnarchiveAccount(ctx, acc.ID); err == nil {
		t.Fatal("expected missing household context error")
	}
}
