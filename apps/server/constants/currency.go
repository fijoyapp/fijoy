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
}
