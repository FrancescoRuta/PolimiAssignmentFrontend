import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { ModificaImpiantoDiProduzioneComponent } from 'src/app/dialogs/modifica-impianto-di-produzione/modifica-impianto-di-produzione.component';
import { ImpiantoDiProduzione } from 'src/app/models/impianto-di-produzione';
import { ImpiantoDiProduzioneService } from 'src/app/services/impianto-di-produzione.service';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';
import { OutputMessageService } from 'src/app/services/output-message.service';

@Component({
  selector: 'app-impianti-di-produzione',
  templateUrl: './impianti-di-produzione.component.html',
  styleUrls: ['./impianti-di-produzione.component.css']
})
export class ImpiantiDiProduzioneComponent implements OnInit {
	@ViewChild("table")
	set table(table: TableComponent<ImpiantoDiProduzione, null>) {
		this.table_ = table;
		table.setApiGet(() => this.impiantoDiProduzioneService.getAll());
	};
	get table(): TableComponent<ImpiantoDiProduzione, null> {
		return this.table_;
	}
	private table_!: TableComponent<ImpiantoDiProduzione, null>;
	
	constructor(
		private titleService: ObservableTitle,
		private impiantoDiProduzioneService: ImpiantoDiProduzioneService,
		public router: Router,
		public dialog: MatDialog,
		public outputMessageService: OutputMessageService,
		) {
		
	}
	
	ngOnInit(): void {
		this.titleService.setTitle("Impianti di produzione");
	}
	
	nuovo() {
		const dialogRef = this.dialog.open<ModificaImpiantoDiProduzioneComponent, {i: ImpiantoDiProduzione, mode: "update" | "insert"}, ImpiantoDiProduzione>(ModificaImpiantoDiProduzioneComponent, {
			width: ModificaImpiantoDiProduzioneComponent.reqWidth + 'px',
			data: {i: { nome: "" }, mode: "insert"}
		});
		dialogRef.afterClosed().subscribe(_ => this.table.refresh());
	}
	
	async deleteRow(ev: TableEvent<ImpiantoDiProduzione>) {
		if (await this.outputMessageService.askDeleteConfirm("Sei sicuro di voler eliminare questo impianto di produzione?")) {
			this.impiantoDiProduzioneService.elimina(ev.row.id!).subscribe({
				complete: () => this.table.refresh(),
				error: (err: any) => this.outputMessageService.showError("Errore durante l'eliminazione dell'impianto di produzione. " + ((err?.error?.message) ?? ""))
			});
		}
	}
	
	modifica(ev: TableEvent<ImpiantoDiProduzione>) {
		const dialogRef = this.dialog.open<ModificaImpiantoDiProduzioneComponent, {i: ImpiantoDiProduzione, mode: "update" | "insert"}, ImpiantoDiProduzione>(ModificaImpiantoDiProduzioneComponent, {
			width: ModificaImpiantoDiProduzioneComponent.reqWidth + 'px',
			data: {i: ev.row, mode: "update"},
		});
		dialogRef.afterClosed().subscribe(_ => this.table.refreshRow(ev.rowIndex));
	}
}
