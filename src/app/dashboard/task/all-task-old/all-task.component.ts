import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Observable, of, Subscription } from 'rxjs';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { GroupService } from 'src/app/app-root/setup-service/task-master-setup/group/group.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { StatusService } from 'src/app/app-root/setup-service/task-master-setup/status/status.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { MatTable } from '@angular/material/table';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Tasks } from '../create-task/task-model';
import { CustomFieldComponent } from '../custom-field/custom-field.component';
import { TaskService } from '../service/task-service.service';
import { CreateParentSubTaskComponent } from '../subtask/create-parent-sub-task/create-parent-sub-task.component';
import { CreateSubtaskComponent } from '../subtask/create-subtask/create-subtask.component';
import { TaskFilesComponent } from '../subtask/task-files/task-files.component';
export interface Task {
  name: string;
}



interface ExampleFlatNode {
  expandable: boolean;
  title: string;
  des: string;
  startdate: any;
  status: string;
  priority: string;
  level: number;
}


@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]

})

export class AllTaskComponent implements OnInit, OnDestroy {
  // @ViewChild('table') table!: MatTable<any>;
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  // @ViewChild('tabledata') table: MatTable<any>  | undefined;;
  // @ViewChild(MatTable) table: MatTable<any> | undefined;


  displayedColumns: string[] = [
    
    'title',
    'project',
    'initiator',
    'priority',
    'target',
    'timeSpend',
    'status',
    'action'
  ];
  private transformer = (node: Tasks, level: number) => {
    return {
      expandable: node.isSubtask,
      id:node.id,
      title: node.title,
      taskId : node.taskId,
      description: node.description,
      dependencies:node.dependencies,
      status: node.status,
      taskName:node.taskName,
      projectName: node.projectName,
      initiatorName : node.initiatorName, 
      targetDate: node.targetDate,
      priority:node.priority,
      taskDuration:node.taskDuration,
      priorityFactor: node.priorityFactor,
      type:node.type,
      taskType:node.taskType,
      project:node.project,
      estimatedDate:node.estimatedDate,
      active:node.active,
      activeStatus:node.activeStatus,
      taskTimer:node.taskTimer,
      actual:node.actual,
      createdBy:node.createdBy,
      createdOn:node.createdOn,
      initiator:node.initiator,
      modifiedBy:node.modifiedBy,
      modifiedOn:node.modifiedOn,
      parentId:node.parentId,
      target:node.target,
      code:node.code,
      taskCode:node.taskCode,
      taskGroup:node.taskGroup,
      typeFields:node.typeFields,
      taskFiles:node.taskFiles,
      assignee:node.assignee,
      observers:node.observers,
      initDate:node.initDate,
      subDepartment:node.subDepartment,
      customizedStatus:node.customizedStatus,
      subtaskRating:node.subtaskRating,
      subTasks:node.subTasks,
      task:node.task,
      // taskName:node.taskName,
      taskid:node.taskid,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener:any= new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.subTasks
  );

  dataSource:any= new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
 

  emp$ = this.employee.employee$;
  type$ = this.taskType.type$;
  group$ = this.taskGroup.group$;
  project$= this.projects.project$;
  $priority: any;
  priority: any;
  prioritySubscription!: Subscription;
  tasklists: any[] = [];
  allTask: boolean = false;
  searchText!: string;
  tasks: Task[] = [
    { name: 'All Tasks' },
    { name: 'Todo' },
    { name: 'Inprogress' },
    { name: 'Done' },

  ];

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  Refreshing: any[] = [1, 2, 3, 4, 5]
  task$:any = this.getTaskList()
  status$ = this.status.status$;
  mergeData: any;

  isEmpty!: boolean;
  hide: boolean = false;
  $taskList: any[] = [];
  $task: any[] = [];
  taskSearch: any;
  dotoSearch: any;
  isDesc: boolean = false;
  column: any = 'title';
  columnSort!: boolean;
  expanded: boolean[] = [];
  joined$!: BehaviorSubject<string[]>;
  taskId: any;

  mobileQuery: MediaQueryList
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent | undefined;


  @ViewChild(MatMenuTrigger)
  ddTrigger!: MatMenuTrigger;

  @ViewChild(MatMenuTrigger)
  type!: MatMenuTrigger;



  selectedEmpvalue: any;
  selectedProjectValue: any;
  selectedTypeValue: any;
  selectedGroupValue: any;
  selectedPriorityValue: any;
  selectedEmp!: string;
  selectedProject!: string;
  selectedType!: string;
  selectedGroup!: string;
  selectedPriority!: string;
  customizedStatus: any;
  subTask: any;

  searchType: any;
  searchTask!: string;
  subTaskByIdSubscription!: Subscription;

  taskLists: any;

  editSubtask: any;
  task: any;
  subtask:any;
  childSubtask:any;
  inprogress:any;

 



  constructor(private mobileService: MobileQueryService,
    private service: TaskService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router,
    private employee: EmployeeService,
    private taskGroup: GroupService,
    private taskType: TypeService,
    private projects: ProjectService,
    private priorities: PriorityService,
    private notification: NotifierService,
    private status: StatusService,
    private bottomSheet:MatBottomSheet

  ) {
  
    this.mobileQuery = this.mobileService.mobileQuery
  }
 

  // getTaskList(): Observable<any> {
  //   return this.service.mergeTasks().pipe(delay(100),
  //     map(taskList => {  
  //       this.dataSource.data = taskList;
  //       console.log( this.dataSource.data,'dataSource.data');
  //       return this.dataSource.data;
  //     }),
  //     catchError((err) => of('error'))
  //   )
  // }

  getTaskList():Observable<any> {
    return this.service.getalltasklist().pipe(delay(100),
      map(taskList => {
        this.dataSource.data = taskList.data;
        this.tasklists = this.dataSource.data; 
    
        return this.dataSource.data;
      }),
      catchError((err) => of('error'))
    )
  }
  // getsubtaskList(id){
  //   return this.service.getalltasklist().pipe(delay(100),
  //     map(subtaskLis t => {
  //       this.dataSource.data['subTask'] = subtaskList.data;
  //       return this.dataSource.data;
  //     }),
  //     catchError((err) => of('error'))
  //   )
  // }

  getsubtaskList(id:number,index:number,element:any) {
    this.service.getsubtasklist(id).subscribe(res=>{
      const userIndex = this.tasklists.findIndex(task => task.taskId === id);
      this.tasklists[userIndex]['subTasks'] = res.data;
      this.dataSource.data = this.tasklists;
      this.treeControl.expandAll(); 
    });
  }
  isEnable(permision: any) {
    return CommonMethods.userRole('taskManagementModule', 'allTask', permision);
  }

  cancelClick(ev: MouseEvent) {
    ev.stopPropagation();
  }

  onCancel() {
    this.ddTrigger.closeMenu();
  }

 


  sorts(property: any) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    this.taskLists.sort(function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * direction
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

  onSearchCreatedBy() {
    this.selectedEmp = this.selectedEmpvalue;
    this.selectedEmpvalue = undefined;
    this.task$ = this.getTaskList().pipe(delay(100), map(res => {
      return this.dataSource.data=res.filter((task: any) => task.createdBy.fname == this.selectedEmp);
    })),

      this.ddTrigger.closeMenu();
  }
  onSearchProject() {
    this.selectedProject = this.selectedProjectValue;
    this.selectedProjectValue = undefined;
    this.task$ = this.getTaskList().pipe(delay(100), map(res => {
      return this.dataSource.data=res.filter((task: any) => task.project.projectName == this.selectedProject);
    }))
    this.ddTrigger.closeMenu();

  }


  onSearchGroup() {
    this.selectedGroup = this.selectedGroupValue;
    this.selectedGroupValue = undefined;
    this.task$ = this.getTaskList().pipe(delay(100), map(res => {
      return this.dataSource.data=res.filter((task: any) => task.group.name == this.selectedGroup);
    }))
  }



  onSearchPriority() {
    this.selectedPriority = this.selectedPriorityValue;
    this.selectedPriorityValue = undefined;
    this.task$ = this.getTaskList().pipe(delay(100), map(taskList => {
      return this.dataSource.data=taskList.filter((task: any) => task.priorityFactor == this.selectedPriority);
    }))


  }


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  ngOnInit(): void {
    this.getPriority();
    this.getTaskList()
    this.expanded = new Array(this.dataSource.data.length).fill(false);
    // this.autoUpdateTask();

  }


  getPriority() {
    this.prioritySubscription = this.priorities.getPriority().subscribe((res: any) => {
      this.$priority = res.content;
      let data = this.$priority
      let obj: any = data.find((o: { priority1: any; }) => o.priority1);
      const arr = Object.values(obj);
      arr.shift();
      arr.pop();
      this.priority = arr;
    })
  }


  createTask() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let task = this.dialog.open(CreateTaskComponent, dialogConfig);
    task.afterClosed().subscribe((result: any) => {
      if (result == 'done') {
        this.task$ = this.getTaskList();

      }
    })


  }


  autoUpdateTask() {
    this.task$ = interval(15000)
      .pipe(
        startWith(''),
        switchMap(() => {
          return this.getTaskList();
        })

      )

  }

  refreshTask() {
    this.task$ = this.getTaskList().pipe( map(taskList => {
      return taskList;
    }))
  }


 

  copyTask(task:any){

    let dataRow:any=task
    console.log(dataRow,'dataRow');
    
   delete dataRow['id']; 

    dataRow.subTasks.forEach((task:any) => {
      delete task['id']
       delete task['subtaskRating'] 
    }); 
   let update=this.dialog.open(CreateTaskComponent, { data: dataRow });
   update.afterClosed().subscribe(res=>{
     if(res){
       this.refreshTask()
     }
   })
  
  }

  clicktask(task:Tasks){
    console.log(task.type,'task');
    if(task.type=='task'){
      this.getTaskById();
      sessionStorage.setItem('rootId', task.id.toString());
     
   
    }
    else if(task.type=='subTask'){
      sessionStorage.setItem('subtaskId', task.id.toString());
      this.getSubTaskById();
    }
  }

  selectedTask( task:any) {
    if(task.expandable == true ){
      sessionStorage.setItem('rootId', task.taskId.toString());
      setTimeout(() => {
        this.router.navigate(['../task/view-sub-task']);
      }, 100);
    }

    else if(task.type=='subTask'){
      sessionStorage.setItem('rootId', task.id.toString());
      this.editSubtask = task; 
     this.service.selectedSubTask = task.id.toString();
     sessionStorage.setItem('subtaskId', task.id.toString());
     setTimeout(() => {
       this.router.navigate(['../task/view-parent-sub-task']);
     }, 100);
    }
  
    else if(task.parentId==null){
      sessionStorage.setItem('rootId', task.taskid.toString());
      let update=this.dialog.open(CreateSubtaskComponent, { data: task });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.task$ = this.getTaskList();
        }
      })

    }else{
      let update=this.dialog.open(CreateParentSubTaskComponent, { data: task });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.task$ = this.getTaskList();
        }
      })
    }

  
   
 
   

 }

 

  editData(data: any) {
    console.log(data,'data');
    let update = this.dialog.open(CreateTaskComponent, { data: data });
    update.afterClosed().subscribe(res => {
      if (res) {
        this.task$ = this.getTaskList();
      }
    })
  }

  editsubtask(data:any){
    console.log(data,'subtak');
    if(data.parentId==null){
      sessionStorage.setItem("rootId",data.taskId.toString())
      let update=this.dialog.open(CreateSubtaskComponent, { data: data });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.task$ = this.getTaskList();
        }
      })
    }else {
      let update=this.dialog.open(CreateParentSubTaskComponent, { data: data });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.task$ = this.getTaskList();
        }
      })
    }
     
  }

  getSubTaskById() {
    this.subTaskByIdSubscription = this.service.getSubTask().subscribe(res => {
      console.log(res,'ressss');
      
      let subtask: any[] = [];
      subtask.push(res);
      subtask.forEach((element:any) => {
        console.log(element,'element')
        sessionStorage.setItem('rootId', element.task.id)
       
      })
    })
  }
  editSubTaskData(data: any) {
    console.log(data,'datatatat');
    sessionStorage.setItem('subtaskId', data.id.toString())
    this.getSubTaskById()
    let update = this.dialog.open(CustomFieldComponent, { data: data })
    update.afterClosed().subscribe(res=>{
      console.log(res,'r1');
        this.task$=this.getTaskList();

    })
    
  }



  getTaskById() {
    this.subTaskByIdSubscription = this.service.getTaskById().subscribe(res => {
      console.log(res,'resss');
      sessionStorage.setItem('rootId', res.id)
      console.log(res,'resssss');

    })
  }




  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteTask(data).subscribe(res => {
          this.task$ = this.getTaskList().pipe(delay(100), map(taskList => {
            return taskList;
          }));
          this.notification.openSnackBar('Task Deleted Successfully', 2);

        })
      } else return;
    })


  }



    filterTree(filterText: any) {
         return this.dataSource.data=this.getTaskList().pipe( map(taskList => {
           return this.dataSource.data = taskList.filter((task: any) => task.title.toLowerCase().match(filterText.value)|| task.title.toUpperCase().match(filterText.value)  )
        }))
      
    }
  
    // filter string from mat input filter
    applyFilter(filterText: any) {
      this.filterTree(filterText);
      // show / hide based on state of filter string
      if (filterText.value) {
        this.treeControl.expandAll();
      } else {
        this.treeControl.collapseAll();
      }
    }











  filter(data: any) {
  
    if (data.name == 'All Tasks') {
      this.column = false;
      this.task$ = this.getTaskList().pipe(delay(100), map(taskList => {
        return taskList
      }))
    }

    if (data.name == 'Todo') {
      this.columnSort = true;
      this.task$ = this.getTaskList().pipe(map(res=>{
        return this.dataSource.data=res.filter((task:any)=>task.status==0)
      }))
    }
    if (data.name == 'Inprogress') {
      this.columnSort = true;
      this.task$ =  this.getTaskList().pipe(delay(100), map(res => {
        return this.dataSource.data=res.filter((task: any) => task.status == 1 );
      }))

    }
    if (data.name == 'Done') {
      this.columnSort = true;
      this.task$ = this.getTaskList().pipe(delay(100), map(res => {
        return this.dataSource.data=res.filter((task: any) => task.status == 2);
      }))

    }
   this.task$.subscribe((res:any)=>{
      this.dataSource.data=res;
   })
  }

  getTask(task: any) {
    this.searchTask = task.value
  }



  selectStatus(task: any, status: string) {
    let data = task
    data.customizedStatus = status
    let t: any = {}
    t.id = sessionStorage.getItem('taskId')
    data.task = t;
    this.service.updateSubTask(data).subscribe(res => {
      this.task$ = this.getTaskList().pipe(delay(100), map(taskList => {
        return taskList
      }))
    })

  }

  onReset(){
    this.selectedEmp='';
    this.selectedProject='';
    this.selectedPriority='';
    this.refreshTask();

  }


  onStartStop(id:number, status:boolean,method:number){
    let obj:any={};
    obj.activeStatus=!status;
    this.service.pathchTimmer(id,obj,method).subscribe(res=>{
      this.refreshTask();
    })   
  }

  getTime(secs:number){
    let totalTime:string="";
    if(secs<60){
       totalTime=secs.toString()+" Secs";
    }
    return totalTime;

  }

  openTaskFiles(task:any){
    console.log(task,"ttttttttttt");
    
    const bottomSheetRef=this.bottomSheet.open(TaskFilesComponent,{
      data: { id:task.id,
              fileFields: JSON.parse(task.taskType.customFields).filter((field:any)=>(field.type=="file")),
              value: task.taskFiles,
              typeField:JSON.parse(task.typeFields)}});
    bottomSheetRef.afterDismissed().subscribe((fileData: any)=>{
     task.taskFiles=fileData;
      console.log(fileData,"File data");
      
    })
    
  }

  
  ngOnDestroy(): void {
    this.prioritySubscription.unsubscribe();
  }


}
