import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { Articolo } from 'src/app/models/articolo';

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
	selector: 'app-seleziona-articolo',
	templateUrl: './seleziona-articolo.component.html',
	styleUrls: ['./seleziona-articolo.component.css']
})
export class SelezionaArticoloComponent implements OnInit {
	public filter: Filter = new Filter();
	@Output()
	selected: EventEmitter<Articolo> = new EventEmitter<Articolo>();
	@Input()
	apiGet!: () => Observable<Articolo[]>;
	
	@ViewChild("table")
	set table(table: TableComponent<Articolo, Filter>) {
		this.table_ = table;
		table.setApiGet(this.apiGet);
		table.filterPredicate = (value, f) => {
			return value.codice.toLowerCase().includes(f.codice) && value.descrizione.toLowerCase().includes(f.descrizione);
		};
	};
	get table(): TableComponent<Articolo, Filter> {
		return this.table_;
	}
	private table_!: TableComponent<Articolo, Filter>;
	
	constructor() { }
	
	select(ev: TableEvent<Articolo>): void {
		this.selected.emit(ev.row);
	}
	
	ngOnInit(): void {
	}
	
	applyFilters() {
		this.table.filter(this.filter.toLower)
	}
	
}
