import { Component, ContentChild, Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type ColumnType = "text" | "button" | "datetime";
export type TableEvent<T> = { rowIndex: number, row: T };

@Directive({
	selector: 'column-directive'
})
export class ColumnDirective {}

@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.css']
})
export class ColumnComponent<T> implements OnInit {
	@Input()
	type: ColumnType = "text";
	@Input()
	data: any;
	@Input()
	title: string | null = null;
	@Input()
	width: number | null = null;
	@Output()
	click: EventEmitter<TableEvent<T>> = new EventEmitter<TableEvent<T>>();
	
	constructor() { }

	ngOnInit(): void {
	}
	
	public getOnClick(): EventEmitter<TableEvent<T>> {
		return this.click;
	}
	public getType(): ColumnType {
		return this.type;
	}
	public getData(): any {
		return this.data ?? this.getDataFromTitle();
	}
	public getTitle(): string {
		return this.title ?? "";
	}
	public getWidth(): number | null {
		return this.width;
	}
	private getDataFromTitle(): string {
		let t = this.getTitle().split(" ").filter(s => s != "").map(s => s[0].toUpperCase() + s.substring(1).toLowerCase()).join("");
		t = t[0].toLowerCase() + t.substring(1);
		return t;
	}

}
