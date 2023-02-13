import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeData } from './app.models';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	private API_KEY = '4d6b8e3ae75145218021fc6cc6cb2b25';

	constructor(private http: HttpClient) { }

	getRates(): Observable<ExchangeData> {
		return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=${this.API_KEY}`) as Observable<ExchangeData>
	}
}
