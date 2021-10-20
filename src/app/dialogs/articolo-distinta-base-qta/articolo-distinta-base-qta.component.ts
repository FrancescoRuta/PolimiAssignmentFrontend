import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticoloDistintaBase } from 'src/app/models/articolo-distinta-base';
import { OutputMessageService } from 'src/app/services/output-message.service';

@Component({
	selector: 'app-articolo-distinta-base-qta',
	templateUrl: './articolo-distinta-base-qta.component.html',
	styleUrls: ['./articolo-distinta-base-qta.component.css']
})
export class ArticoloDistintaBaseQtaComponent implements OnInit {
	public static reqWidth: number = 350;
	data: ArticoloDistintaBase;
	
	constructor(
		public dialogRef: MatDialogRef<ArticoloDistintaBaseQtaComponent, ArticoloDistintaBase>,
		@Inject(MAT_DIALOG_DATA) private inputData: ArticoloDistintaBase,
		private outputMessageService: OutputMessageService
	) {
		this.data = <any>{};
		for (let k in inputData) (<any>this.data)[k] = (<any>this.inputData)[k];
	}
	
	ngOnInit(): void {
	}
	
	save(): void {
		if (this.data.qta <= 0) {
			this.outputMessageService.showError("La quantità deve essere maggiore di zero.");
			return;
		}
		for (let k in this.data) (<any>this.inputData)[k] = (<any>this.data)[k];
		this.dialogRef.close(this.data);
	}
	
}
