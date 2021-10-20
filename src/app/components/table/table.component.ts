import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription } from "rxjs";
import { OutputMessageService } from "src/app/services/output-message.service";
import { ColumnComponent, ColumnType, TableEvent } from "../column/column.component";

export interface TableColumn<T> {
	type: ColumnType,
	title: string,
	data: any,
	width: number | null,
	onClick: EventEmitter<TableEvent<T>>;
}

@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.css"],
})
export class TableComponent<T, F> {
	@Output()
	btnclick = new EventEmitter<[number, T]>();
	columns: TableColumn<T>[] = [];
	dataSource: MatTableDataSource<T>;
	private data!: T[];
	@ContentChildren(ColumnComponent)
	set children(value: QueryList<ColumnComponent<T>>) {
		this.setColumns(value.toArray());
		value.changes.subscribe({
			next: _ => {
				this.setColumns(value.toArray());
			}
		});
	}
	
	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator | null = null;
	@ViewChild(MatSort, {static: false}) sort: MatSort | null = null;
	private apiGet: (() => Observable<T[]>);

	constructor(
		private outputMessageService: OutputMessageService,
	) {
		this.dataSource = new MatTableDataSource<T>([]);
		this.dataSource.sortingDataAccessor = (item: any, property: string) => {
			let p = property.split(".");
			for (let i = 0; i < p.length; ++i) item = item[p[i]];
			return item;
		};
		this.apiGet = () => new Observable(res => {
			res.next([]);
			res.complete();
		});
		this.refresh();
	}
	
	private setColumns(ccs: ColumnComponent<T>[]) {
		let columns: TableColumn<T>[] = [];
		for(let cc of ccs) {
			columns.push({
				type: cc.getType(),
				data: cc.getData(),
				title: cc.getTitle(),
				width: cc.getWidth(),
				onClick: cc.getOnClick(),
			})
		}
		this.columns = columns;
	}
	
	public set filterPredicate(value: ((data: T, filter: F) => boolean)) {
		this.dataSource.filterPredicate = value as any;
	}
	
	public filter(filter: F) {
		this.dataSource.filter = filter as any;
	}
	
	public setApiGet(fn: () => Observable<T[]>) {
		this.apiGet = fn;
		setTimeout(() => this.refresh(), 1);
	}
	
	public refresh() {
		
		let dataGet: Observable<T[]> = this.apiGet();
		let data: T[] | null = null;
		dataGet.subscribe({
			next: (value: T[]) => {
				if (data == null) data = value; else data.push(...value);
			},
			error: (err: any) =>{
				this.outputMessageService.showError("Errore durante l'ottenimento delle righe dal server. " + ((err?.error?.message) ?? ""));
			},
			complete: () => {
				if (data) {
					this.data = data;
					this.refreshView();
				}
			}
		});
	}
	
	get keys(): string[] {
		return this.columns.map(c => c.data);
	}
	
	btnClick(columnIndex: number, rowIndex: number, row: T) {
		this.columns[columnIndex].onClick.emit({ rowIndex, row });
		this.btnclick.emit([columnIndex, row]);
	}
	
	public refreshView() {
		this.dataSource.data = this.data;
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
	}
	
	public addRow(row: T) {
		this.data.push(row);
		this.refreshView();
	}
	
	public removeRow(rowIndex: number) {
		this.data.splice(rowIndex, 1);
		this.refreshView();
	}
	
	public refreshRow(rowIndex: number) {
		this.data[rowIndex] = {...this.data[rowIndex]};
		this.refreshView();
	}
	
}
