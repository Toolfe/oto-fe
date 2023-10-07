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
import { StatusService } from '../../setup-service/task-master-setup/status/status.service';
import { AddStatusComponent } from './add-status/add-status.component';
import { Status } from './status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  status$ = this.getStatus();
  isEmpty!: Boolean;
  searchText: any;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  displayedColumns: string[] = ['genericStatus', 'customizedStatus', 'action'];
  dataSource!: MatTableDataSource<Status>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: StatusService,
    private notification: NotifierService
  ) { 
    this.dataSource = new MatTableDataSource();
  }
  sortData(data: any) {

    data.sort = this.sort;

  }

  isEnable(permision:any){
    return  CommonMethods.userRole('taskMasterModule','status',permision );
   }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let status = this.dialog.open(AddStatusComponent, dialogConfig);
    status.afterClosed().subscribe(res => {
      if (res) {
         this. status$ = this.getStatus();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatus(data?: PageEvent) {
    return this.service.getStatus().pipe(
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
        this.service.deleteStatus(data).subscribe((res: any) => {
          this. status$ = this.getStatus();
          this.notification.openSnackBar(' Deleted Successfully', 2);
        })
      } else return;
    })


  }


  edit(data: any) {
    this.dialog.open(AddStatusComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getStatus(event);
  }

}
