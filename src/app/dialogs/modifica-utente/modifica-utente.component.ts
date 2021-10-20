import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utente } from 'src/app/models/utente';
import { OutputMessageService } from 'src/app/services/output-message.service';
import { UtenteService } from 'src/app/services/utente.service';
import { ModificaPasswordUtenteComponent } from '../modifica-password-utente/modifica-password-utente.component';

@Component({
	selector: 'app-modifica-utente',
	templateUrl: './modifica-utente.component.html',
	styleUrls: ['./modifica-utente.component.css']
})
export class ModificaUtenteComponent implements OnInit {
	public static reqWidth: number = 350;
	public data: Utente;
	
	roleList: ({ title: string, role: string, value: boolean })[];
	
	constructor(
		public dialogRef: MatDialogRef<ModificaUtenteComponent, Utente>,
		@Inject(MAT_DIALOG_DATA) private inputData: {i: Utente, mode: "update" | "insert"},
		private utenteService: UtenteService,
		public dialog: MatDialog,
		private outputMessageService: OutputMessageService,
	) {
		this.roleList = [
			{
				title: "Articoli",
				role: "ARTICOLO",
				value: false,
			},{
				title: "Produzione",
				role: "PRODUZIONE",
				value: false,
			},{
				title: "Gestione impianti di produzione",
				role: "IMPIANTO_DI_PRODUZIONE",
				value: false,
			},{
				title: "Utenti",
				role: "UTENTE",
				value: false,
			}
		];
		this.data = <any>{};
		for (let k in inputData.i) (<any>this.data)[k] = (<any>this.inputData.i)[k];
		for (let r of this.roleList) r.value = this.data.roles.includes(r.role);
	}
	
	ngOnInit(): void {
	}
	
	save(): void {
		let roles: string[] = [];
		for (let r of this.roleList) if (r.value) roles.push(r.role);
		this.data.roles = roles.join(",");
		for (let k in this.data) (<any>this.inputData.i)[k] = (<any>this.data)[k];
		let s = {
			complete: () => {
				this.data.password = undefined;
				this.dialogRef.close(this.data);
			},
			error: (err: any) => {
				let message = this.inputData.mode == "insert" ? "Errore durante l'inserimento dell'utente." : "Errore durante la modifica dell'utente.";
				this.outputMessageService.showError(message + " " + ((err?.error?.message) ?? ""));
			}
		};
		if (this.inputData.mode == "insert") {
			const dialogRef = this.dialog.open<ModificaPasswordUtenteComponent, {i: Utente, mode: "update" | "insert"}, Utente>(ModificaPasswordUtenteComponent, {
				width: ModificaPasswordUtenteComponent.reqWidth + 'px',
				data: {i: this.data, mode: "insert" },
			});
			dialogRef.afterClosed().subscribe(d => {
				this.utenteService.add(this.data).subscribe(s);
				this.data.password = undefined;
			});
			
		} else {
			this.utenteService.update(this.data).subscribe(s);
		}
		
	}
	
}

