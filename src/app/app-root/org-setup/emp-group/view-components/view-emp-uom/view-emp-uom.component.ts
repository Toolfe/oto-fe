import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { UomService } from 'src/app/app-root/setup-service/org-setup/uom/uom.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpUomComponent } from './add-emp-uom/add-emp-uom.component';
import { Uom } from './uom.model';

@Component({
  selector: 'app-view-emp-uom',
  templateUrl: './view-emp-uom.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpUOmComponent {
  uom$ = this.getUom();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;

  $uoms: any;

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
  dataSource!: MatTableDataSource<Uom>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private notification: NotifierService,
    private service: UomService) {
    this.dataSource = new MatTableDataSource();
  }
  sortData(data: any) {
    data.sort = this.sort;
  }
  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'uoms', permision);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUom(data?: PageEvent) {

    return this.service.getUom().pipe(
      delay(300),
      map(uom => {
        this.dataSource = new MatTableDataSource(uom.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = uom.data;
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
        this.service.deleteUom(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Uom Deleted Successfully', 2);
              this.uom$ = this.getUom();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Uom', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpUomComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getUom(event);
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let uom = this.dialog.open(AddEmpUomComponent, dialogConfig);
    uom.afterClosed().subscribe(res => {
      if (res) {
        this.uom$ = this.getUom();
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
