import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { LanguagesService } from 'src/app/app-root/setup-service/org-setup/languages/languages.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpLanguagesComponent } from './add-emp-languages/add-emp-languages.component';
import { Language } from './language.model';

@Component({
  selector: 'app-view-emp-languages',
  templateUrl: './view-emp-languages.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpLanguagesComponent {
  language$ = this.getLanguage();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;
  $language: any;

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
  dataSource!: MatTableDataSource<Language>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private service: LanguagesService,
    private notification: NotifierService) {
    this.dataSource = new MatTableDataSource();
  }


  sortData(data: any) {
    data.sort = this.sort;
  }



  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'language', permision);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getLanguage(data?: PageEvent) {

    return this.service.getLanguage().pipe(
      delay(300),
      map(language => {
        this.dataSource = new MatTableDataSource(language.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = language.data;
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
        this.service.deleteLanguage(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Language Deleted Successfully', 2);
              this.language$ = this.getLanguage();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Language', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpLanguagesComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getLanguage(event);
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let language = this.dialog.open(AddEmpLanguagesComponent, dialogConfig);
    language.afterClosed().subscribe(result => {
      if (result) {
        this.language$ = this.getLanguage();
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
