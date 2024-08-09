package util

//
// import (
// 	"fijoy/internal/gen/postgres/enum"
// 	"fijoy/internal/gen/postgres/model"
//
// 	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
//
// 	"github.com/go-jet/jet/v2/postgres"
// )
//
// var JetTransactionTypeToConnectTransactionType = map[model.FijoyTransactionType]fijoyv1.TransactionType{
// 	model.FijoyTransactionType_Expense:    fijoyv1.TransactionType_TRANSACTION_TYPE_EXPENSE,
// 	model.FijoyTransactionType_Income:     fijoyv1.TransactionType_TRANSACTION_TYPE_INCOME,
// 	model.FijoyTransactionType_Transfer:   fijoyv1.TransactionType_TRANSACTION_TYPE_TRANSFER,
// 	model.FijoyTransactionType_Adjustment: fijoyv1.TransactionType_TRANSACTION_TYPE_ADJUSTMENT,
// }
//
// var ConnectTransactionTypeToJetTransactionType = map[fijoyv1.TransactionType]model.FijoyTransactionType{
// 	fijoyv1.TransactionType_TRANSACTION_TYPE_ADJUSTMENT: model.FijoyTransactionType_Adjustment,
// 	fijoyv1.TransactionType_TRANSACTION_TYPE_EXPENSE:    model.FijoyTransactionType_Expense,
// 	fijoyv1.TransactionType_TRANSACTION_TYPE_INCOME:     model.FijoyTransactionType_Income,
// 	fijoyv1.TransactionType_TRANSACTION_TYPE_TRANSFER:   model.FijoyTransactionType_Transfer,
// }
//
// var ConnectTransactionTypeToJetTransactionTypeEnum = map[fijoyv1.TransactionType]postgres.StringExpression{
// 	fijoyv1.TransactionType_TRANSACTION_TYPE_ADJUSTMENT: enum.FijoyTransactionType.Adjustment,
// 	fijoyv1.TransactionType_TRANSACTION_TYPE_EXPENSE:    enum.FijoyTransactionType.Expense,
// 	fijoyv1.TransactionType_TRANSACTION_TYPE_INCOME:     enum.FijoyTransactionType.Income,
// 	fijoyv1.TransactionType_TRANSACTION_TYPE_TRANSFER:   enum.FijoyTransactionType.Transfer,
// }
