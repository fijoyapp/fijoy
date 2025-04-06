package handler

import "net/http"

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func (s *HealthHandler) CheckHealth(
	w http.ResponseWriter, _ *http.Request,
) {
	_, err := w.Write([]byte("OK"))
	if err != nil {
		return
	}
}
