import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginInfo } from '../models/login-info';
import { UserPasswordUpdate } from '../models/user-password-update';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private accessTokenValue: string | null;
	private refreshTokenValue: string | null;
	private roles: string[] | null;
	private isRefreshing_: boolean;
	private subscribersAfterRefresh: ({request: HttpRequest<any>, subscriber: Subscriber<any>})[] = [];
	private currentUsername: string | null;
	
	constructor(private http: HttpClient) {
		this.accessTokenValue = null;
		this.refreshTokenValue = localStorage.getItem("token");
		if (this.refreshTokenValue != null) setTimeout(() => this.refresh().toPromise(), 1);
		this.roles = null;
		this.isRefreshing_ = false;
		this.currentUsername = null;
	}
	
	public get loggedIn(): boolean {
		return this.refreshTokenValue != null;
	}
	
	public get token(): string | null {
		return this.accessTokenValue;
	}
	
	public get refreshToken(): string | null {
		return this.refreshTokenValue;
	}
	
	public changeCurrentUserPassword(oldPassword: string, newPassword: string): Observable<void> {
		let userPasswordUpdate: UserPasswordUpdate = {
			newPassword,
			oldPassword,
			username: this.currentUsername!
		};
		return this.http.put<void>(`${ environment.apiServer }/auth/updateUserPassword`, userPasswordUpdate);
	}
	
	public login(data: {username: string, password: string}): Observable<void> {
		return new Observable<void>(s =>
			this.http.post<LoginInfo>(`${ environment.apiServer }/auth/login`, data).subscribe({
				next: (r) => {
					this.accessTokenValue = r.accessToken;
					this.roles = r.roles.split(",");
					this.currentUsername = r.username;
					localStorage.setItem("token", this.refreshTokenValue = r.refreshToken);
					
				},
				complete: () => s.complete(),
				error: () => s.error()
			})
		);
	}
	
	public logout() {
		localStorage.removeItem("token");
		this.accessTokenValue = null;
		this.refreshTokenValue = null;
	}
	
	public get isRefreshing(): boolean {
		return this.isRefreshing_;
	}
	
	public refresh(): Observable<void> {
		return new Observable<void>(s =>
			this.http.get<LoginInfo>(`${ environment.apiServer }/auth/refresh`).subscribe({
				next: (r) => {
					this.accessTokenValue = r.accessToken;
					this.roles = r.roles.split(",");
					this.currentUsername = r.username;
					localStorage.setItem("token", this.refreshTokenValue = r.refreshToken);
				},
				complete: () => s.complete(),
				error: () => this.logout()
			})
		);
	}
	
	public refreshTokenAndRetry(request: HttpRequest<unknown>): Observable<any> {
		console.log("refreshTokenAndRetry");
		if (this.isRefreshing_) {
			return new Observable(subscriber => {
				if (!this.isRefreshing_)
					subscriber.complete();
				else
					this.subscribersAfterRefresh.push({request, subscriber});
			});
		}
		this.isRefreshing_ = true;
		return new Observable(s => this.refresh().subscribe({
			complete: () => {
				this.http.request(request).subscribe(s);
				let ss = this.subscribersAfterRefresh;
				this.subscribersAfterRefresh = [];
				for (let s of ss) this.http.request(s.request).subscribe(s.subscriber);
				this.isRefreshing_ = false;
			},
			error: () => this.isRefreshing_ = false
		}));
	}
	
	public checkUrl(url: string): boolean | null {
		let role: string = "?";
		if (url == "/index") return true;
		else if (url.startsWith("/articoli")) role = "ARTICOLO";
		else if (url.startsWith("/magazzino")) role = "ARTICOLO";
		else if (url.startsWith("/movimenti-di-magazzino")) role = "ARTICOLO";
		else if (url.startsWith("/produzione")) role = "PRODUZIONE";
		else if (url.startsWith("/impianti-di-produzione")) role = "IMPIANTO_DI_PRODUZIONE";
		else if (url.startsWith("/utenti")) role = "UTENTE";
		return this.roles == null ? null : this.roles.includes(role);
	}
	
	public hasRole(role: string): boolean {
		return this.roles == null ? false : this.roles.includes(role);
	}
	
}
