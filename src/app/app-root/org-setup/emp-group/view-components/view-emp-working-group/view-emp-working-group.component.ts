import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { WorkingGroupService } from 'src/app/app-root/setup-service/org-setup/working-group/working-group.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpWorkingGroupComponent } from './add-emp-working-group/add-emp-working-group.component';
import { WorkingGroup } from './working-group.model';

@Component({
  selector: 'app-view-emp-working-group',
  templateUrl: './view-emp-working-group.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpWorkingGroupComponent {
  workinggroup$ = this.getWorkingGroup();
  isEmpty: boolean = false;
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
  dataSource!: MatTableDataSource<WorkingGroup>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private notification: NotifierService,
    private service: WorkingGroupService) {
    this.dataSource = new MatTableDataSource();
  }
  sortData(data: any) {

    data.sort = this.sort;

  }


  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'workingGroup', permision);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getWorkingGroup(data?: PageEvent) {

    return this.service.getWorkingGroup().pipe(
      delay(300),
      map(workinggroup => {
        this.dataSource = new MatTableDataSource(workinggroup.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = workinggroup.data;
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
        this.service.deleteWorkingGroup(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Work Group Deleted Successfully', 2);
              this.workinggroup$ = this.getWorkingGroup();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Work Group', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpWorkingGroupComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getWorkingGroup(event);
  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let workingGroup = this.dialog.open(AddEmpWorkingGroupComponent, dialogConfig);
    workingGroup.afterClosed().subscribe(result => {
      if (result) {
        this.workinggroup$ = this.getWorkingGroup();
      }
    })
  }
  onNext() {
    this.subroot.nextStep()
  }
  onPrevious() {
    this.subroot.previousStep()
  }


}
