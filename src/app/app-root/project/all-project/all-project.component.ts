import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ProjectService } from '../../setup-service/project-setup/project.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import * as XLSX from 'xlsx';
import { utils } from 'xlsx';
import { FetchCommon } from '../../setup-service/common-function/fetch-common';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectSetupService } from '../../setup-service/project-setup/project-setup/project-setup.service';
import { TypeService } from '../../setup-service/task-master-setup/type/type.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { of } from 'rxjs';
import { delay, map, catchError, shareReplay } from 'rxjs/operators';
import { Project } from '../project.model';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { CategoryService } from '../../setup-service/business-contact-setup/business-category/business-category.service';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.scss']
})
export class AllProjectComponent implements OnInit {
  project$ = this.getProjects();
  searchText: any;
  orderHeader: any;
  isDescOrder: boolean = true;

  isEmpty!: boolean;


  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [30, 50, 100];
  pageDetails!: PageEvent;

  $unit: any;
  $location: any;
  $division: any;

  $project: any;
  $type: any;
  $partner: any;
  typeName: any;
  $resProject: any;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;


  displayedColumns: string[] = ['code', 'name', 'orderNumber', 'businessPartners', 'taskGroup', 'action'];
  dataSource!: MatTableDataSource<Project>;
  dataSource$ = of(new MatTableDataSource());
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(private setup: ProjectSetupService,
    private Service: ProjectService,
    private dialog: MatDialog,
    private notification: NotifierService,
    private type: TypeService) {
    this.dataSource = new MatTableDataSource();
  }

  sortData(data: any) {
    data.sort = this.sort;
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('projectModule', 'project', permision);
  }

  ngOnInit(): void {
    this.getType();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, { type: 'binary' });
      let basic = utils.sheet_to_json(workBook.Sheets['basic'])
      let businessPartner = utils.sheet_to_json(workBook.Sheets['businessPartner'])
      let types = utils.sheet_to_json(workBook.Sheets['types'])



      if (businessPartner.length == types.length) {
        basic.forEach((data: any, index: number) => {
          data.businessPartner = businessPartner[index]
          data.types = types[index]
          this.setup.projectData.unshift(data)
        })
      } else {
        this.notification.shownNotification(" 17049 Inconsistent data", 'ok', "error", 99999, 'end', 'bottom')
      }
      basic = basic.concat(this.setup.projectData)
    }
  }



  getProjects(data?: PageEvent) {

    return this.Service.getProject().pipe(
      delay(300),
      map(project => {
        this.dataSource$ = of(new MatTableDataSource(project.data));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = project.data;
        return project.data;
      }),
      catchError((err) => of('error')))
  }


  getType() {
    this.type.getType().subscribe((res: any) => {
      this.$type = res.data
    })
  }

  getTypeName(type: any) {
    let name: any;
    type.forEach((data: any) => {
      if (data.name) {
        name = data.name
      }
    })
    return name;
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.Service.deleteProject(data).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(x => x.id != data.id);
          this.notification.openSnackBar(' Deleted Successfully', 2);
        })
      } else return;
    })


  }

  edit(data: any) {
    let update = this.dialog.open(AddProjectComponent, { data: data });
    update.afterClosed().subscribe(result => {
      if (result) {
        this.project$ = this.getProjects();
      }
    })
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let project = this.dialog.open(AddProjectComponent, dialogConfig);
    project.afterClosed().subscribe(result => {
      if (result) {
        this.project$ = this.getProjects();
      }

    })
  }
  onSubmit() {
    this.setup.projectSetup().subscribe(res => {
      this.notification.openSnackBar('Project Created Sucessfully!', 1)

    })
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getProjects(event);
  }

}


