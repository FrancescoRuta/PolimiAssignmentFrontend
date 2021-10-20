import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { ModificaDistintaBaseComponent } from 'src/app/dialogs/modifica-distinta-base/modifica-distinta-base.component';
import { Articolo } from 'src/app/models/articolo';
import { DistintaBase } from 'src/app/models/distinta-base';
import { ArticoloService } from 'src/app/services/articolo.service';

@Component({
	selector: 'app-articolo-form',
	templateUrl: './articolo-form.component.html',
	styleUrls: ['./articolo-form.component.css']
})
export class ArticoloFormComponent implements OnInit {
	@Input() data: Articolo = {
		codice: "",
		descrizione: "",
		unitaDiMisura: "NR",
		descrizioneEstesa: "",
		distinteBase: [],
	};
	@ViewChild("table")
	set table(table: TableComponent<DistintaBase, null>) {
		this.table_ = table;
		table.setApiGet(() => new Observable<DistintaBase[]>(sub => {
			sub.next(this.data.distinteBase);
			sub.complete();
		}));
	};
	get table(): TableComponent<DistintaBase, null> {
		return this.table_;
	}
	private table_!: TableComponent<DistintaBase, null>;
	@Output() save: EventEmitter<Articolo> = new EventEmitter<Articolo>();
	
	
	constructor(
		private articoloService: ArticoloService,
		public router: Router,
		public dialog: MatDialog,
	) { }

	ngOnInit(): void { }
	
	public inserisciDistintaBase() {
		const dialogRef = this.dialog.open<ModificaDistintaBaseComponent, DistintaBase, DistintaBase>(ModificaDistintaBaseComponent, {
			width: ModificaDistintaBaseComponent.reqWidth + 'px',
			data: {
				descrizione: "",
				articoliDistintaBase: [],
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != null)
				this.table.addRow(result);
		});
	}
	public modificaDistintaBase(ev: TableEvent<DistintaBase>) {
		const dialogRef = this.dialog.open<ModificaDistintaBaseComponent, DistintaBase, DistintaBase>(ModificaDistintaBaseComponent, {
			width: ModificaDistintaBaseComponent.reqWidth + 'px',
			data: ev.row,
		});
		dialogRef.afterClosed().subscribe(_ => this.table.refreshRow(ev.rowIndex));
	}
	public eliminaDistintaBase(ev: TableEvent<DistintaBase>) {
		this.table.removeRow(ev.rowIndex);
	}
	
	callSave() {
		this.save.emit(this.data);
	}
}
