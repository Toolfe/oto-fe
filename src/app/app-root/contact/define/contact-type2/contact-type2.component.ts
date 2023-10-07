import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { Type2Service } from 'src/app/app-root/setup-service/contact-setup/type2/type2.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { AddType2Component } from './add-type2/add-type2.component';
import { Type2 } from './contact-type2';

@Component({
  selector: 'app-contact-type2',
  templateUrl: './contact-type2.component.html',
  styleUrls: ['./contact-type2.component.scss']
})
export class ContactType2Component  {
  type2$=this.getType2();
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;

  searchText: any;
  isEmpty!:Boolean;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;
 

  displayedColumns: string[] = ['contactType2', 'description', 'action'];
  dataSource!: MatTableDataSource<Type2>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(private dialog: MatDialog,
    private service: Type2Service,
    private notification: NotifierService) { 
    this.dataSource = new MatTableDataSource();
    }
    
 sortData(data: any) {
  data.sort = this.sort;
}

    isEnable(permision:any){
      return  CommonMethods.userRole('contactModule','contacType2',permision );
    }
     


 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getType2(data?: PageEvent) {
     return this.service.getType2().pipe(
      delay(300),
      map(type2 => {
       this.dataSource = new MatTableDataSource(type2.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = type2.data;
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
        this.service.deleteType2(data).subscribe((res: any) => {
          this.dataSource.data = this.dataSource.data.filter(x=>x.id!=data.id);
          this.notification.openSnackBar('Contact Type2 Deleted Successfully', 2);
        })
      } else return;
    })
  }

  edit(data: any) {
    this.dialog.open(AddType2Component,{ data: data });
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let contactType2 =this.dialog.open(AddType2Component, dialogConfig);
    contactType2.afterClosed().subscribe(res=>{
      if(res)
      {
        this.dataSource.data=this.dataSource.data.concat(res);
      }
    })
  }
  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getType2(event);
  }

}


