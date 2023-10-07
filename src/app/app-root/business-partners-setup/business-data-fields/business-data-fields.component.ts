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
import { CategoryService } from '../../setup-service/business-contact-setup/business-category/business-category.service';
import { BusinessCategory } from './businessdataField.model';
import { AddBusinessDatafieldsComponent } from './add-business-datafields/add-business-datafields.component';

@Component({
  selector: 'app-business-data-fields',
  templateUrl: './business-data-fields.component.html',
  styleUrls: ['./business-data-fields.component.scss']
})
export class BusinessDataFieldsComponent {
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
  displayedColumns: string[] = ['category', 'description', 'action'];
  dataSource!: MatTableDataSource<BusinessCategory>;

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




  getCategory(data?: PageEvent) {                 //edit for getting sting to array object issue
    return this.service.getCategory().pipe(
      delay(300),
      map(category => {
        this.dataSource = new MatTableDataSource(category.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = category.data;
        return true;
      }),
      catchError((err) => of('error'))
    );
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
    let category = this.dialog.open(AddBusinessDatafieldsComponent, dialogConfig);
    category.afterClosed().subscribe(result => {
      if (result) {
        this.category$ = this.getCategory();
      }
    })
  }


  edit(data: any) {
    let update= this.dialog.open(AddBusinessDatafieldsComponent, { data: data });
    update.afterClosed().subscribe(res=>{
      if(res=='done'){
        this.category$ = this.getCategory();
      }
    })
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteCategory(data).subscribe((res: any) => {
          if (res.success) {
            this.category$ = this.getCategory();
            this.notification.openSnackBar('BusinessCategory Deleted Successfully', 2);
          } else {
            this.notification.openSnackBar('Business Category in Use', 2);
          }
        });
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getCategory(this.pageDetails);
  }
}
