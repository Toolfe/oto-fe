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
import { FetchCommon } from '../../setup-service/common-function/fetch-common';
import { GroupService } from '../../setup-service/task-master-setup/group/group.service';
import { TypeService } from '../../setup-service/task-master-setup/type/type.service';
import { AddGroupComponent } from './add-group/add-group.component';
import { Group } from './group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  group$ = this.getGroup();
  $type: any;
  searchText: any;
  isEmpty!: boolean;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['groupCode', 'name', 'taskType', 'action'];
  dataSource!: MatTableDataSource<Group>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: GroupService,
    private type: TypeService,
    private notification: NotifierService,
    private fetch: FetchCommon
  ) {
    this.dataSource = new MatTableDataSource();
  }

  sortData(data: any) {
    data.sort = this.sort;
  }

  isEnable(permission: any) {
    return CommonMethods.userRole('taskMasterModule', 'group', permission);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTypes() {

    this.type.getType().subscribe((res: any) => {
      this.$type = res; // Assign the result to the $type variable
    });
  }


  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let group = this.dialog.open(AddGroupComponent, dialogConfig);
    group.afterClosed().subscribe((res) => {
      if (res) {
        this.group$ = this.getGroup();
      }
    });
  }

  getGroup(data?: PageEvent) {
    return this.service.getGroup().pipe(
      delay(300),
      map((group: any) => {
        this.dataSource = new MatTableDataSource(group.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        group.data.forEach((item: any) => {
          item.taskTypeObject
        });
        this.dataSource.data = group.data;
        return true;
      }),
      catchError((err: any) => of('error'))
    );
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.service.deleteGroup(data).subscribe((res: any) => {
          this.group$ = this.getGroup();
          this.notification.openSnackBar(' Deleted Successfully', 2);
        });
      } else return;
    });
  }

  edit(data: any) {
    let update = this.dialog.open(AddGroupComponent, { data: data });
    update.afterClosed().subscribe((res) => {
      if (res) {
        this.group$ = this.getGroup();
      }
    });
  }

  updateType() {
    this.fetch.getName(this.group$, this.$type, 'taskType', 'taskTypeName');
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getGroup(event);
  }
}
