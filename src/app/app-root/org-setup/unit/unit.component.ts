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
import { UnitService } from '../../setup-service/org-setup/unit/unit.service';
import { Unit } from './view-unit/unit-model';
import { ViewUnitComponent } from './view-unit/view-unit.component';



@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  unit$=this.getUnits();
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
  

 

  displayedColumns: string[] = ['code','name','locationName','divisionName', 'description', 'action'];
  dataSource!: MatTableDataSource<Unit>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

 
  constructor(private dialog:MatDialog,
    private service:UnitService,
    private notification:NotifierService    
   ) {
    this.dataSource = new MatTableDataSource();
   }
   
   sortData(data: any) {
    data.sort = this.sort;
  }

   isEnable(permision:any){
    return  CommonMethods.userRole('organizationModule','unit',permision );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


getUnits(data?: PageEvent) {
  return this.service.getUnit().pipe(
    delay(300),
    map(unit => {
     this.dataSource = new MatTableDataSource(unit.data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;  
    this.dataSource.data = unit.data;
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
      this.service.deleteUnit(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.notification.openSnackBar('Unit Deleted Successfully', 2);
            this.unit$=this.getUnits();
          } else {
            this.notification.openSnackBar('Failed to delete Unit', 2);
          }
        },
        (error: any) => {
          this.notification.openSnackBar('An error occurred while deleting the Unit', 2);
        }
      );
    } 
  })


}

edit(data: any) {
  this.dialog.open(ViewUnitComponent, { data: data });
}

 
pageChanged(event: PageEvent) {
  this.pageDetails = event;
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.getUnits(event);
}


  
    addNew(){ 
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;   
   let unit= this.dialog.open(ViewUnitComponent,dialogConfig);
   unit.afterClosed().subscribe(result => {
      if(result){
    this.unit$=this.getUnits();
      }
   })
  }


}
