import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/components/table/table.component';
import { ArticoloQtaUpdate } from 'src/app/models/articolo-qta-update';
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
	selector: 'app-movimenti-di-magazzino',
	templateUrl: './movimenti-di-magazzino.component.html',
	styleUrls: ['./movimenti-di-magazzino.component.css']
})
export class MovimentiDiMagazzinoComponent implements OnInit {
public filter: Filter = new Filter();
	
	@ViewChild("table")
	set table(table: TableComponent<ArticoloQtaUpdate, Filter>) {
		this.table_ = table;
		table.setApiGet(() => this.articoloService.movimenti());
		table.filterPredicate = (value, f) => {
			return value.articolo.codice.toLowerCase().includes(f.codice) && value.articolo.descrizione.toLowerCase().includes(f.descrizione);
		};
	};
	get table(): TableComponent<ArticoloQtaUpdate, Filter> {
		return this.table_;
	}
	private table_!: TableComponent<ArticoloQtaUpdate, Filter>;
	
	constructor(
		private titleService: ObservableTitle,
		private articoloService: ArticoloService,
		) {
		
	}
	
	applyFilters() {
		this.table.filter(this.filter.toLower);
	}
	
	ngOnInit(): void {
		this.titleService.setTitle("Movimenti di magazzino");
	}

}
