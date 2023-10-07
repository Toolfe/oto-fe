import { AfterContentInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';
import { CreateDocComponent } from '../../document/create-doc/create-doc.component';
import { CreateTaskComponent } from '../../task/create-task/create-task.component';
import { Project } from '../../task/create-task/task-model';
import { TaskService } from '../../task/service/task-service.service';
import { EmpTaskDetailsComponent } from '../emp-task-details/emp-task-details.component';
import { Observable, interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';

export var single: any = [
  {
    "name": "project1",
    "value": 50
  },
  {
    "name": "project2",
    "value": 100
  },
  {
    "name": "project3",
    "value": 75
  },
  {
    "name": "project4",
    "value": 50
  },
  {
    "name": "project5",
    "value": 50
  }
];
interface Website {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  employees: any;
  projectPreferenceId: any;
  projectStatusId: any;
  projectLevelPreferenceId: any
  projectLevelId: any;
  projectLevel: any = [];
  empId: any;
  dataSource: any;
  dataSource1: any;
  dataSource2: any;
  columnsToDisplay = ['name', 'state'];
  columnsToDisplays = ['project', 'taskname', 'timespent',];
  columnsToDisplays1 = ['taskname', 'name', 'status', 'completeBy', 'date'];
  dataCount: any;
  projectLevelForm: any = FormGroup;
  projectStatusForm: any = FormGroup;
  projects$: Observable<any[]>;
  priorityTask: any[] = [];
  @ViewChild(MatMenuTrigger)
  ddTrigger!: MatMenuTrigger;
  card: any[] = [];
  mobileQuery: MediaQueryList
  single: any[] = [];
  view: any = [] = [760, 200];
  myStyle: any;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = '';

  projectPreference: any;
  projectLevelPreference: any;

  colorScheme: any = {
    domain: ['#3376BD', '#EDAE49', '#00798c', '#E63956', '#52484c',]
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }




  id: any = localStorage.getItem('projectId')
  projStatusId: any = localStorage.getItem('projectStatusId')
  selectedOption: any[] = JSON.parse(this.id);
  selectedOption1: any[] = JSON.parse(this.projStatusId);;
  projId: any;
  projStatusIds: any;
  websites: any = [];
  checkIn: boolean = false;
  break: boolean = false;
  checkOut: boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(private mobileSerice: MobileQueryService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private taskservice: TaskService,
    private notification: NotifierService,
    private http: AuthService,
    private dialog: MatDialog,
    private router: Router



  ) {
    this.projects$ = this.projectService.getProject();
    // this.getEmployee();
    this.mobileQuery = this.mobileSerice.mobileQuery
    this.mobileMathes();
    //Object.assign(this, { single });
    this.dataSource = new MatTableDataSource();

  }



  submit() {
    console.log(this.form.value);
  }
  ngOnInit(): void {


    // console.log(this.projectLevel.length,'0000000');

    this.tableSelection('checkIn')

    // this.getProject();
    this.getProjectStatus();
    this.projectLevelForm = this.fb.group({
      projectId: []
    });
    this.projectStatusForm = this.fb.group({
      projectId: [],
    });

    this.getOverridingSubtask();
    this.getProjectLevel();
    this.dataSource1 = new MatTableDataSource([]);
    console.log(this.dataSource1.data.length, 'dataSource');

  }


  getprojectStatusId(id: any) {
    console.log(id, 'idddddd');
    let projId: any = id._value;
    this.projectPreference = projId.toString();
    console.log(this.projectPreference, 'preeeffff');
    this.projectStatusId = this.projectStatusForm.value.projectId;
    console.log(this.projectStatusId, 'iiii');
    if (this.projectStatusId.length > 5) {
      this.notification.openSnackBar('Please select only 5 projects', 0)
    }
  }

  getProjectLevelId(id: any) {
    console.log(id, 'idddddd');
    let projId: any = id._value;
    this.projectLevelPreference = projId.toString();
    console.log(this.projectLevelPreference, 'preeeffff');
    this.projectLevelId = this.projectLevelForm.value.projectId;
    console.log(this.projectLevelId, 'iiii');
  }


  postProjectStatus() {
    if (this.projectStatusId.length > 5) {
      this.notification.openSnackBar('Please select only 5 projects', 0)
    }
    else if (this.single.length == 0) {

      console.log(this.projectStatusForm.value, 'value');
      let dataRow: any = this.projectStatusForm.value;
      dataRow.empId = sessionStorage.getItem('id')
      console.log(JSON.stringify(dataRow), 'dataRow11');
      this.taskservice.postProjectAndStatus(dataRow).subscribe(res => {
        console.log(res, 'projectStatussss');
        this.single = res.data;
      })

      let preference: any = {};
      preference.empId = sessionStorage.getItem('id');
      preference.projectPreferences = this.projectPreference;
      console.log(preference, 'preference');
      this.taskservice.postProjectFreference(preference).subscribe(res => {
        console.log(res, 'preeeeeee');
      })

    } else if (this.single.length > 0) {
      console.log(this.projectStatusForm.value, 'value');
      let dataRow: any = this.projectStatusForm.value;
      dataRow.empId = sessionStorage.getItem('id')
      console.log(JSON.stringify(dataRow), 'dataRow11');
      this.taskservice.postProjectAndStatus(dataRow).subscribe(res => {
        console.log(res, 'projectStatussss');
        this.single = res.data;
      })
      this.empId = sessionStorage.getItem('id');
      this.taskservice.getPreferenceId(this.empId).subscribe(res => {
        this.projectPreferenceId = res.id;
        console.log(this.projectPreferenceId, 'preeeeee');
        console.log(res, 'preIddddd');
        let preference: any = {};
        preference.id = this.projectPreferenceId;
        preference.empId = sessionStorage.getItem('id');
        preference.projectPreferences = this.projectPreference;
        console.log(preference, 'preference');
        this.taskservice.updateProjectPreference(preference).subscribe(res => {
          console.log(res, 'updatePre');
        })
      })
    }


  }



  getProjectStatus() {
    // let id=sessionStorage.getItem('id')
    this.taskservice.getProjectAndStatus().subscribe(res => {
      console.log(res, 'statussss');
      this.single = res.data;
    })
  }

  getactiveStatus(status: any) {
    this.http.getauthenticateStatus(status).subscribe(res => {
      this.dataSource = res.data[0];
      this.dataCount = res.data[1][0];
    })
  }




  mobileMathes() {
    if (this.mobileQuery.matches == true) {
      this.card = [
        { cols: 6, rows: 1 },
        { cols: 6, rows: 1 },
        { cols: 6, rows: 3 },
        { cols: 6, rows: 2 },
        { cols: 6, rows: 3 },
        { cols: 6, rows: 3 }]
    } else {
      this.card = [
        { cols: 2, rows: 1 },
        { cols: 2, rows: 1 },
        { cols: 2, rows: 3 },
        { cols: 4, rows: 2 },
        { cols: 2, rows: 3 },
        { cols: 4, rows: 3 }]
    }

  }

  tableSelection(data: string) {
    if (data === 'checkIn') {
      this.checkIn = true;
      this.break = false;
      this.checkOut = false;
      this.getactiveStatus(data);
    } else if (data === 'break') {
      this.checkIn = false;
      this.break = true;
      this.checkOut = false;
      this.getactiveStatus(data);
    } else if (data === 'checkOut') {
      this.checkIn = false;
      this.break = false;
      this.checkOut = true;
      this.getactiveStatus(data);

    }
  }

  onuploadDoc() {
  }

  selectProject($event: any) {
    console.log($event);

    $event.stopPropagation();
    $event.preventDefault();
    if ($event.target) {
      $event.target.classList.toggle('selected');
    }

  }
  // getStateColor(status: any): any {

  //   switch (status) {
  //       case this.checkOut:
  //        return 'red-svg';
  //       case this.checkIn:
  //        return 'green-svg';
  //       case this.break:
  //        return 'orange-svg';
  //       case 3:
  //        return 'orange-svg';
  //   }
  // }
  
  getStateColor() {
    if (this.checkOut) {
      return 'red-svg';
    } else if (this.checkIn) {
      return 'green-svg';
    } else if (this.break) {
      return 'orange-svg';
    }
    
    // Add a default return value for other cases
    return 'yellowGreen-svg';
  }
  selectedEmp(data: any) {
    this.dialog.open(EmpTaskDetailsComponent, { data: data.id });

  }

  // getAllTask() {
  //   this.taskservice.mergeTasks().subscribe(res => {
  //     let priority: any[] = [];
  //     res.forEach((element: any) => {
  //      if(element.type=="task"){
  //       let subtask: any;
  //       subtask = element.subTasks
  //       for (let i = 0; i < subtask.length; i++) {
  //         priority.push(subtask[i])
  //         this.priorityTask = priority.filter((task: any) => task.priorityFactor == "overriding");
  //         this.dataSource2 = new MatTableDataSource(this.priorityTask);
  //       }
  //      }else{
  //       let subTaskPriority:any;
  //       subTaskPriority = res.filter((task: any) => task.priorityFactor == "overriding");
  //       this.dataSource2 = new MatTableDataSource(subTaskPriority);
  //      }
  //     });
  //   })
  // }
  getOverridingSubtask() {
    this.taskservice.getOverridingSubtask().subscribe(res => {
      this.dataSource2 = new MatTableDataSource(res.data);
    });

  }
  getEmployee() {
    this.employeeService.getEmployee().subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data);
    });
  }

  postProjectLevel() {


    if (this.projectLevel.length == 0) {
      let dataRow: any = this.projectLevelForm.value;
      this.taskservice.postProjectLevel().subscribe(res => {
        this.dataSource1 = new MatTableDataSource(res.data);
        console.log(res);

      })
      let preference: any = {};
      preference.empId = sessionStorage.getItem('id');
      preference.projectPreferences = this.projectLevelPreference;
      console.log(preference, 'preference');
      this.taskservice.postProjectLevelPreference(preference).subscribe(res => {
        console.log(res, 'preference');
      })
    }


    else if (this.projectLevel.length > 0) {
      let dataRow: any = this.projectLevelForm.value;
      dataRow.empId = sessionStorage.getItem('id')
      console.log(JSON.stringify(dataRow), 'dataRow11');
      this.taskservice.postProjectLevel().subscribe(res => {
        console.log(res, 'projectStatussss');
        this.dataSource1 = new MatTableDataSource(res.data);
      })
      this.empId = sessionStorage.getItem('id');
      this.taskservice.getprojectLevelPreferenceId(this.empId).subscribe(res => {
        this.projectLevelPreferenceId = res.id;
        console.log(this.projectLevelPreferenceId, 'preeeeee');
        console.log(res, 'preIddddd');
        let preference: any = {};
        preference.id = this.projectLevelPreferenceId;
        preference.empId = sessionStorage.getItem('id');
        preference.projectPreferences = this.projectLevelPreference;
        console.log(preference, 'preference');
        this.taskservice.updateProjectLevelPreference(preference).subscribe(res => {
          console.log(res, 'updatePre');
        })
      })
    }

  }

  // getProjectLevel(){
  //   let id:any=sessionStorage.getItem('id');
  //   this.taskservice.getprojectLevel(id).subscribe(res=>{
  //     this.dataSource1=new MatTableDataSource(res);
  //     this.projectLevel=res;
  //     console.log(res,'projectlevel');
  //   })
  // }
  getProjectLevel() {
    this.taskservice.postProjectLevel().subscribe(res => {
      this.dataSource1 = new MatTableDataSource(res.data);
    })
  }
  getprojectId(id: any) {
    console.log(id._value, 'id')
    let array: any = id._value;
    this.projId = JSON.stringify(array);
    localStorage.setItem('projectId', this.projId)
  }



  // getProject() {
  //   // var proj: any = [] = []
  //   this.taskservice.getProject().subscribe(res => {
  //     this.projectslist = res.data;
  //     // console.log(proj, 'hgjg');

  //     this.websites = this.projectslist;
  //     // console.log(proj, 'proj');
  //   })



  // }
  createTask() {
    this.router.navigateByUrl("/task/all-task")
    this.dialog.open(CreateTaskComponent)

  }
  viewTask() {
    this.router.navigateByUrl("/task/assign-to-me")
  }

  createDocument() {
    this.router.navigateByUrl("/document/all-files")
    this.dialog.open(CreateDocComponent)
  }
  viewDocument() {
    this.router.navigateByUrl("/document/all-files")
  }


}
