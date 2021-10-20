import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { RettificaGiacenzaComponent } from 'src/app/dialogs/rettifica-giacenza/rettifica-giacenza.component';
import { Articolo } from 'src/app/models/articolo';
import { ArticoloService } from 'src/app/services/articolo.service';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';


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
	selector: 'app-magazzino',
	templateUrl: './magazzino.component.html',
	styleUrls: ['./magazzino.component.css']
})
export class MagazzinoComponent implements OnInit {
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
		public dialog: MatDialog,
		) {
		
	}
	
	applyFilters() {
		this.table.filter(this.filter.toLower);
	}
	
	ngOnInit(): void {
		this.titleService.setTitle("Magazzino");
	}
	
	modifica(ev: TableEvent<Articolo>) {
		const dialogRef = this.dialog.open<RettificaGiacenzaComponent, Articolo, null>(RettificaGiacenzaComponent, {
			width: RettificaGiacenzaComponent.reqWidth + 'px',
			data: ev.row,
		});
		dialogRef.afterClosed().subscribe(_ => this.table.refreshRow(ev.rowIndex));
	}
}
