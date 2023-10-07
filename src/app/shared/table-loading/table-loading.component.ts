import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-loading',
  templateUrl: './table-loading.component.html',
  styleUrls: ['./table-loading.component.scss']
})
export class TableLoadingComponent implements OnInit {

  loading:number[]=[1,2,3,4,5]
  constructor() { }

  ngOnInit(): void {
  }

}
