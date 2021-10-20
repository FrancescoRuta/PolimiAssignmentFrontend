import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articolo } from '../models/articolo';
import { ArticoloQtaUpdate } from '../models/articolo-qta-update';

@Injectable({
	providedIn: 'root'
})
export class ArticoloService {
	constructor(
		private http: HttpClient,
	) {}
	
	public getAll(): Observable<Articolo[]> {
		return this.http.get<Articolo[]>(`${ environment.apiServer }/articolo/all`);
	}
	
	public movimenti(): Observable<ArticoloQtaUpdate[]> {
		return this.http.get<ArticoloQtaUpdate[]>(`${ environment.apiServer }/articolo/movimenti`);
	}
	
	public getAllWithDistintaBase(): Observable<Articolo[]> {
		return this.http.get<Articolo[]>(`${ environment.apiServer }/articolo/allWithDistintaBase`);
	}
	
	public getById(id: number): Observable<Articolo> {
		return this.http.get<Articolo>(`${ environment.apiServer }/articolo/get/${ id }`);
	}
	
	public add(articolo: Articolo): Observable<void> {
		return this.http.post<void>(`${ environment.apiServer }/articolo/add`, articolo);
	}
	
	public rettificaGiacenza(id: number, qta: number): Observable<void> {
		return this.http.put<void>(`${ environment.apiServer }/articolo/rettificaGiacenza/${ id }`, qta);
	}
	
	public update(articolo: Articolo): Observable<void> {
		return this.http.put<void>(`${ environment.apiServer }/articolo/update`, articolo);
	}
	
	public elimina(id: number): Observable<void> {
		return this.http.delete<void>(`${ environment.apiServer }/articolo/elimina/${ id }`);
	}
	
}
