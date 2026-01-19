package seed

import (
	"context"

	"beavermoney.app/ent"
	"beavermoney.app/ent/transactioncategory"
)

// DefaultCategory extends CreateTransactionCategoryInput with IsImmutable flag.
type DefaultCategory struct {
	ent.CreateTransactionCategoryInput
	IsImmutable bool
}

// DefaultCategories is the list of categories that should be created for every new household.
var DefaultCategories = []DefaultCategory{
	// Expense categories
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Restaurant",
			Icon: "soup",
			Type: transactioncategory.TypeExpense,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Grocery",
			Icon: "apple",
			Type: transactioncategory.TypeExpense,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Transportation",
			Icon: "car",
			Type: transactioncategory.TypeExpense,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Telecommunication",
			Icon: "monitor-smartphone",
			Type: transactioncategory.TypeExpense,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Donation",
			Icon: "heart",
			Type: transactioncategory.TypeExpense,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Subscription",
			Icon: "app-window-mac",
			Type: transactioncategory.TypeExpense,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Learning",
			Icon: "book",
			Type: transactioncategory.TypeExpense,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Travel",
			Icon: "plane-takeoff",
			Type: transactioncategory.TypeExpense,
		},
	},

	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Living",
			Icon: "house",
			Type: transactioncategory.TypeExpense,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Gift",
			Icon: "gift",
			Type: transactioncategory.TypeExpense,
		},
	},
	// Investment categories (immutable)
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Buy",
			Icon: "banknote-arrow-down",
			Type: transactioncategory.TypeInvestment,
		},
		IsImmutable: true,
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Sell",
			Icon: "banknote-arrow-up",
			Type: transactioncategory.TypeInvestment,
		},
		IsImmutable: true,
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Move",
			Icon: "arrow-left-right",
			Type: transactioncategory.TypeInvestment,
		},
		IsImmutable: true,
	},
	// Transfer categories (immutable)
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Credit Card Bill",
			Icon: "credit-card",
			Type: transactioncategory.TypeTransfer,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Money Transfer",
			Icon: "arrow-left-right",
			Type: transactioncategory.TypeTransfer,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Foreign Exchange",
			Icon: "globe",
			Type: transactioncategory.TypeTransfer,
		},
	},
	// Income categories
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Salary",
			Icon: "briefcase-business",
			Type: transactioncategory.TypeIncome,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Government",
			Icon: "landmark",
			Type: transactioncategory.TypeIncome,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Churn",
			Icon: "coins",
			Type: transactioncategory.TypeIncome,
		},
	},
	{
		CreateTransactionCategoryInput: ent.CreateTransactionCategoryInput{
			Name: "Setup",
			Icon: "wrench",
			Type: transactioncategory.TypeSetup,
		},
		IsImmutable: true,
	},
}

// SeedHouseholdCategories creates default transaction categories for a household.
// This should be called when a new household is created.
func SeedHouseholdCategories(
	ctx context.Context,
	client *ent.Client,
	householdID int,
) error {
	// Batch create all default categories
	bulk := make([]*ent.TransactionCategoryCreate, len(DefaultCategories))
	for i, cat := range DefaultCategories {
		create := client.TransactionCategory.Create().
			SetInput(cat.CreateTransactionCategoryInput).
			SetHouseholdID(householdID)

		if cat.IsImmutable {
			create = create.SetIsImmutable(true)
		}

		bulk[i] = create
	}

	_, err := client.TransactionCategory.CreateBulk(bulk...).Save(ctx)
	return err
}
