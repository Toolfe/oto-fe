import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { CompanyService } from 'src/app/app-root/setup-service/org-setup/company/company.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { OrgSetupService } from '../../../../setup-service/org-setup/org-setup.service';
import { OrgSetupRootComponent } from '../../../org-setup-root/org-setup-root.component';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpCompanyComponent } from './add-emp-company/add-emp-company.component';
import { EmpCompany } from './emp-company-model';


@Component({
  selector: 'app-view-emp-company',
  templateUrl: './view-emp-company.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpCompanyComponent {
  company$ = this.getCompany();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;
  $company: any;


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
  dataSource!: MatTableDataSource<EmpCompany>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private org: OrgSetupService,
    private root: OrgSetupRootComponent,
    private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private service: CompanyService,

    private notification: NotifierService) {
    this.dataSource = new MatTableDataSource();
  }
  sortData(data: any) {

    data.sort = this.sort;

  }

  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'company', permision);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  getCompany(data?: PageEvent) {

    return this.service.getCompany().pipe(
      delay(300),
      map(company => {
        this.dataSource = new MatTableDataSource(company.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = company.data;
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
        this.service.deleteCompany(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Emp Company Deleted Successfully', 2);
              this.company$ = this.getCompany();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Emp Company', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpCompanyComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getCompany(event);
  }


  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let company = this.dialog.open(AddEmpCompanyComponent, dialogConfig);
    company.afterClosed().subscribe(result => {
      if (result) {
        this.company$ = this.getCompany();
      }
    })
  }

}
