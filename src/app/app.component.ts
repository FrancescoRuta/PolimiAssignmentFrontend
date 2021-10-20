import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { ModificaPasswordUtenteCorrenteComponent } from './dialogs/modifica-password-utente-corrente/modifica-password-utente-corrente.component';
import { ObservableTitle } from './services/observable-title.ts.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	private currentPage: "articoli" | "magazzino" | "produzione" | "impianti-di-produzione" | "utenti" | "movimenti-di-magazzino" | "";
	currentPageTitle: { value: string, goBackFn: (() => void) | null };
	
	public constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private titleService: ObservableTitle,
		private dialog: MatDialog
	) {
		this.currentPage = ""
		this.currentPageTitle = { value: "", goBackFn: null }
	}
	
	public get loggedIn(): boolean {
		return this.authenticationService.loggedIn;
	}
	
	public logout() {
		this.authenticationService.logout();
		this.currentPage = "";
		this.router.navigate(['/login'], { queryParams: { returnUrl: "/" }});
	}
	
	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				if(event.url) {
					if (event.url.startsWith("/articoli")) this.currentPage = "articoli";
					if (event.url.startsWith("/magazzino")) this.currentPage = "magazzino";
					if (event.url.startsWith("/movimenti-di-magazzino")) this.currentPage = "movimenti-di-magazzino";
					if (event.url.startsWith("/produzione")) this.currentPage = "produzione";
					if (event.url.startsWith("/impianti-di-produzione")) this.currentPage = "impianti-di-produzione";
					if (event.url.startsWith("/utenti")) this.currentPage = "utenti";
				}
			}
		});
		this.titleService.titleObserver.subscribe({
			next: (title) => setTimeout(() => this.currentPageTitle = title, 1)
		});
	}
	
	goBackFn(): void {
		if (this.currentPageTitle.goBackFn) this.currentPageTitle.goBackFn();
	}
	
	public getStatus(page: "articoli" | "magazzino" | "produzione" | "impianti-di-produzione" | "utenti" | "movimenti-di-magazzino"): string {
		return this.currentPage == page ? "active" : "";
	}
	
	public hasRole(role: string): boolean {
		return this.authenticationService.hasRole(role);
	}
	
	public redirect(pagename: string) {
		this.router.navigate(['/' + pagename]);
	}
	
	changePassword(): void {
		this.dialog.open<ModificaPasswordUtenteCorrenteComponent, null, null>(ModificaPasswordUtenteCorrenteComponent, {
			width: ModificaPasswordUtenteCorrenteComponent.reqWidth + 'px',
		});
	}
	
}
