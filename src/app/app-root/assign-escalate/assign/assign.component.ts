import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { AssignService } from '../../setup-service/assign-setup/assign/assign.service';
import { FetchCommon } from '../../setup-service/common-function/fetch-common';
import { EmployeeService } from '../../setup-service/emp-setup/employee/employee.service';
import { DeptService } from '../../setup-service/org-setup/dept/dept.service';
import { TypeService } from '../../setup-service/task-master-setup/type/type.service';
import { AddAssignComponent } from './add-assign/add-assign.component';
import { Assign } from './assign.model';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  assign$=this.getAssign();
  $department:any;
  $type:any;
  type:any;
  $employee:any;
  empName:any;
  assign:any;
  emp:any;
  typeName:any;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [ 30, 50, 100];
  pageDetails!: PageEvent;
  isEmpty!:boolean;

  searchText: any;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['taskType', 'priority', 'department','count','empId','action'];
  dataSource!: MatTableDataSource<Assign>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog:MatDialog,
              private service:AssignService,           
              private fetch:FetchCommon,
              private dept:DeptService,
              private taskType:TypeService,
              private empservice:EmployeeService,
              private notification:NotifierService,

              ) {
                this.dataSource = new MatTableDataSource();
               }
               sortData(data: any) {
                data.sort = this.sort;
              }
          
               isEnable(permision:any){
                return  CommonMethods.userRole('assignModule','assignDetails',permision );
               }
             

  ngOnInit(): void {
    this.getEmployee();
    this.getAssign();
    this.getTaskType();
    this.getDept();
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





 

  getEmployee(){
    this.empservice.getEmployee().subscribe((res:any)=>{
      this.$employee=res.content;
      
     
    })
  }


  
  getEmpName(emp:any){
    let name:any;
    emp.forEach((data:any)=>{
      if(data.fname){
        name=data.fname
      }
  })
  return name;
  }


 
updateNames(){
  this.fetch.getName(this.assign,this.$department,'department','departmentName')
  this.fetch.getName(this.assign,this.$type,'typeId','taskTypeName')
 

}

 

    edit(data: any) {
     let update= this.dialog.open(AddAssignComponent, { data: data });
     update.afterClosed().subscribe(res=>{
      if(res=="done"){
        this.assign$=this.getAssign();
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
          this.service.delete(data).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(x=>x.id!=data.id);
            this.notification.openSnackBar(' Deleted Successfully', 2);
          })
        } else return;
      })
    
    
    }

  

  getAssign(data?: PageEvent) {
     return this.service.getAssign().pipe(
      delay(300),
      map(assign => {
       this.dataSource = new MatTableDataSource(assign.content);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = assign.content;
      return true;
     }),
      
       catchError(()=>of('error')))
  } 

  addNew(){ 
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;   
    let assign= this.dialog.open(AddAssignComponent,dialogConfig);
    assign.afterClosed().subscribe(res=>{
      if(res){
        this.assign$=this.getAssign();
      }
    });
}

pageChanged(event: PageEvent) {
  this.pageDetails = event;
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.assign$=this.getAssign(event);
}

getTaskType(){
  this.taskType.getType().subscribe((res:any)=>{
    this.$type=res.content
    
  });
}

getEmp(){
  this.empservice.getEmployee().subscribe(()=>{
  
    });
}

getDept(){
  this.dept.getDepartment().subscribe(()=>{
    
  });
}

  }
