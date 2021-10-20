import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class OutputMessageService {

	constructor(private dialog: MatDialog) { }
	
	public showError(message: string): Promise<void> {
		return new Promise(resolve => {
			const dialogRef = this.dialog.open<ErrorDialogComponent, string, boolean>(ErrorDialogComponent, {
				width: ErrorDialogComponent.reqWidth + 'px',
				data: message,
			});
			dialogRef.afterClosed().subscribe(() => resolve());
		});
	}
	
	public askDeleteConfirm(message: string): Promise<boolean> {
		return new Promise(resolve => {
			const dialogRef = this.dialog.open<DeleteConfirmDialogComponent, string, boolean>(DeleteConfirmDialogComponent, {
				width: DeleteConfirmDialogComponent.reqWidth + 'px',
				data: message,
			});
			dialogRef.afterClosed().subscribe(d => resolve(d === true));
		});
	}
	
}
