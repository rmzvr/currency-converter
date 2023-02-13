export type IconState = 'default' | 'rotated'

export interface ExchangeRates {
	[currency: string]: number;
}

export interface ExchangeData {
	disclaimer: string;
	license: string;
	timestamp: number;
	base: string;
	rates: ExchangeRates;
}

export interface HeaderExchangeRate {
	currency: string,
	rate: number
}
