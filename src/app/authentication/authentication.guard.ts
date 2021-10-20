import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationGuard implements CanActivateChild {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) {}
	
	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.check(state);
	}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.check(state);
	}
	
	private check(state: RouterStateSnapshot): boolean {
		if (this.authenticationService.loggedIn) {
			return this.authenticationService.checkUrl(state.url) ?? true;
		} else {
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
			return false;
		}
	}
	
}
