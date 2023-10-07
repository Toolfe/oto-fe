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
import { KpiService } from '../../setup-service/task-master-setup/kpi/kpi.service';
import { AddKpiComponent } from './add-kpi/add-kpi.component';
import { Kpi } from './kpi.model';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent {
  kpi$ = this.getKpi();

  isEmpty!: boolean;
  searchText: any;
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['kpiCode', 'name', 'action'];
  dataSource!: MatTableDataSource<Kpi>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  tasksetup: any;
  constructor(private dialog: MatDialog,
    private service: KpiService,
    private notification: NotifierService,
  ) {

    this.dataSource = new MatTableDataSource();
  }

  sortData(data: any) {
    data.sort = this.sort;
  }


  isEnable(permision: any) {
    return CommonMethods.userRole('taskMasterModule', 'kpi', permision);
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
    let kpi = this.dialog.open(AddKpiComponent, dialogConfig);
    kpi.afterClosed().subscribe(res => {
      if (res) {
        this.kpi$ = this.getKpi();
      }
    })
  }



  getKpi(data?: PageEvent) {
    return this.service.getKpi().pipe(
      delay(300),
      map((kpi: any) => {

        this.dataSource = new MatTableDataSource(kpi.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = kpi.data;
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
        this.service.deleteKpi(data).subscribe((res: any) => {
          this.kpi$=this.getKpi();
          this.notification.openSnackBar(' Deleted Successfully', 2);
        })
      } else return;
    })


  }


  edit(data: any) {
    this.dialog.open(AddKpiComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getKpi(event);
  }


}
