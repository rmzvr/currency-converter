import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-header',
	template: `
	    <mat-toolbar color="primary">
      <span>Currency Converter</span>

      <span class="spacer"></span>

      <div class="rate-container">
        <div *ngFor="let rate of headerExchangeRates">
          {{rate.currency}} {{rate.rate}}
        </div>
      </div>
    </mat-toolbar>
	`,
	styles: [
		'.spacer { flex: 1 1 auto; }',
		'.rate-container { display: flex; gap: 1rem; }'
	]
})
export class HeaderComponent {
	@Input() headerExchangeRates: any;
}
