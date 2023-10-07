import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { CategoryService } from '../../setup-service/contact-setup/category/category.service';
import { ContactSetupService } from '../../setup-service/contact-setup/contact-setup.service';
import { Category } from '../define/category/category.model';
import { AddDatafieldsComponent } from './add-datafields/add-datafields.component';

@Component({
  selector: 'app-data-fields',
  templateUrl: './data-fields.component.html',
  styleUrls: ['./data-fields.component.scss']
})
export class DataFieldsComponent {
  category$ = this.getCategory();
  dataField$: any;
  fieldEmpty: Boolean = false;
  catName: string = '';
  field$: any;
  isEmpty!: boolean;

  searchText: any;


  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['category', 'description', 'Fileds', 'action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: CategoryService,

    private notification: NotifierService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  sortData(data: any) {
    data.sort = this.sort;
  }
  
  isEnable(permision: any) {
    return CommonMethods.userRole('contactModule', 'contactCategory', permision);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  getCategory(data?: PageEvent) {
    return this.service.getCategory().pipe(
      delay(300),
      map(category => {
        console.log(category.data);
        this.dataSource = new MatTableDataSource(category.data);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = category.data;
        return true;
      }),
      catchError((err) => of('error')))
  }

  myFields(value: any) {
    switch (value) {
      case 1: this.field$ = 'Text'
        break;
      case 2: this.field$ = 'Drop down'
        break;
      case 3: this.field$ = 'Number'
        break;
      case 4: this.field$ = 'Radio group'
        break;
    }
  }
  addnew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let category = this.dialog.open(AddDatafieldsComponent, dialogConfig);
    category.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.concat(result);
      }
    })
  }


  edit(data: any) {
    this.dialog.open(AddDatafieldsComponent, { data: data });

  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteCategory(data).subscribe((res: any) => {
          this.dataSource.data = this.dataSource.data.filter(x => x.id != data.id);
          this.notification.openSnackBar('Category Deleted Successfully', 2);
        })
      } else return;
    })


  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getCategory(this.pageDetails);
  }
}
