import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

import { EmpGroupService } from 'src/app/app-root/setup-service/org-setup/emp-group/emp-group.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { OrgSetupService } from '../../../../setup-service/org-setup/org-setup.service';
import { OrgSetupRootComponent } from '../../../org-setup-root/org-setup-root.component';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpGroupComponent } from './add-emp-group/add-emp-group.component';
import { EmpGroup } from './emp-group-model';

@Component({
  selector: 'app-view-emp-group',
  templateUrl: './view-emp-group.component.html',
  styleUrls: ['./view-emp-group.component.scss']
})
export class ViewEmpGroupComponent {
  empgroup$ = this.getEmpGroup();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;
  $empGroup: any;

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
  dataSource!: MatTableDataSource<EmpGroup>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: EmpGroupService,
    private notification: NotifierService,
  ) {
    this.dataSource = new MatTableDataSource();

  }
  sortData(data: any) {
    data.sort = this.sort;
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'employeeGroup', permision);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getEmpGroup(data?: PageEvent) {

    return this.service.getEmpGroup().pipe(
      delay(300),
      map(empgroup => {
        this.dataSource = new MatTableDataSource(empgroup.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = empgroup.data;
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
        this.service.deleteEmpGroup(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Emp Group Deleted Successfully', 2);
              this.empgroup$ = this.getEmpGroup();

            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Emp Group', 2);
          }
        );
      }
    })
  }

  edit(data: any) {
    this.dialog.open(AddEmpGroupComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getEmpGroup(event);
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let group = this.dialog.open(AddEmpGroupComponent, dialogConfig);
    group.afterClosed().subscribe(res => {
      if (res) {
        this.empgroup$ = this.getEmpGroup();

      }
    });
  }

}
