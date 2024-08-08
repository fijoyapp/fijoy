package handler

import "net/http"

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func (s *HealthHandler) CheckHealth(
	w http.ResponseWriter, _ *http.Request,
) {
	w.Write([]byte("OK"))
	return
}
