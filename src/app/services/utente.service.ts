import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utente } from '../models/utente';

@Injectable({
	providedIn: 'root'
})
export class UtenteService {
	constructor(
		private http: HttpClient,
	) {}
	
	public getAll(): Observable<Utente[]> {
		return this.http.get<Utente[]>(`${ environment.apiServer }/utente/all`);
	}
	
	public add(utente: Utente): Observable<void> {
		return this.http.post<void>(`${ environment.apiServer }/utente/add`, utente);
	}
	
	public update(utente: Utente): Observable<void> {
		return this.http.put<void>(`${ environment.apiServer }/utente/update`, utente);
	}
	
	public updatePassword(utente: Utente): Observable<void> {
		return this.http.put<void>(`${ environment.apiServer }/utente/updatePassword`, utente);
	}
	
	public elimina(id: number): Observable<void> {
		return this.http.delete<void>(`${ environment.apiServer }/utente/elimina/${ id }`);
	}
}
