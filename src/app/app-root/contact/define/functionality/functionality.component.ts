import { Component,  ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { FunctionalityService } from 'src/app/app-root/setup-service/business-contact-setup/business-functionality/business-functionality.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { AddFunctionalityComponent } from './add-functionality/add-functionality.component';
import { Functionality } from './functionality.model';
import { ContactFunctionalityService } from 'src/app/app-root/setup-service/contact-setup/functionality/functionality.service';

@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.scss']
})
export class FunctionalityComponent  {
  functionality$=this.getFunctionality();
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;
  isEmpty!:Boolean;

  searchText: any;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['functionality', 'description', 'action'];
  dataSource!: MatTableDataSource<Functionality>;
  constructor(private dialog: MatDialog,
    private service: ContactFunctionalityService,
    private notification: NotifierService) {

      this.dataSource = new MatTableDataSource();
     }

     
     sortData(data: any) {
      data.sort = this.sort;
    }


     isEnable(permision:any){
      return  CommonMethods.userRole('contactModule','functionality',permision );
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFunctionality(data?: PageEvent) {
     return this.service.getFunctionality().pipe(
      delay(300),
      map(functionality => {
       this.dataSource = new MatTableDataSource(functionality.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = functionality.data;
      return true;
     }),
      
       catchError((err)=>of('error')))
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteFunctionality(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Contact Functionality Deleted Successfully', 2);
              this.dataSource.data = this.dataSource.data.filter(x => x.id !== data.id);
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Contact Functionality', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddFunctionalityComponent, { data: data });
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let functionality=this.dialog.open(AddFunctionalityComponent, dialogConfig);
    functionality.afterClosed().subscribe(res=>{
      if(res)
      {
        this.getFunctionality().subscribe(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    })
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getFunctionality(event);
  }

}
