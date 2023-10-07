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
import { RatingService } from '../../setup-service/task-master-setup/rating/rating.service';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { Rating } from './rating.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  rating$ = this.getRating();
  isEmpty!: boolean;
  searchText: any;
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;



  displayedColumns: string[] = ['code', 'value', 'action'];
  dataSource!: MatTableDataSource<Rating>;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: RatingService,
    private notification: NotifierService) {
    this.dataSource = new MatTableDataSource();

  }

  sortData(data: any) {
    data.sort = this.sort;
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('taskMasterModule', 'rating', permision);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let rating = this.dialog.open(AddRatingComponent, dialogConfig);
    rating.afterClosed().subscribe(res => {
      if (res) {
        this.rating$ = this.getRating();
      }
    })
  }


  getRating(data?: PageEvent) {
    return this.service.getRating().pipe(
      delay(300),
      map((type: any) => {
        this.dataSource = new MatTableDataSource(type.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = type.data;
        return true;
      }),
      catchError((err: any) => of('error')));
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteRating(data).subscribe((res: any) => {
          this.rating$ = this.getRating();
          this.notification.openSnackBar(' Deleted Successfully', 2);
        })
      } else return;
    })


  }


  edit(data: any) {
    this.dialog.open(AddRatingComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getRating(event);
  }


}
