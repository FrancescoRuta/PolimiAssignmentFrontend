import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { Articolo } from 'src/app/models/articolo';
import { ArticoloService } from 'src/app/services/articolo.service';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';
import { OutputMessageService } from 'src/app/services/output-message.service';


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
	selector: 'app-articoli',
	templateUrl: './articoli.component.html',
	styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
	public filter: Filter = new Filter();
	
	@ViewChild("table")
	set table(table: TableComponent<Articolo, Filter>) {
		this.table_ = table;
		table.setApiGet(() => this.articoloService.getAll());
		table.filterPredicate = (value, f) => {
			return value.codice.toLowerCase().includes(f.codice) && value.descrizione.toLowerCase().includes(f.descrizione);
		};
	};
	get table(): TableComponent<Articolo, Filter> {
		return this.table_;
	}
	private table_!: TableComponent<Articolo, Filter>;
	
	constructor(
		private titleService: ObservableTitle,
		private articoloService: ArticoloService,
		public router: Router,
		private outputMessageService: OutputMessageService,
		) {
		
	}
	
	applyFilters() {
		this.table.filter(this.filter.toLower);
	}
	
	ngOnInit(): void {
		this.titleService.setTitle("Articoli");
	}
	
	async deleteArticolo(ev: TableEvent<Articolo>) {
		if (await this.outputMessageService.askDeleteConfirm("Sei sicuro di voler eliminare questo articolo?")) {
			this.articoloService.elimina(ev.row.id!).subscribe({
				complete: () => this.table.refresh(),
				error: (err: any) => this.outputMessageService.showError("Errore durante l'eliminazione dell'articolo. " + ((err?.error?.message) ?? ""))
			});
		}
	}
	
	modifica(ev: TableEvent<Articolo>) {
		this.router.navigate(["/articoli/modifica"], { queryParams: { id: ev.row.id } });
	}

}
