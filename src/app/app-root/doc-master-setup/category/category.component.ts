import {  Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { Category } from '../../contact/define/category/category.model';
import { DocCategoryService } from '../../setup-service/doc-master-setup/category/category.service';
import { AddCategoryComponent } from './add-category/add-category.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent{
category$=this.getDocCategory();
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

  displayedColumns: string[] = ['code','name', 'deptName','action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private dialog:MatDialog,
    private service:DocCategoryService,
    private notification:NotifierService,
   ) { 
    this.dataSource = new MatTableDataSource();

   }
   sortData(data: any) {
    data.sort = this.sort;
  }

   isEnable(permision:any){
    return  CommonMethods.userRole('documentMasterModule','category',permision );
   }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

edit(data: any) {
  this.dialog.open(AddCategoryComponent, { data: data });
}



  addNew(){
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;   
    let category=this.dialog.open(AddCategoryComponent,dialogConfig)
    category.afterClosed().subscribe(res=>{
      if(res){
        this.dataSource.data=this.dataSource.data.concat(res);
      }
    })
  }

  getDocCategory(data?: PageEvent) {
  return this.service.getcategory().pipe(
    delay(300),
    map(category => {
     this.dataSource = new MatTableDataSource(category.data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;  
    this.dataSource.data = category.data;
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
        this.service.deleteCategory(data).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(x=>x.id!=data.id);
          this.notification.openSnackBar('Category Deleted Successfully', 2);
        })
      } else return;
    })


  }


    pageChanged(event: PageEvent) {
      this.pageDetails = event;
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.getDocCategory(event);
    }
}
