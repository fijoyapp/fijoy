// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: fijoy/v1/transaction.proto

package fijoyv1connect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	v1 "fijoy/proto/fijoy/v1"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect.IsAtLeastVersion1_13_0

const (
	// TransactionServiceName is the fully-qualified name of the TransactionService service.
	TransactionServiceName = "fijoy.v1.TransactionService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// TransactionServiceCreateTransactionProcedure is the fully-qualified name of the
	// TransactionService's CreateTransaction RPC.
	TransactionServiceCreateTransactionProcedure = "/fijoy.v1.TransactionService/CreateTransaction"
	// TransactionServiceGetTransactionProcedure is the fully-qualified name of the TransactionService's
	// GetTransaction RPC.
	TransactionServiceGetTransactionProcedure = "/fijoy.v1.TransactionService/GetTransaction"
	// TransactionServiceGetTransactionsByAccountProcedure is the fully-qualified name of the
	// TransactionService's GetTransactionsByAccount RPC.
	TransactionServiceGetTransactionsByAccountProcedure = "/fijoy.v1.TransactionService/GetTransactionsByAccount"
	// TransactionServiceGetTransactionsProcedure is the fully-qualified name of the
	// TransactionService's GetTransactions RPC.
	TransactionServiceGetTransactionsProcedure = "/fijoy.v1.TransactionService/GetTransactions"
	// TransactionServiceUpdateTransactionProcedure is the fully-qualified name of the
	// TransactionService's UpdateTransaction RPC.
	TransactionServiceUpdateTransactionProcedure = "/fijoy.v1.TransactionService/UpdateTransaction"
	// TransactionServiceDeleteTransactionProcedure is the fully-qualified name of the
	// TransactionService's DeleteTransaction RPC.
	TransactionServiceDeleteTransactionProcedure = "/fijoy.v1.TransactionService/DeleteTransaction"
)

// These variables are the protoreflect.Descriptor objects for the RPCs defined in this package.
var (
	transactionServiceServiceDescriptor                        = v1.File_fijoy_v1_transaction_proto.Services().ByName("TransactionService")
	transactionServiceCreateTransactionMethodDescriptor        = transactionServiceServiceDescriptor.Methods().ByName("CreateTransaction")
	transactionServiceGetTransactionMethodDescriptor           = transactionServiceServiceDescriptor.Methods().ByName("GetTransaction")
	transactionServiceGetTransactionsByAccountMethodDescriptor = transactionServiceServiceDescriptor.Methods().ByName("GetTransactionsByAccount")
	transactionServiceGetTransactionsMethodDescriptor          = transactionServiceServiceDescriptor.Methods().ByName("GetTransactions")
	transactionServiceUpdateTransactionMethodDescriptor        = transactionServiceServiceDescriptor.Methods().ByName("UpdateTransaction")
	transactionServiceDeleteTransactionMethodDescriptor        = transactionServiceServiceDescriptor.Methods().ByName("DeleteTransaction")
)

// TransactionServiceClient is a client for the fijoy.v1.TransactionService service.
type TransactionServiceClient interface {
	CreateTransaction(context.Context, *connect.Request[v1.CreateTransactionRequest]) (*connect.Response[v1.Transaction], error)
	GetTransaction(context.Context, *connect.Request[v1.GetTransactionRequest]) (*connect.Response[v1.Transaction], error)
	GetTransactionsByAccount(context.Context, *connect.Request[v1.GetTransactionsByAccountRequest]) (*connect.Response[v1.TransactionList], error)
	GetTransactions(context.Context, *connect.Request[emptypb.Empty]) (*connect.Response[v1.TransactionList], error)
	UpdateTransaction(context.Context, *connect.Request[v1.UpdateTransactionRequest]) (*connect.Response[v1.Transaction], error)
	DeleteTransaction(context.Context, *connect.Request[v1.DeleteTransactionRequest]) (*connect.Response[emptypb.Empty], error)
}

