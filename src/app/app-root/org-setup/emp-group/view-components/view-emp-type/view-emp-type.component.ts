import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { EmpTypeService } from 'src/app/app-root/setup-service/org-setup/emp-type/emp-type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpTypeComponent } from './add-emp-type/add-emp-type.component';
import { EmpType } from './add-emp-type/emp-type.model';

@Component({
  selector: 'app-view-emp-type',
  templateUrl: './view-emp-type.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpTypeComponent {
  emptype$ = this.getEmpType();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;
  $type: any;

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
  dataSource!: MatTableDataSource<EmpType>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private notification: NotifierService,
    private service: EmpTypeService) {
    this.dataSource = new MatTableDataSource();
  }
  sortData(data: any) {
    data.sort = this.sort;
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'employeeType', permision);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmpType(data?: PageEvent) {

    return this.service.getEmpType().pipe(
      delay(300),
      map(emptype => {
        this.dataSource = new MatTableDataSource(emptype.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = emptype.data;
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
        this.service.deleteEmpType(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Emp Type Deleted Successfully', 2);
              this.emptype$ = this.getEmpType();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Emp Type', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpTypeComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getEmpType(event);
  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let type = this.dialog.open(AddEmpTypeComponent, dialogConfig);
    type.afterClosed().subscribe(res => {
      if (res) {
        this.emptype$ = this.getEmpType();

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
