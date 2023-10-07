import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { IndustryService } from 'src/app/app-root/setup-service/org-setup/industry/industry.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpIndustryComponent } from './add-emp-industry/add-emp-industry.component';
import { Industry } from './industry.model';

@Component({
  selector: 'app-view-emp-industry',
  templateUrl: './view-emp-industry.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpIndustryComponent {
  industry$ = this.getIndustry();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;
  $industry: any;

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
  dataSource!: MatTableDataSource<Industry>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private service: IndustryService,
    private notification: NotifierService) {

    this.dataSource = new MatTableDataSource();
  }
  sortData(data: any) {
    data.sort = this.sort;
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'industry', permision);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getIndustry(data?: PageEvent) {

    return this.service.getIndustry().pipe(
      delay(300),
      map(industry => {
        this.dataSource = new MatTableDataSource(industry.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = industry.data;
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
        this.service.deleteIndustry(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Industry Deleted Successfully', 2);
              this.industry$ = this.getIndustry();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Industry', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpIndustryComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getIndustry(event);
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let industry = this.dialog.open(AddEmpIndustryComponent, dialogConfig);
    industry.afterClosed().subscribe(res => {
      if (res) {
        this.industry$ = this.getIndustry();
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
