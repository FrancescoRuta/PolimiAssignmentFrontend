import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';

@Component({
	selector: 'app-produzione',
	templateUrl: './produzione.component.html',
	styleUrls: ['./produzione.component.css']
})
export class ProduzioneComponent implements OnInit {

	constructor(private titleService: ObservableTitle) {
			
	}

	onTabChanged(tab: MatTabChangeEvent) {
		switch (tab.index) {
			case 0:
				this.titleService.setTitle("Ordini di produzione");
				break;
			case 1:
				this.titleService.setTitle("Produzioni in corso");
				break;
			case 2:
				this.titleService.setTitle("Produzioni effettuate");
				break;
		}
	}
	
	ngOnInit(): void {
		this.titleService.setTitle("Ordini di produzione");
	}

}
