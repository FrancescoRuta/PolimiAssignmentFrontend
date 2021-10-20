import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, switchMap, tap} from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { Observable, of, throwError, from, concat, Subscriber } from 'rxjs';
import { concatMap, delay, retryWhen } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class Http401Interceptor implements HttpInterceptor {
	
	constructor(private authenticationService: AuthenticationService) {}
	
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.url.includes("/auth/")) return next.handle(request);
		else return next.handle(request).pipe(catchError(error => {
			if (error.status === 401) {
				return this.authenticationService.refreshTokenAndRetry(request);
			}
			return throwError(error);
		}));
	}
	
}
