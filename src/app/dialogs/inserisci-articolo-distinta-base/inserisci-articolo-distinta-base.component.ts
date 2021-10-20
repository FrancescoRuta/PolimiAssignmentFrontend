import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Articolo } from 'src/app/models/articolo';
import { ArticoloDistintaBase } from 'src/app/models/articolo-distinta-base';
import { ArticoloService } from 'src/app/services/articolo.service';
import { ArticoloDistintaBaseQtaComponent } from '../articolo-distinta-base-qta/articolo-distinta-base-qta.component';


@Component({
	selector: 'app-inserisci-articolo-distinta-base',
	templateUrl: './inserisci-articolo-distinta-base.component.html',
	styleUrls: ['./inserisci-articolo-distinta-base.component.css']
})
export class InserisciArticoloDistintaBaseComponent implements OnInit {
	public static reqWidth: number = 600;
	apiGetArticoli: () => Observable<Articolo[]>;
	
	constructor(
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<InserisciArticoloDistintaBaseComponent, ArticoloDistintaBase>,
		@Inject(MAT_DIALOG_DATA) private _data: null,
		private articoloService: ArticoloService,
	) {
		this.apiGetArticoli = () => this.articoloService.getAll();
	}
	
	save(articolo: Articolo): void {
		const dialogRef = this.dialog.open<ArticoloDistintaBaseQtaComponent, ArticoloDistintaBase, ArticoloDistintaBase>(ArticoloDistintaBaseQtaComponent, {
			width: ArticoloDistintaBaseQtaComponent.reqWidth + 'px',
			data: {
				articolo,
				qta: 0
			},
		});
		dialogRef.afterClosed().subscribe(result => result != null ? this.dialogRef.close(result) : undefined);
	}
	
	ngOnInit(): void {
	}
	
}
