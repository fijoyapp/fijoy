package main

import (
	"bytes"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"beavermoney.app/gql"
	"github.com/99designs/gqlgen/graphql"
)

func TestGraphQLPersistedQueryHandshake(t *testing.T) {
	server := newGraphQLHandler(gql.NewExecutableSchema(gql.Config{Resolvers: &gql.Resolver{}}))
	query := "query TestQuery { __typename }"
	hash := fmt.Sprintf("%x", sha256.Sum256([]byte(query)))
	payload := map[string]any{
		"operationName": "TestQuery",
		"extensions": map[string]any{
			"persistedQuery": map[string]any{"version": 1, "sha256Hash": hash},
		},
	}

	miss := postGraphQL(t, server, payload)
	if len(miss.Errors) != 1 || miss.Errors[0].Extensions["code"] != "PERSISTED_QUERY_NOT_FOUND" {
		t.Fatalf("expected APQ cache miss, got %+v", miss)
	}

	payload["query"] = query
	registered := postGraphQL(t, server, payload)
	if len(registered.Errors) != 0 || string(registered.Data) != `{"__typename":"Query"}` {
		t.Fatalf("expected successful registration, got %+v", registered)
	}

	delete(payload, "query")
	hit := postGraphQL(t, server, payload)
	if len(hit.Errors) != 0 || string(hit.Data) != string(registered.Data) {
		t.Fatalf("expected cached query execution, got %+v", hit)
	}
}

func TestGraphQLInvalidOperationsDoNotPanic(t *testing.T) {
	server := newGraphQLHandler(gql.NewExecutableSchema(gql.Config{Resolvers: &gql.Resolver{}}))
	for _, query := range []string{"", "query {", "query { nonexistentField }"} {
		t.Run(query, func(t *testing.T) {
			response := postGraphQL(t, server, map[string]any{"query": query})
			if len(response.Errors) == 0 {
				t.Fatal("expected a request error")
			}
			for _, err := range response.Errors {
				if strings.Contains(err.Message, "internal system error") {
					t.Fatalf("request error became a panic: %v", err)
				}
			}
		})
	}
}

func postGraphQL(t *testing.T, server http.Handler, payload map[string]any) graphql.Response {
	t.Helper()
	body, err := json.Marshal(payload)
	if err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest(http.MethodPost, "/query", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	recorder := httptest.NewRecorder()
	server.ServeHTTP(recorder, req)
	var response graphql.Response
	if err := json.Unmarshal(recorder.Body.Bytes(), &response); err != nil {
		t.Fatalf("invalid GraphQL response: %v: %s", err, recorder.Body.String())
	}
	return response
}
