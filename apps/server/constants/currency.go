package constants

type Currency struct {
	Code   string
	Locale string
}

var Currencies = map[string]Currency{
	"CAD": {
		Code:   "CAD",
		Locale: "en-CA",
	},
	"USD": {
		Code:   "USD",
		Locale: "en-US",
	},
	"CNY": {
		Code:   "CNY",
		Locale: "zh-CN",
	},
	"EUR": {
		Code:   "EUR",
		Locale: "en-EU",
	},
	"JPY": {
		Code:   "JPY",
		Locale: "ja-JP",
	},
	"GBP": {
		Code:   "GBP",
		Locale: "en-GB",
	},
	"AUD": {
		Code:   "AUD",
		Locale: "en-AU",
	},
	"CHF": {
		Code:   "CHF",
		Locale: "de-CH",
	},
}

func IsValidCurrency(code string) bool {
	_, exists := Currencies[code]
	return exists
}
