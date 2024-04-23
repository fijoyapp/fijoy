package util

import (
	"errors"

	validator "github.com/go-playground/validator/v10"
)

var (
	ErrInvalidLocaleCode   = errors.New("invalid locale code")
	ErrInvalidCurrencyCode = errors.New("invalid currency code")
)

func ValidateCurrency(code string) error {
	validate := validator.New(validator.WithRequiredStructEnabled())
	if err := validate.Var(code, "iso4217"); err != nil {
		return ErrInvalidCurrencyCode
	}
	return nil
}

func ValidateLocale(locale string) error {
	validate := validator.New(validator.WithRequiredStructEnabled())
	if err := validate.Var(locale, "bcp47_language_tag"); err != nil {
		return ErrInvalidLocaleCode
	}
	return nil
}
