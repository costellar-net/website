export function formatCurrency(amount: number): string {
	const locale: string = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US';

	const currencyMap: Record<string, string> = {
		'en-US': 'USD',
		'en-GB': 'GBP',
		'de-DE': 'EUR',
		'fr-FR': 'EUR',
		'es-ES': 'EUR',
		'ja-JP': 'JPY',
		'zh-CN': 'CNY',
		'ko-KR': 'KRW',
		'ru-RU': 'RUB',
		'pt-BR': 'BRL',
		'hi-IN': 'INR',
		'it-IT': 'EUR',
		'nl-NL': 'EUR',
		'sv-SE': 'SEK',
		'no-NO': 'NOK',
		'da-DK': 'DKK',
		'pl-PL': 'PLN',
		'cs-CZ': 'CZK',
		'tr-TR': 'TRY',
		'ar-EG': 'EGP',
		'id-ID': 'IDR',
		// Add more as needed
	};

	const languagePart = locale.split('-')[0];

	const currency: string =
		currencyMap[locale] || Object.entries(currencyMap).find(([key]) => key.startsWith(languagePart))?.[1] || 'USD';

	return amount.toLocaleString(locale, {
		style: 'currency',
		currency,
	});
}
