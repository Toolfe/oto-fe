import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { DeptService } from '../../setup-service/org-setup/dept/dept.service';
import { UnitService } from '../../setup-service/org-setup/unit/unit.service';
import { RolesService } from '../../setup-service/role-setup/roles/roles.service';
import { AddRolesComponent } from './add-roles/add-roles.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent  {
  role$=this.getRole();

  displayedColumns: string[] = ['roleName','assignProfile', 'action'];
  dataSource!: MatTableDataSource<Location>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:RolesService,
              private dept:DeptService,
              private unit:UnitService,
              private router:Router,
              private notification:NotifierService,
              private dialog:MatDialog) { 
                this.dept.department$.subscribe(res=>{
                })
                this.unit.unit$.subscribe(res=>{
                  
                })
                this.dataSource = new MatTableDataSource();
              }
              sortData(data: any) {
                data.sort = this.sort;
              }
          

              isEnable(permision:any){
                return  CommonMethods.userRole('rolesProfilesModule','role',permision );
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
  let role=this.dialog.open(AddRolesComponent,dialogConfig);
  role.afterClosed().subscribe(res=>{
    if(res=="done"){
      this.role$=this.getRole();
    }
  })
}
  getRole(data?: PageEvent) {
    return this.service.getRoles().pipe(
   delay(300),
   map(role => {
    this.dataSource = new MatTableDataSource(role.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
   this.dataSource.data = role.data
   return true;
  }),
   
    catchError((err)=>of('error')))
  
  }

  edit(data:any){
   let update= this.dialog.open(AddRolesComponent,{data:data});
   update.afterClosed().subscribe(res=>{
    if(res=="done"){
      this.role$=this.getRole();
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
        this.service.deleteRoles(data).subscribe(() => {
          this.notification.openSnackBar('Location Deleted Successfully', 2);
          this.dataSource.data = this.dataSource.data.filter((x:any)=>x.id!=data.id)
        })          

      } else return;
    })


  }


  backBtn() {
    this.router.navigate(['/setup/roles-profile']);
  }

}