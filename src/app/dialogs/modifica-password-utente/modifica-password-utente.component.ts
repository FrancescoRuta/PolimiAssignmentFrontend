import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utente } from 'src/app/models/utente';
import { OutputMessageService } from 'src/app/services/output-message.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
	selector: 'app-modifica-password-utente',
	templateUrl: './modifica-password-utente.component.html',
	styleUrls: ['./modifica-password-utente.component.css']
})
export class ModificaPasswordUtenteComponent implements OnInit {
	public static reqWidth: number = 350;
	public data: Utente;
	ripetiPassword: string;
	
	constructor(
		public dialogRef: MatDialogRef<ModificaPasswordUtenteComponent, Utente>,
		@Inject(MAT_DIALOG_DATA) private inputData: {i: Utente, mode: "update" | "insert"},
		private utenteService: UtenteService,
		private outputMessageService: OutputMessageService,
	) {
		this.data = <any>{};
		for (let k in inputData.i) (<any>this.data)[k] = (<any>this.inputData.i)[k];
		this.data.password = "";
		this.ripetiPassword = "";
	}
	
	ngOnInit(): void {
	}
	
	save(): void {
		if (this.data.password != this.ripetiPassword) {
			this.outputMessageService.showError("Le password non corrispondono.");
			return;
		}
		for (let k in this.data) (<any>this.inputData.i)[k] = (<any>this.data)[k];
		if (this.inputData.mode == "insert") {
			this.dialogRef.close(this.data);
		} else {
			this.utenteService.updatePassword(this.data).subscribe({
				complete: () => {
					this.data.password = undefined;
					this.dialogRef.close(this.data);
				},
				error: (err: any) => {
					this.outputMessageService.showError("Errore durante la modifica della password. " + ((err?.error?.message) ?? ""));
				}
			});
		}
		
	}
	
}

