/**
 * Currency formatting utilities
 */

/**
 * Map of currency codes to symbols
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
	USD: "$",
	EUR: "€",
	GBP: "£",
	JPY: "¥",
	CAD: "CA$",
	AUD: "A$",
};

/**
 * Format price from cents to currency string
 * Backend returns price in cents (299 = $2.99)
 */
export function formatPrice(
	amountInCents: number,
	currency: string,
	interval: string,
): string {
	// Convert cents to dollars/euros/etc
	const amount = amountInCents / 100;

	// Get currency symbol
	const currencyCode = currency.toUpperCase();
	const currencySymbol = CURRENCY_SYMBOLS[currencyCode] || currencyCode;

	// Format the price string
	return `${currencySymbol}${amount.toFixed(2)} per ${interval}`;
}
