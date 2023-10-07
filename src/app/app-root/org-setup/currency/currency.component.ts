import {  Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewCurrencyComponent } from './view-currency/view-currency.component';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CurrenyService } from '../../setup-service/org-setup/currency/curreny.service';
import { Currency } from './currency.model';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  currency$=this.getCurrency();
  searchText:any;
  orderHeader:any;
  isDescOrder: boolean=true;
  isEmpty!:boolean;
  $subDept:any;
  $department:any;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

 

  displayedColumns: string[] = ['code','name','type', /* 'value', */ 'action'];
  dataSource!: MatTableDataSource<Currency>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private notification:NotifierService,
              private dialog:MatDialog,
              private service:CurrenyService) { }

  

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  



getCurrency(data?: PageEvent) {
  
 return this.service.getCurrency(data?.pageIndex, data?.pageSize).pipe(
    delay(300),
    map(currency => {
     this.dataSource = new MatTableDataSource(currency.content);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;  
    this.dataSource.data = currency.content;
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
      this.service.deleteCurrency(data).subscribe((res: any) => {
        this.dataSource.data = this.dataSource.data.filter(x=>x.id!=data.id);
        this.notification.openSnackBar(' Deleted Successfully', 2);
      })
    } else return;
  }) 


}

edit(data: any) {
  this.dialog.open(ViewCurrencyComponent, { data: data });
}

 
pageChanged(event: PageEvent) {
  this.pageDetails = event;
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.getCurrency();
}



 
addNew(){ 
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;   
  let currency= this.dialog.open(ViewCurrencyComponent,dialogConfig);
    currency.afterClosed().subscribe(res=>{
    if(res){
      this.dataSource.data=this.dataSource.data.concat(res);
    }
  }) 
}


}
