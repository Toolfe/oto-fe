import { Component,  ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { Type1Service } from 'src/app/app-root/setup-service/business-contact-setup/type1/type1.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { AddType1Component } from './add-type1/add-type1.component';
import { Type1 } from './contact-type1.model';

@Component({
  selector: 'app-contact-type1',
  templateUrl: './contact-type1.component.html',
  styleUrls: ['./contact-type1.component.scss']
})
export class ContactType1Component  {

  type1$=this.getType1();
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;

  searchText: any;
  index!: number;
  id!: number;
  dataLength!: number;
  isEmpty!:Boolean;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['contactType1', 'description', 'action'];
  dataSource!: MatTableDataSource<Type1>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: Type1Service,
    private notification: NotifierService) { 
      this.dataSource = new MatTableDataSource();
    }
    
 sortData(data: any) {
  data.sort = this.sort;
}
    isEnable(permision:any){
      return  CommonMethods.userRole('contactModule','contactType1',permision );
    }
     



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getType1(data?: PageEvent) {
     return this.service.getType1().pipe(
      delay(300),
      map(type1 => {
       this.dataSource = new MatTableDataSource(type1.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = type1.data;
      return true;
     }),
      
       catchError((err)=>of('error')))
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteType1(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Business Partner Type 1 Deleted Successfully', 2);
              this.type1$=this.getType1();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Business Partner Type 1', 2);
          }
        );
      }
    })
  }

  edit(data: any) {
    this.dialog.open(AddType1Component, { data: data });

  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let contactType1=this.dialog.open(AddType1Component, dialogConfig);
    contactType1.afterClosed().subscribe(res=>{
      if(res)
      {
        this.type1$=this.getType1();
      }
    })
  }


  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getType1(event);
  }

}
