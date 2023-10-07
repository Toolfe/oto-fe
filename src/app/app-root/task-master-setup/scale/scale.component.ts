import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { SetScaleRangeService } from '../../setup-service/task-master-setup/scale/set-scale-range.service';
import { TypeService } from '../../setup-service/task-master-setup/type/type.service';
import { Scale } from './scale.model';
import { SetRangeComponent } from './set-range/set-range.component';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

scale$=this.getRange ();
type$=this.type.type$;
isEmpty!:boolean;
searchText:any;

totalRows = 0;
pageSize = 30;
currentPage = 0;
pageSizeOptions: number[] = [30, 50, 100];
pageDetails!: PageEvent;

hideRange:boolean=false;

creation!: boolean;
selection!:boolean;
updation!: boolean;
deletion!: boolean;



displayedColumns: string[] = ['minRange','maxRange','action'];
dataSource!: MatTableDataSource<Scale>;

@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort)
sort!: MatSort;
  constructor(private dialog:MatDialog,
              private type:TypeService,
              private service:SetScaleRangeService) {
               
               }


               isEnable(permision:any){
                return  CommonMethods.userRole('taskMasterModule','scale',permision );
               }

  ngOnInit(): void {
  
    
    if(sessionStorage.getItem('minimumRange ')==null){
      this.hideRange=true;
    }
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
  let type =this.dialog.open(SetRangeComponent,dialogConfig);
  type.afterClosed().subscribe(res=>{
    if(res)
    {
      this.scale$=this.getRange ();
    }
  });
}

setRange()
{
  const dialogConfig = new MatDialogConfig();  
  dialogConfig.disableClose = true;  
  dialogConfig.autoFocus = true;   


}

getRange(data?: PageEvent) {
  return  this.service.getScaleRange().pipe(
    delay(300),
    map((type: any) => {
      this.dataSource = new MatTableDataSource(type.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
      this.dataSource.data = type.data;
      return true;}),
      catchError(() => of('error')));
 }
 




edit(data: any) {
  this.dialog.open(SetRangeComponent, { data: data });
}




pageChanged(event: PageEvent) {
  this.pageDetails = event;
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.getRange(event);
}
}