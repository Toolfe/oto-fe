import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { DesignationService } from 'src/app/app-root/setup-service/org-setup/designation/designation.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpDesignationComponent } from './add-emp-designation/add-emp-designation.component';

import { Designation } from './designation-model';

@Component({
  selector: 'app-view-emp-designation',
  templateUrl: './view-emp-designation.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpDesignationComponent {
  designation$ = this.getDesignation();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;
  $designation: any;

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
  dataSource!: MatTableDataSource<Designation>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private service: DesignationService,
    private notification: NotifierService) {
    this.dataSource = new MatTableDataSource();
  }

  sortData(data: any) {
    data.sort = this.sort;
  }


  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'designation', permision);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDesignation(data?: PageEvent) {

    return this.service.getDesignation().pipe(
      delay(300),
      map(designation => {
        this.dataSource = new MatTableDataSource(designation.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = designation.data;
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
        this.service.deleteDesignation(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Designation Deleted Successfully', 2);
              this.designation$ = this.getDesignation();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Designation', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpDesignationComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getDesignation(event);
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let designation = this.dialog.open(AddEmpDesignationComponent, dialogConfig);
    designation.afterClosed().subscribe(res => {
      if (res) {
        this.designation$ = this.getDesignation();
      }
    });
  }
  onNext() {
    this.subroot.nextStep();

  }
  onPrevious() {
    this.subroot.previousStep();
  }

}
