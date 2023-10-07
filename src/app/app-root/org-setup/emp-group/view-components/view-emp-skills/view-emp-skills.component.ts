import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { SkillSetService } from 'src/app/app-root/setup-service/org-setup/skill-set/skill-set.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpSkillsComponent } from './add-emp-skills/add-emp-skills.component';
import { Skills } from './skills.model';

@Component({
  selector: 'app-view-emp-skills',
  templateUrl: './view-emp-skills.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpSkillsComponent {
  skillset$ = this.getSkillSet();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;
  isEmpty!: boolean;
  $skillSet: any;

  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['name', 'description', 'action'];
  dataSource!: MatTableDataSource<Skills>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private service: SkillSetService,
    private notification: NotifierService) {
    this.dataSource = new MatTableDataSource();
  }
  sortData(data: any) {
    data.sort = this.sort;
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'skillSet', permision);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSkillSet(data?: PageEvent) {

    return this.service.getSkillSet().pipe(
      delay(300),
      map(skillset => {
        this.dataSource = new MatTableDataSource(skillset.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = skillset.data;
        return true;
      }),

      catchError(() => of('error')))
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteSkillSet(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('SkillSet Deleted Successfully', 2);
              this.skillset$ = this.getSkillSet();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the SkillSet', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpSkillsComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getSkillSet(event);
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let skill = this.dialog.open(AddEmpSkillsComponent, dialogConfig);
    skill.afterClosed().subscribe(res => {
      if (res) {
        this.skillset$ = this.getSkillSet();
      }
    })
  }
  onNext() {
    this.subroot.nextStep()
  }
  onPrevious() {
    this.subroot.previousStep()
  }
}
