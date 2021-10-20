import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-delete-confirm-dialog',
	templateUrl: './delete-confirm-dialog.component.html',
	styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent implements OnInit {
	public static reqWidth: number = 350;
	
	constructor(
		public dialogRef: MatDialogRef<DeleteConfirmDialogComponent, boolean>,
		@Inject(MAT_DIALOG_DATA) public message: string,
	) { }
	
	ngOnInit(): void {
	}
}
