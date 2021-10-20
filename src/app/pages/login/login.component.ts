import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';
import { OutputMessageService } from 'src/app/services/output-message.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	public username: string = "";
	public password: string = "";
	
	constructor(
		private authenticationService: AuthenticationService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private titleService: ObservableTitle,
		private outputMessageService: OutputMessageService,
	) {
		
	}
	
	ngOnInit(): void {
		if (this.authenticationService.loggedIn) {
			this.redirect();
		} else {
			this.titleService.setTitle("Login");
		}
	}
	
	public get loggedIn(): boolean {
		return this.authenticationService.loggedIn;
	}
	
	public checkLogin() {
		this.login();
	}
	
	private redirect() {
		this.activatedRoute.queryParams.subscribe(params => {
			let returnUrl = params['returnUrl'];
			this.router.navigateByUrl(returnUrl).catch(_ => this.router.navigate(["/"]));
		});
	}
	
	private login() {
		this.authenticationService.login({username: this.username, password: this.password}).subscribe({
			complete: () => this.redirect(),
			error: (err: any) => this.outputMessageService.showError("Nome utente o password errati.")
		});
	}

}
