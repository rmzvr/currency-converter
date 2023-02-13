import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-select',
	template: `
    <mat-form-field class="select">
      <mat-select [(ngModel)]="selectedCurrency" (selectionChange)="onSelectionChange()">
        <mat-option *ngFor="let currency of currencies" [value]="currency">{{currency}}</mat-option>
      </mat-select>
    </mat-form-field>
	`,
	styles: ['.select { max-width: 5.4rem; } ']
})
export class SelectComponent {
	@Input() currencies!: string[];
	@Input() selectedCurrency!: string;
	@Output() selectedCurrencyChange = new EventEmitter<string>();

	onSelectionChange() {
		this.selectedCurrencyChange.emit(this.selectedCurrency);
	}
}
