import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TableEvent } from 'src/app/components/column/column.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { ArticoloDistintaBase } from 'src/app/models/articolo-distinta-base';
import { DistintaBase } from 'src/app/models/distinta-base';
import { ArticoloDistintaBaseQtaComponent } from '../articolo-distinta-base-qta/articolo-distinta-base-qta.component';
import { InserisciArticoloDistintaBaseComponent } from '../inserisci-articolo-distinta-base/inserisci-articolo-distinta-base.component';

@Component({
	selector: 'app-inserisci-distinta-base',
	templateUrl: './modifica-distinta-base.component.html',
	styleUrls: ['./modifica-distinta-base.component.css']
})
export class ModificaDistintaBaseComponent implements OnInit {
	public static reqWidth: number = 650;
	@ViewChild("table")
	set table(table: TableComponent<ArticoloDistintaBase, null>) {
		this.table_ = table;
		table.setApiGet(() => new Observable<ArticoloDistintaBase[]>(sub => {
			sub.next(this.data.articoliDistintaBase);
			sub.complete();
		}));
	};
	get table(): TableComponent<ArticoloDistintaBase, null> {
		return this.table_;
	}
	private table_!: TableComponent<ArticoloDistintaBase, null>;
	data: DistintaBase;
	
	constructor(
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<ModificaDistintaBaseComponent, DistintaBase>,
		@Inject(MAT_DIALOG_DATA) private inputData: DistintaBase
	) {
		this.data = <any>{};
		for (let k in inputData) (<any>this.data)[k] = (<any>this.inputData)[k];
	}

	ngOnInit(): void {
	}
	
	save(): void {
		for (let k in this.data) (<any>this.inputData)[k] = (<any>this.data)[k];
		this.dialogRef.close(this.data);
	}

	inserisciArticoloDistintaBase(): void {
		const dialogRef = this.dialog.open<InserisciArticoloDistintaBaseComponent, null, ArticoloDistintaBase>(InserisciArticoloDistintaBaseComponent, {
			width: InserisciArticoloDistintaBaseComponent.reqWidth + 'px',
			data: null,
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != null)
				this.table.addRow(result);
		});
	}
	
	modificaQtaArticolo(ev: TableEvent<ArticoloDistintaBase>) {
		const dialogRef = this.dialog.open<ArticoloDistintaBaseQtaComponent, ArticoloDistintaBase, ArticoloDistintaBase>(ArticoloDistintaBaseQtaComponent, {
			width: ArticoloDistintaBaseQtaComponent.reqWidth + 'px',
			data: ev.row,
		});
		dialogRef.afterClosed().subscribe(_ => this.table.refreshRow(ev.rowIndex));
	}
	
	eliminaArticolo(ev: TableEvent<ArticoloDistintaBase>) {
		this.table.removeRow(ev.rowIndex);
	}
	
}
