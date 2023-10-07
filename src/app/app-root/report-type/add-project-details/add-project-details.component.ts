import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { Project } from '../../project/project.model';
import { OrderSetupService } from '../../setup-service/order-setup/order-setup.service';
import { ProjectService } from '../../setup-service/project-setup/project.service';
import { ReportTypeService } from '../../setup-service/report-type/report-type.service';
import { GroupService } from '../../setup-service/task-master-setup/group/group.service';
import { TypeService } from '../../setup-service/task-master-setup/type/type.service';

@Component({
  selector: 'app-add-project-details',
  templateUrl: './add-project-details.component.html',
  styleUrls: ['./add-project-details.component.scss']
})
export class AddProjectDetailsComponent implements OnInit {
  reportForm: any = FormGroup;
  project$ = this.project.project$;
  

  isDownload!: boolean;

  content: any = [
    {
      id: 1,
      project: "project 1",
      order: "Order 1",
      title: "Task 1",
      description: "task 1 Des",
      department: "D1",
      taskIntiationTime: "10:55",
      targetDate: "10-01-23",
      priorityFactor: "overriding"
    },
    {
      id: 2,
      project: "project 2",
      order: "Order 2",
      title: "Task 2",
      description: "task2 Des",
      department: "D2",
      taskIntiationTime: "10:57",
      targetDate: "14-01-23",
      priorityFactor: "normal",
      custorName: "benish",

    }
  ]

  array: any = [];
  update!: boolean;
  projectId:any;

  /*  groupData(data:any){
     console.log(data,'group');
     var type:any=data.taskType;
     var customFields:any;
     type.forEach((element:any) => {
       customFields=JSON.parse(element.customFields);
       console.log(customFields,'customdata');
       for(let i=0; i<customFields.length; i++){
         var o;
         var newArray:any=[];
         for(o in customFields[i]){
           newArray.push(o)
           console.log(newArray,'newArray');
           
         }
       }
       
     });
   
     
    
 
   } */
  constructor(private service:ReportTypeService,
    private project: ProjectService,
    private fb: FormBuilder,
    private notification: NotifierService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      name: [],
      code: [],
      description: [],
      projects: [],
      active: true
    })
    if (this.data != null) {
      this.update = true;
      this.editData()
    }
  }

  file() {
    for (let i = 0; i < this.content.length; i++) {
      var o;
      var newArray: any = [];
      for (o in this.content[i]) {
        newArray.push(o)
      }
      break;
    }
    this.array.push(newArray)
    for (let i = 0; i < this.content.length; i++) {
      this.array.push(Object.values(this.content[i]))

    }
    var CsvString = ""
    this.array.forEach((RowItem: any, RowIndex: any) => {
      RowItem.forEach((colItem: any, colIndex: any) => {
        CsvString += colItem + ',';

      })
      CsvString += "\r\n"

    })
    CsvString = "data:application/csv," + encodeURIComponent(CsvString)
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", "somedata.csv");
    document.body.appendChild(x);
    x.click();
    this.array = [];


  }

 

  editData() {
   

    this.reportForm.patchValue({
      code: this.data.code,
      name: this.data.name,
      projects: CommonMethods.getFormArray(this.data.projects),
      createdBy: this.data.createdBy,
      modifiedBy: this.data.modifiedBy,
    })
  }



  updateProject() {
    if (this.reportForm.valid == true) {
      let dataRow = this.reportForm.value;
      dataRow.projects = CommonMethods.returnId(dataRow.projectName);
      dataRow.id = this.data.id;
      /*    this.projects.updateProject(dataRow).subscribe(res => {
          this.dialogRef.close("Done"); 
           this.notification.openSnackBar(' Updated Successfully', 1);
         })
         this.projectForm.reset(); */
    } else {
      this.notification.openSnackBar('Please fill all required fileds', 0)
    }
  }


  public addItem(): any {
    if (this.reportForm.valid == true) {
      this.reportForm.value.projects=this.projectId;
      let dataRow: any = this.reportForm.value;
      dataRow.orgId=sessionStorage.getItem('orgId')
    
     console.log(dataRow,'dataRow');
     
        this.service.postReportTemplate(dataRow).subscribe((res:any)=>{
          console.log(res,'res');
        this.dialogRef.close(res);
         this.notification.openSnackBar(' Added Successfully', 1);
         this.reportForm.reset();  
       })

    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0)
    }
  }

  getprojectId(id:any){
   
    let projId:any=id._value;
    this.projectId=projId.toString();
   
   
  
  }


}
