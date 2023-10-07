import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Division } from '../../org-setup/division/division.model';
import { DocMasterService } from '../../setup-service/doc-master-setup/doc-master.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchText:any;
  orderHeader:any;
  isDescOrder: boolean=true;

  isEmpty!:boolean;


  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;

  $unit:any;
  $location:any;
  $division:any;

  displayedColumns: string[] = ['code','name', 'deptName','action'];
  dataSource!: MatTableDataSource<Division>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private dialog:MatDialog,
    private service:DocMasterService
  ) { }
 

  ngOnInit(): void {
    //this.userData=this.service.user;
  }
  edit(data: any) {
    //this.dialog.open(AddProjectComponent, { data: data });
  
  }
  
  deleteItem(data:any){
    data.active=false;
    }

  addNew(){
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;   
    this.dialog.open(AddUserComponent,dialogConfig)
  }
/* getAllProjects(data?: PageEvent) {
    this.spinner.show();
    this.org.getAllProjects(data?.pageIndex, data?.pageSize).subscribe((res: any) => {
      if(res.empty){
        this.isEmpty=true;
        this.spinner.hide();
      }else{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.data = res.content;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isEmpty=false;
        this.spinner.hide();  
      }
    });
  
  }*/

  updateDept(){
    //  this.fetch.getName(this.$department,this.$unit,'unitCode','unitName')
      }
  
      pageChanged(event: PageEvent) {
        this.pageDetails = event;
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        //this.getAllProjects(event);
      }

}
