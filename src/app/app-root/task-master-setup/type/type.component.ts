import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { FetchCommon } from '../../setup-service/common-function/fetch-common';
import { DeptService } from '../../setup-service/org-setup/dept/dept.service';
import { TypeService } from '../../setup-service/task-master-setup/type/type.service';
import { AddTypeComponent } from './add-type/add-type.component';
import { Type } from './type.model';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
type$=this.getType();

dept$: any;
isEmpty!:boolean;
searchText:any;

totalRows = 0;
pageSize = 30;
currentPage = 0;
pageSizeOptions: number[] = [ 30, 50, 100];
pageDetails!: PageEvent;

creation!: boolean;
selection!:boolean;
updation!: boolean;
deletion!: boolean;



displayedColumns: string[] = ['code','name','scaleValue','department', 'expectation', 'action'];
dataSource!: MatTableDataSource<Type>;

@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort)
sort!: MatSort;
  constructor(private dialog:MatDialog,
              private fetch:FetchCommon,
              private service:TypeService,
              private notification:NotifierService,
              private dept:DeptService
             
              ) { 
                this.dataSource = new MatTableDataSource();

              }
              sortData(data: any) {

                data.sort = this.sort;
          
              }
 isEnable(permision:any){
   return  CommonMethods.userRole('taskMasterModule','type',permision );
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}



getDept(){
this.dept.getDepartment().subscribe((res:any)=>{
  this.dept$=res.content
  
})
}



addNew(){ 
  const dialogConfig = new MatDialogConfig();  
  dialogConfig.disableClose = true;  
  dialogConfig.autoFocus = true;   
  let type =this.dialog.open(AddTypeComponent,dialogConfig);
  type.afterClosed().subscribe(res=>{
    if(res=='done')
    {
      this.type$=this.getType();
      this.dataSource.data=this.dataSource.data.concat(res);
    }
  });
}

edit(data: any) {
  let update=  this.dialog.open(AddTypeComponent, { data: data });
  update.afterClosed().subscribe(res=>{
    if(res=='done'){
      this.type$=this.getType();
    }
  })
  }

 updateDept(){
    this.fetch.getName(this.type$,this.dept$,'department','departmentName')
  }

  
  getType(data?: PageEvent) {
    return  this.service.getType().pipe(
      delay(300),
      map((type: any) => {
        this.dataSource = new MatTableDataSource(type.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
        this.dataSource.data = type.data;
        return true;}),
        catchError((err: any) => of('error')));
   }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteType(data).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(x => x.id != data.id);
          this.notification.openSnackBar('Deleted Successfully', 2);
        },
        error => {
          console.log('Error occurred while deleting:', error);
          this.notification.openSnackBar('Error occurred while deleting', 2);
        });
      }
    });
  
  }



  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getType(event);
  }
 
}
