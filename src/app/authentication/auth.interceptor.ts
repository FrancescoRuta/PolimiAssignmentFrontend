import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authenticationService: AuthenticationService) {}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let token;
		if (req.url.endsWith("/auth/refresh")) token = this.authenticationService.refreshToken; else token = this.authenticationService.token;
		if (token != null) {
			req = req.clone({ 
				headers: req.headers.set("Authorization", token),
			});
		}
		return next.handle(req);
	}
	
}