import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImpiantoDiProduzione } from 'src/app/models/impianto-di-produzione';
import { ImpiantoDiProduzioneService } from 'src/app/services/impianto-di-produzione.service';
import { OutputMessageService } from 'src/app/services/output-message.service';

@Component({
	selector: 'app-modifica-impianto-di-produzione',
	templateUrl: './modifica-impianto-di-produzione.component.html',
	styleUrls: ['./modifica-impianto-di-produzione.component.css']
})
export class ModificaImpiantoDiProduzioneComponent implements OnInit {
	public static reqWidth: number = 350;
	public data: ImpiantoDiProduzione;
	
	constructor(
		public dialogRef: MatDialogRef<ModificaImpiantoDiProduzioneComponent, ImpiantoDiProduzione>,
		@Inject(MAT_DIALOG_DATA) private inputData: {i: ImpiantoDiProduzione, mode: "update" | "insert"},
		private impiantoDiProduzioneService: ImpiantoDiProduzioneService,
		private outputMessageService: OutputMessageService,
	) {
		this.data = <any>{};
		for (let k in inputData.i) (<any>this.data)[k] = (<any>this.inputData.i)[k];
	}
	
	ngOnInit(): void {
	}
	
	save(): void {
		for (let k in this.data) (<any>this.inputData.i)[k] = (<any>this.data)[k];
		let s = {
			complete: () => {
				this.dialogRef.close(this.data);
			},
			error: (err: any) => {
				this.outputMessageService.showError("Errore durante la modifica dell'impianto di produzione. " + ((err?.error?.message) ?? ""));
			}
		};
		if (this.inputData.mode == "insert") {
			this.impiantoDiProduzioneService.add(this.data).subscribe(s);
		} else {
			this.impiantoDiProduzioneService.update(this.data).subscribe(s);
		}
		
	}
	
}

