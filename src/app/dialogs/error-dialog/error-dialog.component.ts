import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-error-dialog',
	templateUrl: './error-dialog.component.html',
	styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
	public static reqWidth: number = 350;
	
	constructor(
		public dialogRef: MatDialogRef<ErrorDialogComponent, void>,
		@Inject(MAT_DIALOG_DATA) public message: string,
	) { }
	
	ngOnInit(): void {
	}
	
}
