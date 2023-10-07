import {  Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { EmpCategoryService } from 'src/app/app-root/setup-service/org-setup/emp-category/emp-category.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { AddEmpCategoryComponent } from './add-emp-category/add-emp-category.component';
import { EmpCategory } from './emp-category-model';


@Component({
  selector: 'app-view-emp-category',
  templateUrl: './view-emp-category.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpCategoryComponent {
  empcategory$=this.getEmpCategory();
  searchText:any;
  orderHeader:any;
  isDescOrder: boolean=true;
  isEmpty!:boolean;


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
  dataSource!: MatTableDataSource<EmpCategory>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog:MatDialog,
              private service:EmpCategoryService,
              
              private notification:NotifierService) {
                this.dataSource = new MatTableDataSource();

              }
              sortData(data: any) {
                data.sort = this.sort;
              }
          

              isEnable(permision:any){
                return  CommonMethods.userRole('organizationModule','employeeCategory',permision );
              }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


  getEmpCategory(data?: PageEvent) {
  return this.service.getEmpCategory().pipe(
    delay(300),
    map(empcategory => {
     this.dataSource = new MatTableDataSource(empcategory.data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;  
    this.dataSource.data = empcategory.data;
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
      this.service.deleteEmpCategory(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.notification.openSnackBar('Emp Category Deleted Successfully', 2);
            this.empcategory$=this.getEmpCategory();
          } else return;
        },
        (error: any) => {
          this.notification.openSnackBar('An error occurred while deleting the Emp Category', 2);
        }
      );
    } 
  })
}

edit(data: any) {
  this.dialog.open(AddEmpCategoryComponent, { data: data });
}

pageChanged(event: PageEvent) {
  this.pageDetails = event;
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.getEmpCategory(event);
}





    addNew(){ 
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;   
      let empCategory= this.dialog.open(AddEmpCategoryComponent,dialogConfig);
      empCategory.afterClosed().subscribe(result => {
        if(result){
          this.empcategory$=this.getEmpCategory();

        }
      })
  }

}
