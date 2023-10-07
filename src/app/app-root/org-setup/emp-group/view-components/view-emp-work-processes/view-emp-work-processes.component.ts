import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { WorkProcessService } from 'src/app/app-root/setup-service/org-setup/work-process/work-process.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { AddEmpWorkProcessesComponent } from './add-emp-work-processes/add-emp-work-processes.component';
import { WorkProcess } from './workprocess.model';

@Component({
  selector: 'app-view-emp-work-processes',
  templateUrl: './view-emp-work-processes.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpWorkProcessesComponent {
  workprocess$ = this.getWorkProcess();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;
  $workProcess: any;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['name', 'description', 'action'];
  dataSource!: MatTableDataSource<WorkProcess>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: WorkProcessService,
    private notification: NotifierService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  sortData(data: any) {
    data.sort = this.sort;
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'workProcess', permision);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getWorkProcess(data?: PageEvent) {

    return this.service.getWorkProcess().pipe(
      delay(300),
      map(workprocess => {
        this.dataSource = new MatTableDataSource(workprocess.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = workprocess.data;
        return true;
      }),

      catchError(() => of('error')))
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteWorkProcess(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Work Process Deleted Successfully', 2);
              this.workprocess$ = this.getWorkProcess();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Work Process', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpWorkProcessesComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getWorkProcess(event);
  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let workProcess = this.dialog.open(AddEmpWorkProcessesComponent, dialogConfig);
    workProcess.afterClosed().subscribe(result => {
      if (result) {
        this.workprocess$ = this.getWorkProcess();
      }
    })
  }


}
