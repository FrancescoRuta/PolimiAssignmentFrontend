import { Component, OnInit } from '@angular/core';
import { ObservableTitle } from 'src/app/services/observable-title.ts.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

	constructor(private titleService: ObservableTitle) { }

	ngOnInit(): void {
		this.titleService.setTitle("Benvenuto");
	}

}
