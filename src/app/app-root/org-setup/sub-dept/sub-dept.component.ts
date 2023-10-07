import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { SubDeptService } from '../../setup-service/org-setup/sub-dept/sub-dept.service';
import { ViewSubDeptComponent } from './view-sub-dept/view-sub-dept.component';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { SubDept } from './view-sub-dept/sub-dept.model';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';

@Component({
  selector: 'app-sub-dept',
  templateUrl: './sub-dept.component.html',
  styleUrls: ['./sub-dept.component.scss']
})
export class SubDeptComponent  {

  subDept$=this.getSubDept();
  searchText:any;
  orderHeader:any;
  isDescOrder: boolean=true;


  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['code','name','departmentCode', 'description', 'action'];
  dataSource!: MatTableDataSource<SubDept>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog:MatDialog,
    private service:SubDeptService,
    private notification:NotifierService
   ) { 
    this.dataSource = new MatTableDataSource();
   }
   sortData(data: any) {

    data.sort = this.sort;

  }

   isEnable(permision:any){
    return  CommonMethods.userRole('organizationModule','subDepartment',permision );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


getSubDept(data?: PageEvent) {
  return this.service.getSubDepartment().pipe(
    delay(300),
    map(subDept => {
     this.dataSource = new MatTableDataSource(subDept.data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;  
    this.dataSource.data = subDept.data;
    return true;
   }),
    
     catchError(()=>of('error')))
}

deleteItem(data: any) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
  confirmDelete.afterClosed().subscribe(result => {
    if (result == 'true') {
      this.service.deleteSubDepartment(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.notification.openSnackBar('Sub Department Deleted Successfully', 2);
            this.subDept$=this.getSubDept();
          } else {
            this.notification.openSnackBar('Failed to delete Sub Department', 2);
          }
        },
        (error: any) => {
          this.notification.openSnackBar('An error occurred while deleting the Sub Department', 2);
        }
      );
    } 
  })


}

edit(data: any) {
  this.dialog.open(ViewSubDeptComponent, { data: data });
}

 
pageChanged(event: PageEvent) {
  this.pageDetails = event;
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.getSubDept(event);
}

 
  addNew(){ 
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;   
  let subDept=this.dialog.open(ViewSubDeptComponent,dialogConfig);
  subDept.afterClosed().subscribe(res=>{
    if(res){
      this.subDept$=this.getSubDept();
    }
  })
}

}
