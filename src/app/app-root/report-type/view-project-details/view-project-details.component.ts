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
import { CategoryService } from '../../setup-service/business-contact-setup/business-category/business-category.service';
import { ReportTypeService } from '../../setup-service/report-type/report-type.service';
import { AddProjectDetailsComponent } from '../add-project-details/add-project-details.component';
import { Category } from '../../contact/define/category/category.model';

@Component({
  selector: 'app-view-project-details',
  templateUrl: './view-project-details.component.html',
  styleUrls: ['./view-project-details.component.scss']
})
export class ViewProjectDetailsComponent implements OnInit {
  
  reports$ = this.getReport();
  
  searchText: any;
  reportTask:any;


  totalRows = 0;
  pageSize = 30;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
  pageDetails!: PageEvent;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;

  displayedColumns: string[] = ['name', 'code','description', 'date', 'action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private dialog: MatDialog,
    private service: ReportTypeService,

    private notification: NotifierService
  ) {
    this.dataSource = new MatTableDataSource();
  }


  sortData(data: any) {
    data.sort = this.sort;
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  getReport(data?: PageEvent) {
    return this.service.getReportTemplate().pipe(
      delay(300),
      map(report => {
        console.log(report);
        
        this.dataSource = new MatTableDataSource(report.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = report.content;
        return true;
      }),

      catchError((err) => of('error')))
  }

  getReportDownload(data:any){
    console.log(data,'data');
    let id:any=data.id;
    console.log(id,'iddd');
    this.service.getReportDownload(id).subscribe(res=>{
      console.log(res,'download');
      this.reportTask=res;
      this.reportTask.forEach((element:any) => {
        let observers:any;
        let dependencyTask:any;
        element.observers.forEach((observer:any) => {
          observers=observer.fname;
        });
        element.dependencies?.forEach((dependencies:any) => {
          dependencyTask=dependencies?.title;
        });
        let array1:any=[];
       let array2:any=[];
       let dataRow:any=JSON.parse(element.typeFields)
       dataRow.templateCode=element.templateCode
       dataRow.templateName=element.templateName
       dataRow.id=element.id
       dataRow.code=element.code;
       dataRow.title=element.title
       dataRow.description=element.description
       dataRow.initiator=element.initiator.fname;
       dataRow.assignee=element.assignee.fname
       dataRow.observers=observers;
       dataRow.dependenctTask=dependencyTask
       dataRow.taskType=element.taskType.name
       dataRow.subDepartment=element.subDepartment.name
       dataRow.project=element.project.projectName
       dataRow.customizedStatus=element.customizedStatus
       dataRow.priorityFactor=element.priorityFactor
      dataRow.target=element.target
       array1.push(dataRow)
       if(array2.length==0){
         this.arr4.push(dataRow)
       
       }
       this.file();
     });
      
    })

  }


  addnew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let category = this.dialog.open(AddProjectDetailsComponent, dialogConfig);
    category.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.concat(result);
      }
    })
  }


  edit(data: any) {
    this.dialog.open(AddProjectDetailsComponent, { data: data });

  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
      
      } else return;
    })


  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getReport(this.pageDetails);
  }

  arr3:any=[];
  arr4:any=[];
  ngOnInit(): void {
  
  }
  
/*   subtask:any= [
    {
      id: 1,
      templateCode:"001",
      templateName:'template',
      title: "sub task",
      code: "O1000ST001",
      assignee:{
        name:"jayanthi"
      },
      initDate: "12/30/2022, 4:08:56 PM",
      completedDate: null,
      subDepartment: "SD1",
      taskType: "T1",
      description: "sub task des",
      target: "2022-12-30T16:09",
      priorityFactor: "overriding",
      project:"project1",
      status: 2,
      customizedStatus: "Completed",
      initiator: "benish",
      typeFields: "{\"Name\": \"Benish\"}", 
      name:'ben',
      email:"123@"
    },
    {
      id: 2,
      templateCode:"001",
      templateName:'template',
      title: "sub task 1",
      code: "O1000ST001",
      assignee:{
        name:"manimekalai"
      },
      initDate: "12/30/2022 4:08:56 PM",
      completedDate: null,
      subDepartment: "SD1",
      taskType: "T1",
      description: "sub task des",
      target: "2022-12-30T16:09",
      priorityFactor: "overriding",
      project:"project1",
      status: 2,
      customizedStatus: "Completed",
      initiator: "benish",
       typeFields: "{\"Name\": \"Benish\"}", 
      name:'ben',
      email:"123@"
    }
   
    
  ] */

  content:any=[
    {
      id:1,
      name:"A",

    },
    {
      id:2,
      name:"B"
    }
  ]

  array:any=[];
  file(){
    for(let i=0; i<this.arr4.length; i++){
      var o;
      var newArray:any=[];
      for(o in this.arr4[i]){
        newArray.push(o)
      }
      break;
    }
    this.array.push(newArray)
  
    
    for(let i=0; i<this.arr4.length; i++){
      this.array.push(Object.values(this.arr4[i]))
    
    }
    var CsvString =""
    this.array.forEach((RowItem:any,RowIndex:any)=>{
      RowItem.forEach((colItem:any,colIndex:any)=>{
        CsvString += colItem + ',';
       
      })
      CsvString +="\r\n"
      
    })
    CsvString="data:application/csv," + encodeURIComponent(CsvString)
    var x=document.createElement("A");
    x.setAttribute("href",CsvString);
    x.setAttribute("download","somedata.csv");
    document.body.appendChild(x);
    x.click();
    this.array=[];


  }
  

}
