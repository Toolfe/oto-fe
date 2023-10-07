import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { ContactSetupService } from 'src/app/app-root/setup-service/contact-setup/contact-setup.service';
import { SubCategoryService } from 'src/app/app-root/setup-service/contact-setup/sub-category/sub-category.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { SubCategory } from './subcategory.model';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent {
  subcategory$ = this.getSubCategory();
  isLoading = false;
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 30, 50, 100];
  pageDetails!: PageEvent;

  searchText: any;
  index!: number;
  id!: number;
  dataLength!: number;
  isEmpty!: boolean;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['subCategory', 'description', 'action'];
  dataSource!: MatTableDataSource<SubCategory>;

  constructor(private dialog: MatDialog,
    private contact: ContactSetupService,
    private service: SubCategoryService,
    private notification: NotifierService) {
    this.dataSource = new MatTableDataSource();
  }

  sortData(data: any) {
    data.sort = this.sort;
  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  isEnable(permision: any) {
    return CommonMethods.userRole('contactModule', 'contactSubCategory', permision);
  }


  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let subCategory = this.dialog.open(AddSubCategoryComponent, dialogConfig);
    subCategory.afterClosed().subscribe(res => {
      if (res) {
        this.dataSource.data = this.dataSource.data.concat(res);
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
        this.service.deleteSubCategory(data).subscribe((res: any) => {
          this.dataSource.data = this.dataSource.data.filter(x => x.id != data.id);
          this.notification.openSnackBar('Sub Category Deleted Successfully', 2);
        })
      } else return;
    })


  }

  edit(data: any) {
    this.dialog.open(AddSubCategoryComponent, { data: data });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSubCategory(data?: PageEvent) {
    return this.service.getSubCategory().pipe(
      delay(300),
      map(subcategory => {
        this.dataSource = new MatTableDataSource(subcategory.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = subcategory.data;
        return true;
      }),

      catchError((err) => of('error')))
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getSubCategory(this.pageDetails);
  }

}
