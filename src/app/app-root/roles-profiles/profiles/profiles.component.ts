import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { ProfileService } from '../../setup-service/role-setup/profiles/profile.service';
import { AddProfilesComponent } from './add-profiles/add-profiles.component';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: "Profile 1", name: 'Organization Setup', weight: "Location", },
  { position: "Profile 2", name: 'Contact Setup', weight: "Category", },
  { position: "Profile 3", name: 'Task Master Setup', weight: 'Task Type' },

]

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  profile$ = this.getProfile();

  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;



  displayedColumns: string[] = ['profileName', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(private dialog: MatDialog,
    private notification: NotifierService,
    private service: ProfileService) {
    this.dataSource = new MatTableDataSource();
  }

  sortData(data: any) {
    data.sort = this.sort;
  }


  isEnable(permision: any) {
    return CommonMethods.userRole('rolesProfilesModule', 'profile', permision);
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.service.getProfile().subscribe(data => {
    })
  }

  getProfile(data?: PageEvent) {
    return this.service.getProfile().pipe(
      delay(300),
      map(profile => {
        this.dataSource = new MatTableDataSource(profile.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = profile.data;
        return true;
      }),

      catchError((err) => of('error')))

  }


  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddProfilesComponent, dialogConfig);
  }

  edit(data: any) {


  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteProfile(data).subscribe(() => {
          this.notification.openSnackBar('Profile Deleted Successfully', 0);
          this.dataSource.data = this.dataSource.data.filter(x => x.id != data.id)
        })

      } else return;
    })


  }

}
