import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryService } from 'src/app/app-root/setup-service/business-contact-setup/business-category/business-category.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { BusinessCategory } from './businesscategory.model';
import { AddBusinessDatafieldsComponent } from '../../business-data-fields/add-business-datafields/add-business-datafields.component';
import { AddBusinessCategoryComponent } from './add-business-category/add-business-category.component';



@Component({
  selector: 'app-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss']
})
export class BusinessCategoryComponent {

  category$ = this.getCategory();
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;
  isEmpty!: boolean;

  searchText: any;

  displayedColumns: string[] = ['category', 'description', '', 'action'];
  dataSource!: MatTableDataSource<BusinessCategory>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog,
    private service: CategoryService,
    private notification: NotifierService,

  ) { }


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
      map(category => {
        this.dataSource = new MatTableDataSource(category.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = category.data;
        return true;
      }),

      catchError((err) => of('error')))
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteCategory(data).subscribe((res: any) => {
          this.category$ = this.getCategory();
          this.notification.openSnackBar('Category Deleted Successfully', 2);

        })
      } else return;
    })
  }

  edit(data: any) {
    let update = this.dialog.open(AddBusinessCategoryComponent, { data: data });
    //let update = this.dialog.open(AddGroupComponent, { data: data });
    update.afterClosed().subscribe((res) => {
      if (res) {
        this.category$ = this.getCategory();
      }
    });
  }


  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let category = this.dialog.open(AddBusinessDatafieldsComponent, dialogConfig);
    category.afterClosed().subscribe(res => {
      if (res) {
        this.category$ = this.getCategory();
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