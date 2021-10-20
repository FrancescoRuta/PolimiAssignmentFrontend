import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articolo } from 'src/app/models/articolo';
import { ArticoloService } from 'src/app/services/articolo.service';
import { OutputMessageService } from 'src/app/services/output-message.service';

@Component({
	selector: 'app-rettifica-giacenza',
	templateUrl: './rettifica-giacenza.component.html',
	styleUrls: ['./rettifica-giacenza.component.css']
})
export class RettificaGiacenzaComponent implements OnInit {
	public static reqWidth: number = 350;
	data: Articolo;
	
	constructor(
		private articoloService: ArticoloService,
		public dialogRef: MatDialogRef<RettificaGiacenzaComponent, null>,
		@Inject(MAT_DIALOG_DATA) private inputData: Articolo,
		private outputMessageService: OutputMessageService,
	) {
		this.data = <any>{};
		for (let k in inputData) (<any>this.data)[k] = (<any>this.inputData)[k];
	}
	
	ngOnInit(): void {
	}
	
	save(): void {
		for (let k in this.data) (<any>this.inputData)[k] = (<any>this.data)[k];
		this.articoloService.rettificaGiacenza(this.data.id!, this.data.qtaGiacenza!).subscribe({
			complete: () => this.dialogRef.close(),
			error: (err: any) => {
				this.outputMessageService.showError("Errore durante la rettifica della giacenza. " + ((err?.error?.message) ?? ""));
			}
		});
	}
}
