import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { Produzione } from 'src/app/models/produzione';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';
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
	selector: 'app-produzioni-effettuate',
	templateUrl: './produzioni-effettuate.component.html',
	styleUrls: ['./produzioni-effettuate.component.css']
})
export class ProduzioniEffettuateComponent implements OnInit {
	public filter: Filter = new Filter();
	
	@ViewChild("table")
	set table(table: TableComponent<Produzione, Filter>) {
		this.table_ = table;
		table.setApiGet(() => this.produzioneService.getProduzioniEffettuate());
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
		) {
		
	}
	
	applyFilters() {
		this.table.filter(this.filter.toLower);
	}
	
	ngOnInit(): void {
	}
	
	elimina(ev: TableEvent<Produzione>) {
		
	}
}
