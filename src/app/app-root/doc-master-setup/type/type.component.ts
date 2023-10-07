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
import { Division } from '../../org-setup/division/division.model';
import { DocTypeService } from '../../setup-service/doc-master-setup/type/type.service';
import { AddTypeComponent } from './add-type/add-type.component';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
  docType$=this.getDoctype();
  searchText:any;
  orderHeader:any;
  isDescOrder: boolean=true;

  isEmpty!:boolean;
  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;



  displayedColumns: string[] = ['code','name', 'docCategory','action'];
  dataSource!: MatTableDataSource<Division>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
               private dialog:MatDialog,
               private service:DocTypeService,
                private notification:NotifierService
                ) { 
               
                  this.dataSource = new MatTableDataSource();
                  }
                
                  sortData(data: any) {

                    data.sort = this.sort;
              
                  }
                isEnable(permision:any){
                  return  CommonMethods.userRole('documentMasterModule','type',permision );
                 }
               
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNew(){
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;   
    let category=this.dialog.open(AddTypeComponent,dialogConfig)
    category.afterClosed().subscribe((res:any)=>{
      if(res=='done'){
        this.docType$=this.getDoctype();
      }
    })
  }

  getDoctype(data?: PageEvent) {
    return this.service.getType().pipe(
      delay(300),
      map(type => {
       this.dataSource = new MatTableDataSource(type.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = type.data;
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
          this.service.deleteType(data).subscribe((res: any) => {
            this.dataSource.data = this.dataSource.data.filter(x=>x.id!=data.id);
            this.notification.openSnackBar('Type Deleted Successfully', 2);
          })
        } else return;
      })
  
  
    }
    
  edit(data: any) {
   let update= this.dialog.open(AddTypeComponent, { data: data });
   update.afterClosed().subscribe(res=>{
    if(res=='done'){
      this.docType$=this.getDoctype();
    }
   })
  }
  
  
      pageChanged(event: PageEvent) {
        this.pageDetails = event;
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
      }

}
