import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { ModificaPasswordUtenteComponent } from 'src/app/dialogs/modifica-password-utente/modifica-password-utente.component';
import { ModificaUtenteComponent } from 'src/app/dialogs/modifica-utente/modifica-utente.component';
import { ImpiantoDiProduzione } from 'src/app/models/impianto-di-produzione';
import { Utente } from 'src/app/models/utente';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';
import { OutputMessageService } from 'src/app/services/output-message.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
	selector: 'app-utenti',
	templateUrl: './utenti.component.html',
	styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit {
	@ViewChild("table")
	set table(table: TableComponent<Utente, null>) {
		this.table_ = table;
		table.setApiGet(() => this.utenteService.getAll());
	};
	get table(): TableComponent<Utente, null> {
		return this.table_;
	}
	private table_!: TableComponent<Utente, null>;
	
	constructor(
		private titleService: ObservableTitle,
		private utenteService: UtenteService,
		public router: Router,
		public dialog: MatDialog,
		private outputMessageService: OutputMessageService,
		) {
		
	}
	
	ngOnInit(): void {
		this.titleService.setTitle("Utenti");
	}
	
	nuovo() {
		const dialogRef = this.dialog.open<ModificaUtenteComponent, {i: Utente, mode: "update" | "insert"}, ImpiantoDiProduzione>(ModificaUtenteComponent, {
			width: ModificaUtenteComponent.reqWidth + 'px',
			data: {i: { username: "", roles: "" }, mode: "insert"}
		});
		dialogRef.afterClosed().subscribe(_ => this.table.refresh());
	}
	
	modifica(ev: TableEvent<Utente>) {
		const dialogRef = this.dialog.open<ModificaUtenteComponent, {i: Utente, mode: "update" | "insert"}, ImpiantoDiProduzione>(ModificaUtenteComponent, {
			width: ModificaUtenteComponent.reqWidth + 'px',
			data: {i: ev.row, mode: "update"},
		});
		dialogRef.afterClosed().subscribe(_ => this.table.refreshRow(ev.rowIndex));
	}
	
	async deleteRow(ev: TableEvent<Utente>) {
		if (await this.outputMessageService.askDeleteConfirm("Sei sicuro di voler eliminare questo utente?")) {
			this.utenteService.elimina(ev.row.id!).subscribe({
				complete: () => this.table.refresh(),
				error: (err: any) => this.outputMessageService.showError("Errore durante l'eliminazione dell'utente. " + ((err?.error?.message) ?? ""))
			});
		}
	}
	
	modificaPassword(ev: TableEvent<Utente>) {
		const dialogRef = this.dialog.open<ModificaPasswordUtenteComponent, {i: Utente, mode: "update" | "insert"}, Utente>(ModificaPasswordUtenteComponent, {
			width: ModificaPasswordUtenteComponent.reqWidth + 'px',
			data: { i: ev.row, mode: "update" },
		});
	}
}
