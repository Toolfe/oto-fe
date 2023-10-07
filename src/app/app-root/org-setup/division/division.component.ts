import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { DivisionService } from '../../setup-service/org-setup/division/division.service';
import { Division } from './division.model';
import { ViewDivisionComponent } from './view-division/view-division.component';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent {
  division$=this.getDivision();

  searchText:any;
  orderHeader:any;
  isDescOrder: boolean=true;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;



  displayedColumns: string[] = ['code','name', 'description', 'action'];
  dataSource!: MatTableDataSource<Division>;
  dataSource$= of(new MatTableDataSource());
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog:MatDialog,
              private service:DivisionService,
              private notification:NotifierService,          
    ) {
      this.dataSource = new MatTableDataSource();
     
    }
    sortData(data: any) {
      data.sort = this.sort;
    }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


isEnable(permision:any){
  return  CommonMethods.userRole('organizationModule','division',permision );
}


getDivision(data?: PageEvent) {
  return this.service.getDivision().pipe(delay(100),
    map(division => {
      this.dataSource$= of(new MatTableDataSource(division.data));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
     this.dataSource.data = division.data;
      return division.data;
    }),
    catchError((err) => of('error'))
  )
  
}
deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteDivision(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Division Deleted Successfully', 2);
              this.division$ = this.getDivision();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Division', 2);
          }
        );
      } 
    })


  }

  edit(data: any) {
    this.dialog.open(ViewDivisionComponent, { data: data });
  }


    addNew(){ 
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;   
    let division=this.dialog.open(ViewDivisionComponent,dialogConfig);
    division.afterClosed().subscribe(result => {   
      if (result) {
        this.division$ = this.getDivision();
      } 
    } )
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getDivision(event);
  }
}
