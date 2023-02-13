import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';
import { ExchangeRates, ExchangeData, HeaderExchangeRate, IconState } from './app.models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('iconRotation', [
			state('default', style({ transform: 'rotate(0)' })),
			state('rotated', style({ transform: 'rotate(180deg)' })),
			transition('default => rotated', animate('300ms ease-out')),
			transition('rotated => default', animate('300ms ease-out'))
		])
	]
})
export class AppComponent implements OnInit, OnDestroy {
	rotation: IconState = 'default';

	amount1: number = 1;
	amount2: number = 0;

	currency1: string = 'EUR';
	currency2: string = 'UAH';

	currencies: string[] = [];

	exchangeRates: ExchangeRates = {};

	headerExchangeRates: HeaderExchangeRate[] = []

	getRatesSubscription!: Subscription

	constructor(private appService: AppService) { }

	ngOnInit() {
		this.getRatesSubscription = this.appService.getRates()
			.subscribe((data: ExchangeData) => {
				this.exchangeRates = data.rates

				this.currencies = Object.keys(data.rates)

				this.headerExchangeRates = [
					{
						currency: "EUR",
						rate: +(this.exchangeRates['UAH'] / this.exchangeRates['EUR']).toFixed(2)
					},
					{
						currency: 'USD',
						rate: +(this.exchangeRates['UAH'] / this.exchangeRates['USD']).toFixed(2)
					}
				]

				this.conver(true)
			})
	}

	ngOnDestroy(): void {
		this.getRatesSubscription.unsubscribe()
	}

	conver(fromFirst: boolean): void {
		if (fromFirst) {
			this.amount2 = +(this.amount1 * (this.exchangeRates[this.currency2] / this.exchangeRates[this.currency1])).toFixed(2)
		} else {
			this.amount1 = +(this.amount2 * (this.exchangeRates[this.currency1] / this.exchangeRates[this.currency2])).toFixed(2)
		}
	}

	reverseCurrencies(): void {
		this.rotation = this.rotation === 'default' ? 'rotated' : 'default';

		[this.currency2, this.currency1] = [this.currency1, this.currency2]

		this.conver(true);
	}
}
