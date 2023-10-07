import { Component,  ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { Category } from './category.model';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ContactCategoryService } from 'src/app/app-root/setup-service/contact-setup/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  {
  category$=this.getCategory();
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;
  isEmpty!:Boolean;

  searchText: any;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['Contact category', 'description', 'action'];
  dataSource!: MatTableDataSource<Category>;
  constructor(private dialog: MatDialog,
    private service: ContactCategoryService,
    private notification: NotifierService) {

      this.dataSource = new MatTableDataSource();
     }
     sortData(data: any) {
      data.sort = this.sort;
    }


     isEnable(permision:any){
      return  CommonMethods.userRole('contactModule','functionality',permision );
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
      map(functionality => {
       this.dataSource = new MatTableDataSource(functionality.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = functionality.data;
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
        this.service.deleteCategory(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Contact category Deleted Successfully', 2);
              this.dataSource.data = this.dataSource.data.filter(x => x.id !== data.id);
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Contact category', 2);
          }
        );
      }
    })
  }

  edit(data: any) {
    this.dialog.open(AddCategoryComponent, { data: data });
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let category=this.dialog.open(AddCategoryComponent, dialogConfig);
    category.afterClosed().subscribe(res=>{
      if(res)
      {
        this.category$=this.getCategory() ;
      }
    })
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getCategory(event);
  }

}