import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticoloDistintaBase } from 'src/app/models/articolo-distinta-base';
import { Produzione } from 'src/app/models/produzione';
import { OutputMessageService } from 'src/app/services/output-message.service';
import { ProduzioneService } from 'src/app/services/produzione.service';

@Component({
	selector: 'app-ordine-di-produzione-modifica-qta',
	templateUrl: './ordine-di-produzione-modifica-qta.component.html',
	styleUrls: ['./ordine-di-produzione-modifica-qta.component.css']
})
export class OrdineDiProduzioneModificaQta implements OnInit {
	public static reqWidth: number = 350;
	data: Produzione;
	
	constructor(
		public dialogRef: MatDialogRef<OrdineDiProduzioneModificaQta, Produzione>,
		@Inject(MAT_DIALOG_DATA) private inputData: Produzione,
		private produzioneService: ProduzioneService,
		private outputMessageService: OutputMessageService,
	) {
		this.data = <any>{};
		for (let k in inputData) (<any>this.data)[k] = (<any>this.inputData)[k];
	}
	
	ngOnInit(): void {
	}
	
	save(): void {
		if (this.data.qtaProdotta <= 0) {
			this.outputMessageService.showError("La quantità deve essere maggiore di zero.");
			return;
		}
		for (let k in this.data) (<any>this.inputData)[k] = (<any>this.data)[k];
		this.produzioneService.updateQta(this.data).subscribe({
			complete: () => {
				this.dialogRef.close();
			},
			error: (err: any) => {
				this.outputMessageService.showError("Errore durante la modifica della quantità. " + ((err?.error?.message) ?? ""));
			}
		})
	}
	
}
