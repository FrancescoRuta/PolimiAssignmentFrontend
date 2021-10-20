import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articolo } from 'src/app/models/articolo';
import { ArticoloService } from 'src/app/services/articolo.service';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';
import { OutputMessageService } from 'src/app/services/output-message.service';

@Component({
	selector: 'app-modifica-articolo',
	templateUrl: './modifica-articolo.component.html',
	styleUrls: ['./modifica-articolo.component.css']
})
export class ModificaArticoloComponent implements OnInit {
	private adding: boolean = false;
	dataOk: boolean = false;
	data: Articolo = {
		codice: "",
		descrizione: "",
		unitaDiMisura: "NR",
		descrizioneEstesa: "",
		distinteBase: [],
	};
	
	public constructor(
		private articoloService: ArticoloService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: ObservableTitle,
		private outputMessageService: OutputMessageService,
	) {}
	
	ngOnInit(): void {
		this.titleService.setTitle("Modifica articolo", () => this.router.navigate(["/articoli"]));
		this.activatedRoute.queryParams.subscribe(params => {
			let id = params['id'];
			let j = this.articoloService.getById(id).subscribe({
				next: (data: Articolo) => {
					this.data = data;
					this.dataOk = true;
				},
				complete() {
					j.unsubscribe();
				},
				error: error => {
					this.outputMessageService.showError("Errore durante l'ottenimento dei dati dell'aricolo. " + ((error?.error?.message) ?? ""));
					this.adding = false;
				},
			})
		});
	}
	
	save(data: Articolo): void {
		if (this.adding) return;
		this.adding = true;
		this.articoloService.update(data).subscribe({
			complete: () => {
				this.router.navigate(["/articoli"]);
			},
			error: error => {
				this.outputMessageService.showError("Errore durante la modifica dell'articolo. " + ((error?.error?.message) ?? ""));
				this.adding = false;
			},
		});
	}
}
