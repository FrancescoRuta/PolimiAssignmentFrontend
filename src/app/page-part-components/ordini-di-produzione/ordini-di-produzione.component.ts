import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { OrdineDiProduzioneModificaQta } from 'src/app/dialogs/ordine-di-produzione-modifica-qta/ordine-di-produzione-modifica-qta.component';
import { Produzione } from 'src/app/models/produzione';
import { OutputMessageService } from 'src/app/services/output-message.service';
import { ProduzioneService } from 'src/app/services/produzione.service';

class Filter {
	constructor(
		public codice: string = "",
		public descrizione: string = "",
	) {
	}
	get toLower(): Filter {
		return new Filter(
			this.codice.toLowerCase(),
			this.descrizione.toLowerCase(),
		);
	}
	get toUpper(): Filter {
		return new Filter(
			this.codice.toUpperCase(),
			this.descrizione.toUpperCase(),
		);
	}
}

@Component({
	selector: 'app-ordini-di-produzione',
	templateUrl: './ordini-di-produzione.component.html',
	styleUrls: ['./ordini-di-produzione.component.css']
})
export class OrdiniDiProduzioneComponent implements OnInit {
	public filter: Filter = new Filter();
	
	@ViewChild("table")
	set table(table: TableComponent<Produzione, Filter>) {
		this.table_ = table;
		table.setApiGet(() => this.produzioneService.getOrdiniDiProduzione());
		table.filterPredicate = (value, f) => {
			return value.articoloProdotto!.codice.toLowerCase().includes(f.codice) && value.articoloProdotto!.descrizione.toLowerCase().includes(f.descrizione);
		};
	};
	get table(): TableComponent<Produzione, Filter> {
		return this.table_;
	}
	private table_!: TableComponent<Produzione, Filter>;
	
	constructor(
		private produzioneService: ProduzioneService,
		public router: Router,
		private dialog: MatDialog,
		private outputMessageService: OutputMessageService,
		) {
		
	}
	
	applyFilters() {
		this.table.filter(this.filter.toLower);
	}
	
	ngOnInit(): void {
		
	}
	
	async deleteRow(ev: TableEvent<Produzione>) {
		if (await this.outputMessageService.askDeleteConfirm("Sei sicuro di voler annullare questo ordine di produzione?")) {
			this.produzioneService.annullaOrdineDiProduzioneById(ev.row.id!).subscribe({
				complete: () => this.table.refresh(),
				error: (err: any) => this.outputMessageService.showError("Errore durante l'annullamento dell'ordine di produzione. " + ((err?.error?.message) ?? ""))
			});
		}
	}
	
	modifica(ev: TableEvent<Produzione>) {
		const dialogRef = this.dialog.open<OrdineDiProduzioneModificaQta, Produzione, null>(OrdineDiProduzioneModificaQta, {
			width: OrdineDiProduzioneModificaQta.reqWidth + 'px',
			data: ev.row,
		});
		dialogRef.afterClosed().subscribe(_ => this.table.refreshRow(ev.rowIndex));
	}

}
