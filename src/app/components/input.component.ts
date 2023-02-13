import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-input',
	template: `
		<mat-form-field>
			<input matInput [(ngModel)]="amount" (keyup)="onAmountChange()" (keypress)="validateNumber($event)" [value]="amount" type="text" placeholder="Enter amount">
		</mat-form-field>
	`
})
export class InputComponent {
	@Input() amount!: number;
	@Output() amountChange = new EventEmitter<number>();

	onAmountChange() {
		this.amountChange.emit(this.amount);
	}

	validateNumber(event: KeyboardEvent) {
		const charCode = event.code;
		const dot = 46;

		if (charCode !== 'NumpadDecimal' && (charCode < 'Digit0' || charCode > 'Digit9')) {
			event.preventDefault();
		}
	}
}