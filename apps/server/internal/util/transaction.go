package util

import (
	"fijoy/internal/gen/postgres/model"

	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
)

var JetTransactionTypeToConnectTransactionType = map[model.FijoyTransactionType]fijoyv1.TransactionType{
	model.FijoyTransactionType_Expense:    fijoyv1.TransactionType_TRANSACTION_TYPE_EXPENSE,
	model.FijoyTransactionType_Income:     fijoyv1.TransactionType_TRANSACTION_TYPE_INCOME,
	model.FijoyTransactionType_Transfer:   fijoyv1.TransactionType_TRANSACTION_TYPE_TRANSFER,
	model.FijoyTransactionType_Adjustment: fijoyv1.TransactionType_TRANSACTION_TYPE_ADJUSTMENT,
}

var ConnectTransactionTypeToJetTransactionType = map[fijoyv1.TransactionType]model.FijoyTransactionType{
	fijoyv1.TransactionType_TRANSACTION_TYPE_ADJUSTMENT: model.FijoyTransactionType_Adjustment,
	fijoyv1.TransactionType_TRANSACTION_TYPE_EXPENSE:    model.FijoyTransactionType_Expense,
	fijoyv1.TransactionType_TRANSACTION_TYPE_INCOME:     model.FijoyTransactionType_Income,
	fijoyv1.TransactionType_TRANSACTION_TYPE_TRANSFER:   model.FijoyTransactionType_Transfer,
}
