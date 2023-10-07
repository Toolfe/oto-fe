import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { IndustrySkillsService } from 'src/app/app-root/setup-service/org-setup/industry-skills/industry-skills.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { EmpGroupComponent } from '../../emp-group.component';
import { AddEmpSpecificSkillsComponent } from './add-emp-specific-skills/add-emp-specific-skills.component';
import { SpecificSkills } from './specific-skills.model';

@Component({
  selector: 'app-view-emp-specific-skills',
  templateUrl: './view-emp-specific-skills.component.html',
  styleUrls: ['./../view-emp-group/view-emp-group.component.scss']
})
export class ViewEmpSpecificSkillsComponent {
  specificskill$ = this.getSpecificSkill();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = false;
  isEmpty!: boolean;
  $specificSkill: any;

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
  dataSource!: MatTableDataSource<SpecificSkills>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private subroot: EmpGroupComponent,
    private service: IndustrySkillsService,
    private notification: NotifierService) {
    this.dataSource = new MatTableDataSource();

  }
  sortData(data: any) {

    data.sort = this.sort;

  }

  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'industrySpecificSkills', permision);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSpecificSkill(data?: PageEvent) {

    return this.service.getSpecificSkill().pipe(
      delay(300),
      map(specificskill => {
        this.dataSource = new MatTableDataSource(specificskill.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = specificskill.data;
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
        this.service.deleteSpecificSkill(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Specific Skill Deleted Successfully', 2);
              this.specificskill$ = this.getSpecificSkill();
            } else return;
          },
          (error: any) => {
            this.notification.openSnackBar('An error occurred while deleting the Specific Skill', 2);
          }
        );
      }
    })


  }

  edit(data: any) {
    this.dialog.open(AddEmpSpecificSkillsComponent, { data: data });
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getSpecificSkill(event);
  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let specificSkill = this.dialog.open(AddEmpSpecificSkillsComponent, dialogConfig);
    specificSkill.afterClosed().subscribe(result => {
      if (result) {
        this.specificskill$ = this.getSpecificSkill();

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
