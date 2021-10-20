import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { OutputMessageService } from 'src/app/services/output-message.service';

@Component({
	selector: 'app-modifica-password-utente-corrente',
	templateUrl: './modifica-password-utente-corrente.component.html',
	styleUrls: ['./modifica-password-utente-corrente.component.css']
})
export class ModificaPasswordUtenteCorrenteComponent implements OnInit {
	public static reqWidth: number = 350;
	vecchiaPassword: string;
	password: string;
	ripetiPassword: string;
	
	constructor(
		public dialogRef: MatDialogRef<ModificaPasswordUtenteCorrenteComponent, null>,
		@Inject(MAT_DIALOG_DATA) private _data: null,
		private authenticationService: AuthenticationService,
		private outputMessageService: OutputMessageService,
	) {
		this.vecchiaPassword = "";
		this.password = "";
		this.ripetiPassword = "";
	}
	
	ngOnInit(): void {
	}
	
	save(): void {
		if (this.password != this.ripetiPassword) {
			this.outputMessageService.showError("Le password non corrispondono.");
			return;
		}
		this.authenticationService.changeCurrentUserPassword(this.vecchiaPassword, this.password).subscribe({
			complete: () => {
				this.dialogRef.close();
			},
			error: (err: any) => {
				this.outputMessageService.showError("Errore durante la modifica della password. " + ((err?.error?.message) ?? ""));
			}
		});
	}
	
}

