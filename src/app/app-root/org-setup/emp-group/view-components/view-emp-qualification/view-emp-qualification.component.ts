import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { QualificationService } from 'src/app/app-root/setup-service/org-setup/qualification/qualification.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpQualificationComponent } from './add-emp-qualification/add-emp-qualification.component';
import { Qualification } from './qualification.model';

@Component({
  selector: 'app-view-emp-qualification',
  templateUrl: './view-emp-qualification.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpQualificationComponent  {
  qualification$=this.getQualification();
  searchText:any;
  orderHeader:any;
  isDescOrder: boolean=true;
  isEmpty!:boolean;
  $qualification:any;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['name', 'description', 'action'];
  dataSource!: MatTableDataSource<Qualification>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog:MatDialog,
              private subroot:EmpGroupComponent,
              private service:QualificationService,
              private notification:NotifierService) {
                this.dataSource = new MatTableDataSource();
              }
              sortData(data: any) {

                data.sort = this.sort;
          
              }

              isEnable(permision:any){
                return  CommonMethods.userRole('organizationModule','qualification',permision );
              }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getQualification(data?: PageEvent) {
  
    return this.service.getQualification().pipe(
      delay(300),
      map(qualification => {
       this.dataSource = new MatTableDataSource(qualification.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = qualification.data;
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
        this.service.deleteQualification(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Qualification Deleted Successfully', 2);
              this. qualification$=this.getQualification();
            }  else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Qualification', 2);
          }
        );
      } 
    })
  
  
  }
  
  edit(data: any) {
    this.dialog.open(AddEmpQualificationComponent, { data: data });
  }
  
  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getQualification(event);
  }
    addNew(){ 
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;   
      let empQualification=this.dialog.open(AddEmpQualificationComponent,dialogConfig);
      empQualification.afterClosed().subscribe(result=>{
        if(result){
	   this. qualification$=this.getQualification();
        }
      })
  }
       onNext(){
         this.subroot.nextStep()
       }
       onPrevious(){
         this.subroot.previousStep()
       }
}
