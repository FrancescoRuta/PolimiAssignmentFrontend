import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ObservableTitle {
	private observer: Observable<{ value: string, goBackFn: (() => void) | null }>;
	private observerFn!: Subscriber<{ value: string, goBackFn: (() => void) | null }>;
	
	
	constructor(private titleService: Title) {
		this.observer = new Observable<{ value: string, goBackFn: (() => void) | null }>(s => this.observerFn = s);
	}
	
	public setTitle(value: string, goBackFn: (() => void) | null = null) {
		this.titleService.setTitle(value);
		this.observerFn.next({ value, goBackFn });
	}
	
	public get titleObserver(): Observable<{ value: string, goBackFn: (() => void) | null }> {
		return this.observer;
	}
	
}
