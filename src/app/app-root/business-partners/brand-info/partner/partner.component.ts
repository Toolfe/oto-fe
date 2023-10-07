import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { BusinessPartnersService } from 'src/app/app-root/setup-service/business-partners/business-partners.service';
import { PartnerService } from 'src/app/app-root/setup-service/business-partners/partner/partner.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { BrandDetails } from '../../partner-model';
import { AddPartnerComponent } from '../add-partner/add-partner.component';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent{

  partnerBrands$=this.getPartnerBrands();
  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;

  searchText: any;
  index!: number;
  id!: number;
  dataLength!: number;
  isEmpty!:Boolean;

  creation!: boolean;
  selection!:boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['businessPartnerCode', 'businessPartnerName', 'businessPartnerDesc'];
  dataSource!: MatTableDataSource<BrandDetails>;
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: PartnerService,
    private notification: NotifierService) { 
      this.dataSource = new MatTableDataSource();
    }
  
 sortData(data: any) {
  data.sort = this.sort;
}
    isEnable(permision:any){
      return  CommonMethods.userRole('contactModule','contactType1',permision );
    }
     



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPartnerBrands(data?: PageEvent) {
     return this.service.getPartnerBrands().pipe(
      delay(300),
      map((brands) => {
       this.dataSource = new MatTableDataSource(brands);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = brands;
      return true;
     }),
      
       catchError((err)=>of('error')))
  }


  addNew() {
    let data:any={};
    data.method="create";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data=data;
    let dept = this.dialog.open(AddPartnerComponent, dialogConfig);
    dept.afterClosed().subscribe(res => {
      if (res) {
        this.dataSource.data = this.dataSource.data.concat(res);
     }
    });
  }

  edit(data: BrandDetails) {
    data.method="update"
    this.dialog.open(AddPartnerComponent, { data: data });
  }


  deleteItem(data: BrandDetails) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deletePartnerBrand(data.id).subscribe(() => {
          this.notification.openSnackBar('Deleted Successfully', 2);
          this.dataSource.data = this.dataSource.data.filter(x => x.id != data.id);
        })
      } else return;
    })


  }
}
