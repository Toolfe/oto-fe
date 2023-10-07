import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddType1Component } from './add-type1/add-type1.component';

@Component({
  selector: 'app-type1',
  templateUrl: './type1.component.html',
  styleUrls: ['./type1.component.scss']
})
export class Type1Component implements OnInit {

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;
  isEmpty:boolean=false;

  searchText: any;

  displayedColumns: string[] = ['docCode', 'docCode', 'docTitle','docDate','unit','dept','businessPartner','project','externalRef','customizedDate','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog:MatDialog,) { }

  ngOnInit(): void {
  }


  addNew(){
    this.dialog.open(AddType1Component);
  }
}
