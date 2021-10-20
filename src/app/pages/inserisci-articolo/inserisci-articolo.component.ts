import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articolo } from 'src/app/models/articolo';
import { ArticoloService } from 'src/app/services/articolo.service';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';
import { OutputMessageService } from 'src/app/services/output-message.service';

@Component({
	selector: 'app-inserisci-articolo',
	templateUrl: './inserisci-articolo.component.html',
	styleUrls: ['./inserisci-articolo.component.css']
})
export class InserisciArticolo implements OnInit {
	private adding: boolean = false;
	
	public constructor(
		private articoloService: ArticoloService,
		private router: Router,
		private titleService: ObservableTitle,
		private outputMessageService: OutputMessageService,
	) {}
	
	ngOnInit(): void {
		this.titleService.setTitle("Inserisci articolo", () => this.router.navigate(["/articoli"]));
	}
	
	save(data: Articolo): void {
		if (this.adding) return;
		this.adding = true;
		this.articoloService.add(data).subscribe({
			complete: () => {
				this.router.navigate(["/articoli"]);
			},
			error: error => {
				this.outputMessageService.showError("Errore durante l'inserimento dell'articolo. " + ((error?.error?.message) ?? ""));
				this.adding = false;
			},
		});
	}
	
}
