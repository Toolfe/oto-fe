import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { OrderSetupService } from '../../setup-service/order-setup/order-setup.service';
import { AddOrderNumberComponent } from '../add-order-number/add-order-number.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { Project } from '../project.model';

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.scss']
})
export class OrderNumberComponent implements OnInit {
  order$ = this.getOrder();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;

  isEmpty!: boolean;


  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  displayedColumns: string[] = ['code', 'orderNo', 'orderDetails', 'action'];
  dataSource!: MatTableDataSource<Project>;
  dataSource$ = of(new MatTableDataSource());
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: OrderSetupService,
    private notification: NotifierService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('projectModule', 'project', permision);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getOrder(data?: PageEvent) {
    return this.service.getOrder().pipe(
      delay(300),
      map(order => {
        this.dataSource$ = of(new MatTableDataSource(order.data));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = order.data;
        return this.dataSource.data;
      }),
      catchError((err) => of('error')))
  }

  edit(data: any) {
    let update = this.dialog.open(AddOrderNumberComponent, { data: data });
    update.afterClosed().subscribe(result => {
      if (result) {
        this.order$ = this.getOrder();
      }
    })
  }
  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteOrder(data).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(x => x.id != data.id);
          this.notification.openSnackBar(' Deleted Successfully', 2);
        })
      } else return;
    })


  }


  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let project = this.dialog.open(AddOrderNumberComponent, dialogConfig);
    project.afterClosed().subscribe(result => {
      if (result) {
        this.order$ = this.getOrder();
      }

    })
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getOrder(event);
  }

  sortData(data: any) {
    data.sort = this.sort;
  }


}