// NewTransactionServiceClient constructs a client for the fijoy.v1.TransactionService service. By
// default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses,
// and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewTransactionServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) TransactionServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &transactionServiceClient{
		createTransaction: connect.NewClient[v1.CreateTransactionRequest, v1.Transaction](
			httpClient,
			baseURL+TransactionServiceCreateTransactionProcedure,
			connect.WithSchema(transactionServiceCreateTransactionMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		getTransaction: connect.NewClient[v1.GetTransactionRequest, v1.Transaction](
			httpClient,
			baseURL+TransactionServiceGetTransactionProcedure,
			connect.WithSchema(transactionServiceGetTransactionMethodDescriptor),
			connect.WithIdempotency(connect.IdempotencyNoSideEffects),
			connect.WithClientOptions(opts...),
		),
		getTransactionsByAccount: connect.NewClient[v1.GetTransactionsByAccountRequest, v1.TransactionList](
			httpClient,
			baseURL+TransactionServiceGetTransactionsByAccountProcedure,
			connect.WithSchema(transactionServiceGetTransactionsByAccountMethodDescriptor),
			connect.WithIdempotency(connect.IdempotencyNoSideEffects),
			connect.WithClientOptions(opts...),
		),
		getTransactions: connect.NewClient[emptypb.Empty, v1.TransactionList](
			httpClient,
			baseURL+TransactionServiceGetTransactionsProcedure,
			connect.WithSchema(transactionServiceGetTransactionsMethodDescriptor),
			connect.WithIdempotency(connect.IdempotencyNoSideEffects),
			connect.WithClientOptions(opts...),
		),
		updateTransaction: connect.NewClient[v1.UpdateTransactionRequest, v1.Transaction](
			httpClient,
			baseURL+TransactionServiceUpdateTransactionProcedure,
			connect.WithSchema(transactionServiceUpdateTransactionMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		deleteTransaction: connect.NewClient[v1.DeleteTransactionRequest, emptypb.Empty](
			httpClient,
			baseURL+TransactionServiceDeleteTransactionProcedure,
			connect.WithSchema(transactionServiceDeleteTransactionMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
	}
}

// transactionServiceClient implements TransactionServiceClient.
type transactionServiceClient struct {
	createTransaction        *connect.Client[v1.CreateTransactionRequest, v1.Transaction]
	getTransaction           *connect.Client[v1.GetTransactionRequest, v1.Transaction]
	getTransactionsByAccount *connect.Client[v1.GetTransactionsByAccountRequest, v1.TransactionList]
	getTransactions          *connect.Client[emptypb.Empty, v1.TransactionList]
	updateTransaction        *connect.Client[v1.UpdateTransactionRequest, v1.Transaction]
	deleteTransaction        *connect.Client[v1.DeleteTransactionRequest, emptypb.Empty]
}

// CreateTransaction calls fijoy.v1.TransactionService.CreateTransaction.
func (c *transactionServiceClient) CreateTransaction(ctx context.Context, req *connect.Request[v1.CreateTransactionRequest]) (*connect.Response[v1.Transaction], error) {
	return c.createTransaction.CallUnary(ctx, req)
}

// GetTransaction calls fijoy.v1.TransactionService.GetTransaction.
func (c *transactionServiceClient) GetTransaction(ctx context.Context, req *connect.Request[v1.GetTransactionRequest]) (*connect.Response[v1.Transaction], error) {
	return c.getTransaction.CallUnary(ctx, req)
}

// GetTransactionsByAccount calls fijoy.v1.TransactionService.GetTransactionsByAccount.
func (c *transactionServiceClient) GetTransactionsByAccount(ctx context.Context, req *connect.Request[v1.GetTransactionsByAccountRequest]) (*connect.Response[v1.TransactionList], error) {
	return c.getTransactionsByAccount.CallUnary(ctx, req)
}

// GetTransactions calls fijoy.v1.TransactionService.GetTransactions.
func (c *transactionServiceClient) GetTransactions(ctx context.Context, req *connect.Request[emptypb.Empty]) (*connect.Response[v1.TransactionList], error) {
	return c.getTransactions.CallUnary(ctx, req)
}

// UpdateTransaction calls fijoy.v1.TransactionService.UpdateTransaction.
func (c *transactionServiceClient) UpdateTransaction(ctx context.Context, req *connect.Request[v1.UpdateTransactionRequest]) (*connect.Response[v1.Transaction], error) {
	return c.updateTransaction.CallUnary(ctx, req)
}

// DeleteTransaction calls fijoy.v1.TransactionService.DeleteTransaction.
func (c *transactionServiceClient) DeleteTransaction(ctx context.Context, req *connect.Request[v1.DeleteTransactionRequest]) (*connect.Response[emptypb.Empty], error) {
	return c.deleteTransaction.CallUnary(ctx, req)
}

// TransactionServiceHandler is an implementation of the fijoy.v1.TransactionService service.
type TransactionServiceHandler interface {
	CreateTransaction(context.Context, *connect.Request[v1.CreateTransactionRequest]) (*connect.Response[v1.Transaction], error)
	GetTransaction(context.Context, *connect.Request[v1.GetTransactionRequest]) (*connect.Response[v1.Transaction], error)
	GetTransactionsByAccount(context.Context, *connect.Request[v1.GetTransactionsByAccountRequest]) (*connect.Response[v1.TransactionList], error)
	GetTransactions(context.Context, *connect.Request[emptypb.Empty]) (*connect.Response[v1.TransactionList], error)
	UpdateTransaction(context.Context, *connect.Request[v1.UpdateTransactionRequest]) (*connect.Response[v1.Transaction], error)
	DeleteTransaction(context.Context, *connect.Request[v1.DeleteTransactionRequest]) (*connect.Response[emptypb.Empty], error)
}

// NewTransactionServiceHandler builds an HTTP handler from the service implementation. It returns
// the path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewTransactionServiceHandler(svc TransactionServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	transactionServiceCreateTransactionHandler := connect.NewUnaryHandler(
		TransactionServiceCreateTransactionProcedure,
		svc.CreateTransaction,
		connect.WithSchema(transactionServiceCreateTransactionMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	transactionServiceGetTransactionHandler := connect.NewUnaryHandler(
		TransactionServiceGetTransactionProcedure,
		svc.GetTransaction,
		connect.WithSchema(transactionServiceGetTransactionMethodDescriptor),
		connect.WithIdempotency(connect.IdempotencyNoSideEffects),
		connect.WithHandlerOptions(opts...),
	)
	transactionServiceGetTransactionsByAccountHandler := connect.NewUnaryHandler(
		TransactionServiceGetTransactionsByAccountProcedure,
		svc.GetTransactionsByAccount,
		connect.WithSchema(transactionServiceGetTransactionsByAccountMethodDescriptor),
		connect.WithIdempotency(connect.IdempotencyNoSideEffects),
		connect.WithHandlerOptions(opts...),
	)
	transactionServiceGetTransactionsHandler := connect.NewUnaryHandler(
		TransactionServiceGetTransactionsProcedure,
		svc.GetTransactions,
		connect.WithSchema(transactionServiceGetTransactionsMethodDescriptor),
		connect.WithIdempotency(connect.IdempotencyNoSideEffects),
		connect.WithHandlerOptions(opts...),
	)
	transactionServiceUpdateTransactionHandler := connect.NewUnaryHandler(
		TransactionServiceUpdateTransactionProcedure,
		svc.UpdateTransaction,
		connect.WithSchema(transactionServiceUpdateTransactionMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	transactionServiceDeleteTransactionHandler := connect.NewUnaryHandler(
		TransactionServiceDeleteTransactionProcedure,
		svc.DeleteTransaction,
		connect.WithSchema(transactionServiceDeleteTransactionMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	return "/fijoy.v1.TransactionService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case TransactionServiceCreateTransactionProcedure:
			transactionServiceCreateTransactionHandler.ServeHTTP(w, r)
		case TransactionServiceGetTransactionProcedure:
			transactionServiceGetTransactionHandler.ServeHTTP(w, r)
		case TransactionServiceGetTransactionsByAccountProcedure:
			transactionServiceGetTransactionsByAccountHandler.ServeHTTP(w, r)
		case TransactionServiceGetTransactionsProcedure:
			transactionServiceGetTransactionsHandler.ServeHTTP(w, r)
		case TransactionServiceUpdateTransactionProcedure:
			transactionServiceUpdateTransactionHandler.ServeHTTP(w, r)
		case TransactionServiceDeleteTransactionProcedure:
			transactionServiceDeleteTransactionHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedTransactionServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedTransactionServiceHandler struct{}

func (UnimplementedTransactionServiceHandler) CreateTransaction(context.Context, *connect.Request[v1.CreateTransactionRequest]) (*connect.Response[v1.Transaction], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("fijoy.v1.TransactionService.CreateTransaction is not implemented"))
}

func (UnimplementedTransactionServiceHandler) GetTransaction(context.Context, *connect.Request[v1.GetTransactionRequest]) (*connect.Response[v1.Transaction], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("fijoy.v1.TransactionService.GetTransaction is not implemented"))
}

func (UnimplementedTransactionServiceHandler) GetTransactionsByAccount(context.Context, *connect.Request[v1.GetTransactionsByAccountRequest]) (*connect.Response[v1.TransactionList], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("fijoy.v1.TransactionService.GetTransactionsByAccount is not implemented"))
}

func (UnimplementedTransactionServiceHandler) GetTransactions(context.Context, *connect.Request[emptypb.Empty]) (*connect.Response[v1.TransactionList], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("fijoy.v1.TransactionService.GetTransactions is not implemented"))
}

func (UnimplementedTransactionServiceHandler) UpdateTransaction(context.Context, *connect.Request[v1.UpdateTransactionRequest]) (*connect.Response[v1.Transaction], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("fijoy.v1.TransactionService.UpdateTransaction is not implemented"))
}

func (UnimplementedTransactionServiceHandler) DeleteTransaction(context.Context, *connect.Request[v1.DeleteTransactionRequest]) (*connect.Response[emptypb.Empty], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("fijoy.v1.TransactionService.DeleteTransaction is not implemented"))
}
