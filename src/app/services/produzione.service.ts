import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produzione } from '../models/produzione';

@Injectable({
  providedIn: 'root'
})
export class ProduzioneService {
	constructor(
		private http: HttpClient,
	) {}
	
	public getOrdiniDiProduzione(): Observable<Produzione[]> {
		return this.http.get<Produzione[]>(`${ environment.apiServer }/produzione/ordini`);
	}
	
	public getProduzioniInCorso(): Observable<Produzione[]> {
		return this.http.get<Produzione[]>(`${ environment.apiServer }/produzione/inCorso`);
	}
	
	public getProduzioniEffettuate(): Observable<Produzione[]> {
		return this.http.get<Produzione[]>(`${ environment.apiServer }/produzione/effettuate`);
	}
	
	public addOrdine(produzione: Produzione): Observable<void> {
		return this.http.post<void>(`${ environment.apiServer }/produzione/addOrdine`, produzione);
	}
	
	public updateQta(produzione: Produzione): Observable<void> {
		return this.http.put<void>(`${ environment.apiServer }/produzione/updateQta`, produzione);
	}
	
	public annullaOrdineDiProduzioneById(id: number): Observable<void> {
		return this.http.delete<void>(`${ environment.apiServer }/produzione/annullaOrdineDiProduzioneById/${ id }`);
	}
	
}
