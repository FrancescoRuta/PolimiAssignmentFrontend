import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Articolo } from 'src/app/models/articolo';
import { DistintaBase } from 'src/app/models/distinta-base';
import { ImpiantoDiProduzione } from 'src/app/models/impianto-di-produzione';
import { Produzione } from 'src/app/models/produzione';
import { ArticoloService } from 'src/app/services/articolo.service';
import { ImpiantoDiProduzioneService } from 'src/app/services/impianto-di-produzione.service';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';
import { OutputMessageService } from 'src/app/services/output-message.service';
import { ProduzioneService } from 'src/app/services/produzione.service';

class CustomControl extends AbstractControl {
	public constructor(private validGetter: () => boolean) {
		super(() => null, async () => null);
	}
	
	setValue(value: any, options?: Object): void {}
	patchValue(value: any, options?: Object): void {}
	reset(value?: any, options?: Object): void {}
	get valid(): boolean {
		return this.validGetter();
	}
	get invalid(): boolean {
		return !this.valid;
	}
}


@Component({
	selector: 'app-inserisci-ordine-di-produzione',
	templateUrl: './inserisci-ordine-di-produzione.component.html',
	styleUrls: ['./inserisci-ordine-di-produzione.component.css']
})
export class InserisciOrdineDiProduzioneComponent implements OnInit {
	private adding: boolean = false;
	articoloSelezionatoControl: CustomControl;
	@ViewChild(MatStepper) stepper!: MatStepper;
	data: Produzione;
	impiantiArticolo: ImpiantoDiProduzione[];
	distinteBase: DistintaBase[];
	apiGetArticoli: () => Observable<Articolo[]>;
	
	public constructor(
		private produzioneService: ProduzioneService,
		private impiantoDiProduzioneService: ImpiantoDiProduzioneService,
		private router: Router,
		private titleService: ObservableTitle,
		private articoloService: ArticoloService,
		private outputMessageService: OutputMessageService,
	) {
		this.articoloSelezionatoControl = new CustomControl(() => this.data.articoloProdotto != null);
		this.data = { qtaProdotta: 0 };
		this.impiantiArticolo = [];
		this.distinteBase = [];
		this.impiantoDiProduzioneService.getAll().subscribe({
			next: (impianti) => {
				this.impiantiArticolo.push(...impianti);
			},
			error: (err: any) => {
				this.outputMessageService.showError("Errore durante l'ottenimento degli impianti. " + ((err?.error?.message) ?? ""));
			}
		});
		this.apiGetArticoli = () => this.articoloService.getAllWithDistintaBase();
	}
	
	ngOnInit(): void {
		this.titleService.setTitle("Inserisci nuovo ordine di produzione", () => this.router.navigate(["/produzione"]));
	}
	
	selectArticolo(articolo: Articolo) {
		this.data.articoloProdotto = articolo;
		this.distinteBase = articolo.distinteBase;
		this.stepper.next();
	}
	
	change(event: StepperSelectionEvent) {
		if (event.selectedIndex === 0) this.data.articoloProdotto = undefined;
	}
	
	save(): void {
		if (this.adding) return;
		this.adding = true;
		this.produzioneService.addOrdine(this.data).subscribe({
			complete: () => {
				this.router.navigate(["/produzione"]);
			},
			error: error => {
				this.outputMessageService.showError("Errore durante l'inserimento dell'ordine di produzione. " + ((error?.error?.message) ?? ""));
				this.adding = false;
			},
		});
	}
	
}