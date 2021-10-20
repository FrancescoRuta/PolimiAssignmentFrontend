import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImpiantoDiProduzione } from '../models/impianto-di-produzione';

@Injectable({
	providedIn: 'root'
})
export class ImpiantoDiProduzioneService {
	constructor(
		private http: HttpClient,
	) {}
	
	public getAll(): Observable<ImpiantoDiProduzione[]> {
		return this.http.get<ImpiantoDiProduzione[]>(`${ environment.apiServer }/impiantoDiProduzione/all`);
	}
	
	public add(impiantoDiProduzione: ImpiantoDiProduzione): Observable<void> {
		return this.http.post<void>(`${ environment.apiServer }/impiantoDiProduzione/add`, impiantoDiProduzione);
	}
	
	public update(impiantoDiProduzione: ImpiantoDiProduzione): Observable<void> {
		return this.http.put<void>(`${ environment.apiServer }/impiantoDiProduzione/update`, impiantoDiProduzione);
	}
	
	public elimina(id: number): Observable<void> {
		return this.http.delete<void>(`${ environment.apiServer }/impiantoDiProduzione/elimina/${ id }`);
	}
	
}
