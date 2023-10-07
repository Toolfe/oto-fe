import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, merge, Observable, of, Subscription } from 'rxjs';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { GroupService } from 'src/app/app-root/setup-service/task-master-setup/group/group.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { StatusService } from 'src/app/app-root/setup-service/task-master-setup/status/status.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';

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
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
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
  private transformer = (node: any, level: number) => {
    return {
      node: node,
      expandable: node.subtaskcount > 0,
      id:node.id,
      taskTitle:node.taskTitle,
      taskDescription:node.taskDescription,
      projectName: node.projectName,
      initiatorName : node.initiatorName, 
      targetDate: node.targetDate,
      priorityName : node.priorityName,
      priorityId : node.priorityId,
      initiatorId : node.initiatorId,
      projectId : node.projectId,
      title: node.title,
      taskId: node.taskId,
      duration : node.duration,
      statusId : node.statusId,
      description: node.description,
      dependencies:node.dependencies,
      status: node.status,
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
      taskid:node.taskid,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<DynamicFlatNode>(
    (node) => node.level,
    (node) => {console.log(node+"tree"+node.expandable);return node.expandable;},
  );

  treeFlattener:any= new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => {console.log(node.id+"flatter"+node.expandable);return node.expandable;},
    (node) => node.subTasks
  );

  dataSource:any= null;
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
    private dialog: MatDialog,
    private router: Router,
    private employee: EmployeeService,
    private taskGroup: GroupService,
    private taskType: TypeService,
    private projects: ProjectService,
    private priorities: PriorityService,
    private notification: NotifierService,
    private status: StatusService,
    private bottomSheet:MatBottomSheet,database: DynamicDatabase

  ) {
  
    this.mobileQuery = this.mobileService.mobileQuery;
   this.dataSource= new DynamicDataSource(this.treeControl, database);
   this.dataSource.data = database.initialData();
   this.getTaskList()
   this.task$ = this.getTaskList()
  }
 

  getTaskList(): Observable<any> {
    return this.service.getAllTask().pipe(delay(100),
      map(taskList => {
        this.dataSource.data = taskList.data;
        this.tasklists = this.dataSource.data; 
        console.log( this.dataSource.data,'dataSource.data');
        return this.dataSource.data;
      }),
      catchError((err) => of('error'))
    )
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
    // this.getPriority();
    this.autoUpdateTask();

  }


  getsubtaskList(element:any) {
    if (element.type == 'task'){
    this.service.getSubtaskByTaskId(element.id).subscribe(res=>{
       const userIndex = this.tasklists.findIndex(task => task.id === element.id);
       this.dataSource.data[userIndex]['subTasks'] = res.data;
       this.dataSource.data = [...this.dataSource.data];

      //  this.treeControl.expand(this.findNode(element.id));
      //  this.dataSource.refresh();

      //this.dataSource.data = this.tasklists;
        // this.treeControl.expand(element.node);
      //  this.treeControl.dataNodes(element.node);
    //  this.treeControl.expandAll(); 
    });
  } else {
    this.service.getSubtaskBySubtaskId(element.id).subscribe(res=>{
      const userIndex = this.tasklists.findIndex(task => task.id === element.taskId);
      let node = this.findObjectInNestedArray(this.tasklists[userIndex]['subTasks'],element);
      node['subTasks'] = res.data;
     this.dataSource.data = this.tasklists;
     this.treeControl.expandAll(); 
   });
  }
}

findNode(nodeName: any): any | null {
  const stack: any[] = this.dataSource.data; // Start from the root node

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (node.id === nodeName) {
      return node; // Found the desired node
    }

    if (node.children) {
      stack.push(...node.children);
    }
  }

  return null; // Node not found
}


   findObjectInNestedArray(nestedArray: any[], targetObject: any): any {
    for (const item of nestedArray) {
      if (typeof item === 'object') {
        if (item.id == targetObject.id) {
          return item;
        } else {
          let foundItem = null;
          if(item['subTasks'] && item['subTasks'].length>0)
           foundItem=this.findObjectInNestedArray(item['subTasks'], targetObject);
          if (foundItem) {
            return foundItem;
          }
        }
      }
    }
    return null;
  }
  
  // getsubtaskList(id:number,index:number,element:any) {
  //   this.service.getsubtasklist(id).subscribe(res=>{
  //     const userIndex = this.tasklists.findIndex(task => task.taskId === id);
  //     this.tasklists[userIndex]['subTasks'] = res.data;
  //     this.dataSource.data['subTasks'] = res.data; = this.tasklists;
  //     this.treeControl.expandAll(); 
  //   });
  // }


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
    this.task$ = interval(15000000000000000000000)
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
      // this.getTaskById();
      sessionStorage.setItem('rootId', task.id.toString());
     
   
    }
    else if(task.type=='subTask'){
      sessionStorage.setItem('subtaskId', task.id.toString());
      // this.getSubTaskById();
    }

  
  
  }

  selectedTask( task:any) {
    console.log(task,'task');
    if(task.type == 'task' ){
      sessionStorage.setItem('rootId', task.id.toString());
      setTimeout(() => {
        this.router.navigate(['../task/view-sub-task']);
      }, 100);
    }

    else if(task.type == 'subtask'){
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


  onStartStop(id:number, status:number){
    let obj:any={};
    obj.id = id;
    obj.status = status;
    this.service.updateSubTaskActiveStatus(obj).subscribe(res=>{
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
    // this.prioritySubscription.unsubscribe();
  }


}



export class DynamicFlatNode {
  constructor(public item: any, public level = 1, public expandable = false,
              public isLoading = false) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
  ]);

  rootLevelNodes: string[] = ['Fruits', 'Vegetables'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.getTaskList().pipe().map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<DynamicFlatNode> {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              private _database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(name =>
          new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}
