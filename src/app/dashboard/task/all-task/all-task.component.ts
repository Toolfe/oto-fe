import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
import { SubTaskAttachmentComponent } from '../subtask-attachments/subtask-attachments.component';
import { CommentsComponent } from '../comments/comments.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderSetupService } from 'src/app/app-root/setup-service/order-setup/order-setup.service';
import { MatSelect } from '@angular/material/select';
export interface Task {
  id:number;
  name: string;
}



interface ExampleFlatNode {
  id: number;
  type: string;
  expandable: boolean;
  title: string;
  des: string;
  startdate: any;
  status: string;
  priority: string;
  level: number;
  subTasks: any;
  subtaskParentId: any;
  taskId: any;
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

  attachments: any[] = [];
  userRoleAccess: any;

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
      expandable: node.subtaskcount > 0,
      id: node.id,
      taskTitle: node.taskTitle,
      taskDescription: node.taskDescription,
      projectName: node.projectName,
      initiatorName: node.initiatorName,
      targetDate: node.targetDate,
      priorityName: node.priorityName,
      priorityId: node.priorityId,
      initiatorId: node.initiatorId,
      projectId: node.projectId,
      assigneeId: node.assigneeId,
      title: node.title,
      taskId: node.taskId,
      duration: node.duration,
      statusId: node.statusId,
      description: node.description,
      dependencies: node.dependencies,
      status: node.status,
      priorityFactor: node.priorityFactor,
      type: node.type,
      taskType: node.taskType,
      project: node.project,
      estimatedDate: node.estimatedDate,
      active: node.active,
      activeStatus: node.activeStatus,
      taskTimer: node.taskTimer,
      actual: node.actual,
      createdBy: node.createdBy,
      createdOn: node.createdOn,
      initiator: node.initiator,
      modifiedBy: node.modifiedBy,
      modifiedOn: node.modifiedOn,
      parentId: node.parentId,
      target: node.target,
      code: node.code,
      taskCode: node.taskCode,
      taskGroup: node.taskGroup,
      typeFields: node.typeFields,
      taskFiles: node.taskFiles,

      observers: node.observers,
      initDate: node.initDate,
      subDepartment: node.subDepartment,
      customizedStatus: node.customizedStatus,
      subtaskRating: node.subtaskRating,
      subTasks: node.subTasks,
      task: node.task,
      taskid: node.taskid,
      level: level,
      listType: node.listType,
      subtaskParentId: node.subtaskParentId,
      taskTypeId: node.taskTypeId
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener: any = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.subTasks
  );

  dataSource: any = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;



  emp$ = this.employee.employee$;
  type$ = this.taskType.type$;
  group$ = this.taskGroup.group$;
  project$ = this.projects.project$;
  taskPriority$=this.taskPriority.taskPriority$;
  order$=this.orderNumber.order$;

  $priority: any;
  priority: any;
  prioritySubscription!: Subscription;
  tasklists: any[] = [];
  allTask: boolean = false;
  searchText!: string;

  tasks: Task[] = [
   
    { id:1,name: 'Todo' },
    { id:2,name: 'Inprogress' },
    { id:3,name: 'Done' },

  ];


  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems!: number;
  startIndex!: number;
  endIndex!: number;


  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  Refreshing: any[] = [1, 2, 3, 4, 5]
  task$: any = this.getTaskList()
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


  @ViewChild(MatMenuTrigger)
  ddTrigger!: MatMenuTrigger;

  @ViewChild(MatMenuTrigger)
  type!: MatMenuTrigger;



  selectedInitiatorvalue: any;
  selectedAssignedEmpvalue:any;
  selectedProjectValue: any;
  selectedTypeValue: any;
  selectedGroupValue: any;
  selectedPriorityValue: any;
  selectedOrderValue: any;
  searchFilter:any;
  taskStatus:any;
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
  subtask: any;
  childSubtask: any;
  inprogress: any;

  
  @ViewChild('itemsPerPageSelect')
  itemsPerPageSelect!: MatSelect;


  constructor(private mobileService: MobileQueryService,
    private service: TaskService,
    private dialog: MatDialog,
    private router: Router,
    private employee: EmployeeService,
    private taskGroup: GroupService,
    private taskType: TypeService,
    private projects: ProjectService,
    private priorities: PriorityService,
    private orderNumber:OrderSetupService,
    private notification: NotifierService,
    private status: StatusService,
    private taskPriority:PriorityService,
    private bottomSheet: MatBottomSheet

  ) {
    this.userRoleAccess = CommonMethods.userContext();
    this.mobileQuery = this.mobileService.mobileQuery
  }


  getTaskList(): Observable<any> {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;
  
    const data = {
      offset: offset || 0,
      limit: limit|| 10,
      filter:this.searchFilter,
      selectedInitiator:this.selectedInitiatorvalue,
      selectedAssigne:this.selectedAssignedEmpvalue,
      selectedProject:this.selectedProjectValue,
      selectedPriority:this.selectedPriorityValue,
      selectedOrder:this.selectedOrderValue,
      taskStatus:this.taskStatus,
    };
    return this.service.getAllTask(data).pipe(delay(100),
      map(taskList => {
        this.totalItems=taskList.data[1][0].total;
        this.dataSource.data = taskList.data[0];
        this.tasklists = this.dataSource.data;
        console.log(this.dataSource.data, 'dataSource.data');
        this.updatePageInfo();
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



  ngOnInit(): void {
    this.getTaskList();
    this.autoUpdateTask();
    setTimeout(() => {
      this.itemsPerPageSelect.value = '10';
    });
    
  }

  getsubtaskList(element: any, i: number) {
    if (element.type == 'task') {
      const data = {
        id:element.id,
        filter:this.searchFilter,
        selectedInitiator:this.selectedInitiatorvalue,
        selectedAssigne:this.selectedAssignedEmpvalue,
        selectedProject:this.selectedProjectValue,
        selectedPriority:this.selectedPriorityValue,
        selectedOrder:this.selectedOrderValue,
        taskStatus:this.taskStatus,
      };
      this.service.getSubtaskByTaskId(data).subscribe(res => {
        const userIndex = this.tasklists.findIndex(task => task.id === element.id);
        //  this.dataSource.data[userIndex]['subTasks'] = res.data;
        if (userIndex > -1) {
          this.tasklists[userIndex]['subTasks'] = res.data;
          this.dataSource.data = this.tasklists;
          console.log(this.treeControl.dataNodes);
          const dataNodesIndex = this.findIndexByIdAndType(element.id, 'task');
          this.treeControl.expand(this.treeControl.dataNodes[dataNodesIndex]);
        }
      });
    } else {
      const data = {
        id:element.id,
        filter:this.searchFilter,
        selectedInitiator:this.selectedInitiatorvalue,
        selectedAssigne:this.selectedAssignedEmpvalue,
        selectedProject:this.selectedProjectValue,
        selectedPriority:this.selectedPriorityValue,
        selectedOrder:this.selectedOrderValue,
        taskStatus:this.taskStatus,
      };

      this.service.getSubtaskBySubtaskId(data).subscribe(res => {

        const userIndex = this.tasklists.findIndex(task => task.id === element.taskId && task.type == 'task');
        let node = null;
        if (userIndex > -1) {
          node = this.findObjectInNestedArray(this.tasklists[userIndex]['subTasks'], element);
        } else {
          node = this.findObjectInNestedArray(this.tasklists.filter(f => f.type != 'task'), element);
        }
        node['subTasks'] = res.data;

        this.dataSource.data = this.tasklists;
        let dataNodesIndex = this.findIndexByIdAndType(element.id, 'subtask');

        this.treeControl.expand(this.treeControl.dataNodes[dataNodesIndex]);
        let flagLoop = this.treeControl.dataNodes[dataNodesIndex].subtaskParentId ? true : false;
        let id = this.treeControl.dataNodes[dataNodesIndex].subtaskParentId ? this.treeControl.dataNodes[dataNodesIndex].subtaskParentId : this.treeControl.dataNodes[dataNodesIndex].taskId;
        dataNodesIndex = this.findIndexByIdAndType(id, 'subtask');
        while (flagLoop && this.treeControl.dataNodes[dataNodesIndex].type != 'task') {
          dataNodesIndex = this.findIndexByIdAndType(id, 'subtask');
          if (dataNodesIndex > -1) {
            this.treeControl.expand(this.treeControl.dataNodes[dataNodesIndex]);
            id = this.treeControl.dataNodes[dataNodesIndex].subtaskParentId ? this.treeControl.dataNodes[dataNodesIndex].subtaskParentId : this.treeControl.dataNodes[dataNodesIndex].taskId;
          }
          flagLoop = this.treeControl.dataNodes[dataNodesIndex].subtaskParentId ? true : false;
        }
        dataNodesIndex = this.findIndexByIdAndType(id, 'task');
        this.treeControl.expand(this.treeControl.dataNodes[dataNodesIndex]);
      });

    }
  }

  findObjectInNestedArray(nestedArray: any[], targetObject: any): any {
    for (const item of nestedArray) {
      if (typeof item === 'object') {
        if (item.id == targetObject.id) {
          return item;
        } else {
          let foundItem = null;
          if (item['subTasks'] && item['subTasks'].length > 0)
            foundItem = this.findObjectInNestedArray(item['subTasks'], targetObject);
          if (foundItem) {
            return foundItem;
          }
        }
      }
    }
    return null;
  }

  findIndexByIdAndType(id: number, type: string): number {
    return this.treeControl.dataNodes.findIndex(item => item.id === id && item.type === type);
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
    this.task$ = this.getTaskList().pipe(map(taskList => {
      return taskList;
    }))
  }




  copyTask(task: any) {

    let dataRow: any = task
    console.log(dataRow, 'dataRow');

    delete dataRow['id'];

    dataRow.subTasks.forEach((task: any) => {
      delete task['id']
      delete task['subtaskRating']
    });
    let update = this.dialog.open(CreateTaskComponent, { data: dataRow });
    update.afterClosed().subscribe(res => {
      if (res) {
        this.refreshTask()
      }
    })

  }

  clicktask(task: Tasks) {
    console.log(task.type, 'task');
    if (task.type == 'task') {
      // this.getTaskById();
      sessionStorage.setItem('rootId', task.id.toString());


    }
    else if (task.type == 'subTask') {
      sessionStorage.setItem('subtaskId', task.id.toString());
      // this.getSubTaskById();
    }



  }

  selectedTask(task: any) {



    console.log(task, 'task');
    if (task.type == 'task') {
      // if (this.userRoleAccess.employeeId == task.assigneeId) {
        sessionStorage.setItem('rootId', task.id.toString());
        setTimeout(() => {
          this.router.navigate(['../task/view-sub-task']);
        }, 100);
      // }
    }

    else if (task.type == 'subtask') {
      if (this.userRoleAccess.employeeId == task.assigneeId) {
        sessionStorage.setItem('rootId', task.id.toString());
        this.editSubtask = task;
        this.service.selectedSubTask = task.id.toString();
        sessionStorage.setItem('subtaskId', task.id.toString());
        setTimeout(() => {
          this.router.navigate(['../task/view-parent-sub-task']);
        }, 100);
      } else {
        this.notification.openSnackBar('Assignee person only can access the task', 2);
      }
    }

    else if (task.parentId == null) {
      sessionStorage.setItem('rootId', task.taskid.toString());
      let update = this.dialog.open(CreateSubtaskComponent, { data: task });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.task$ = this.getTaskList();
        }
      })

    } else {
      let update = this.dialog.open(CreateParentSubTaskComponent, { data: task });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.task$ = this.getTaskList();
        }
      })
    }

  }



  editData(data: any) {
    console.log(data, 'data');
    let update = this.dialog.open(CreateTaskComponent, { data: data });
    update.afterClosed().subscribe(res => {
      if (res) {
        this.task$ = this.getTaskList();
      }
    })
  }

  editsubtask(data: any) {
    console.log(data, 'subtak');
    if (data.parentId == null) {
      sessionStorage.setItem("rootId", data.taskId.toString())
      let update = this.dialog.open(CreateSubtaskComponent, { data: data });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.task$ = this.getTaskList();
        }
      })
    } else {
      let update = this.dialog.open(CreateParentSubTaskComponent, { data: data });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.task$ = this.getTaskList();
        }
      })
    }

  }

  getSubTaskById() {
    this.subTaskByIdSubscription = this.service.getSubTask().subscribe(res => {
      console.log(res, 'ressss');

      let subtask: any[] = [];
      subtask.push(res);
      subtask.forEach((element: any) => {
        console.log(element, 'element')
        sessionStorage.setItem('rootId', element.task.id)

      })
    })
  }

  editSubTaskData(data: any) {
    sessionStorage.setItem('subtaskId', data.id.toString())
    this.service.viewSubTaskDataById(data.id).subscribe(res => {
      const subTaskData = res.data[0];
      let update = this.dialog.open(CustomFieldComponent, { data: subTaskData });
      update.afterClosed().subscribe(res => {
        // this.task$ = this.getSubTaskByEmp();
        this.refreshTask();
      })
    });
  }
  // editSubTaskData(data: any) {
  //   console.log(data,'datatatat');
  //   sessionStorage.setItem('subtaskId', data.id.toString())
  //   this.getSubTaskById()
  //   let update = this.dialog.open(CustomFieldComponent, { data: data })
  //   update.afterClosed().subscribe(res=>{
  //     console.log(res,'r1');
  //       this.task$=this.getTaskList();

  //   })

  // }



  getTaskById() {
    this.subTaskByIdSubscription = this.service.getTaskById().subscribe(res => {
      console.log(res, 'resss');
      sessionStorage.setItem('rootId', res.id)
      console.log(res, 'resssss');

    })
  }




  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteTask(data.id).subscribe(res => {

          if (res.success == true) {
            this.task$ = this.getTaskList().pipe(delay(100), map(taskList => {
              return taskList;
            }));
            this.notification.openSnackBar('Task Deleted Successfully', 2);
  
          } else{
            this.notification.openSnackBar('Data In use', 0);
          }
   
        })
      } else return;
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

  onReset() {
    this.selectedEmp = '';
    this.selectedProject = '';
    this.selectedPriority = '';
    this.refreshTask();

  }


  // onStartStop(id: number, status: number) {
  //   let obj: any = {};
  //   obj.id = id;
  //   obj.status = status;
  //   this.service.updateSubTaskActiveStatus(obj).subscribe(res => {
  //     this.refreshTask();
  //   })
  // }
  onStartStop(id: number, status: number) {
    let obj: any = {};
    obj.id = id;
    obj.status = status;
    obj.comment = '';
    if (status === 1) {
      this.onStartStopComment(obj)
    } else {
      this.service.getSubTaskComment(obj).subscribe(res => {
        if (res.success == true) {
          obj.comment = res.data[0].comment;
          this.onStartStopComment(obj)
        }
      })
    }
  }

  onStartStopComment(obj: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = obj;
    dialogConfig.width = '500px';
    let update = this.dialog.open(CommentsComponent, dialogConfig);
    update.afterClosed().subscribe(res => {
      if (res.success === true) {
        // this.task$ = this.getSubTaskByEmp(); 
        this.refreshTask();
      }
    })
    // });
  }
  getTime(secs: number) {
    let totalTime: string = "";
    if (secs < 60) {
      totalTime = secs.toString() + " Secs";
    }
    return totalTime;

  }

  ngOnDestroy(): void {
    // this.prioritySubscription.unsubscribe();
  }

  // openTaskFiles(task: any) {
  //   console.log(task);
  //   this.dialog.open(PropertiesComponent, {
  //     width: '400px',
  //     data: this.attachments,
  //   });
  // }


  openTaskFiles(task: any) {
    // Assuming the task object has a property named 'id' that contains the task ID
    const subTaskId = task.id;

    // Call the service to fetch the attachments based on the task ID
    this.service.getAttachments(subTaskId).subscribe(
      (res) => {
        // The response contains the data you want to pass to the SubTaskAttachmentComponent
        const attachments = res;

        // Open the SubTaskAttachmentComponent as a bottom sheet with the retrieved attachments
        this.bottomSheet.open(SubTaskAttachmentComponent, {
          data: attachments,
        });
      },
      (error) => {
        console.error('Error fetching attachments:', error);
      }
    );
  }

// Pagination code set 


onItemsPerPageChange() {
  this.currentPage = Math.ceil(this.startIndex / this.itemsPerPage);
  this.updatePageInfo();
  this.task$ = this.getTaskList();
}

onPrevClick() {
  this.currentPage--;
  this.updatePageInfo();
  this.task$ = this.getTaskList();
}

onNextClick() {
  this.currentPage++;
  this.updatePageInfo();
  this.task$ = this.getTaskList();
}

updatePageInfo() {
  this.startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
  this.endIndex = Math.min(this.currentPage * this.itemsPerPage);
  if (this.endIndex > this.totalItems) {
    this.endIndex = this.totalItems
  }
}

onResetCreatedByme() {
  this.selectedInitiatorvalue = []; // Clear the selected values array
}

onResetAssignedByme() {
  this.selectedAssignedEmpvalue = []; // Clear the selected values array
}
onResetProject(){
  this.selectedProjectValue = []; // Clear the selected values array
}
onResetOrder(){
  this.selectedOrderValue = []; // Clear the selected values array
}

onResetPriority(){
  this.selectedPriorityValue = []; // Clear the selected values array
}
onResetFilter() {
  this.searchFilter = []; // Clear the selected values array
}
onResetTaskStatus(){
  this.taskStatus=[]; // Clear the selected values array
}
resetSearch() {
  //Reset all selected values
  this.selectedInitiatorvalue = [];
  this.selectedAssignedEmpvalue = [];
  this.selectedProjectValue = [];
  this.selectedOrderValue = []; 
  this.selectedPriorityValue = []; 
  this.searchFilter =null;
  this.taskStatus=[];
  this.task$ = this.getTaskList();
}
filtersSearch() {
  this.task$ = this.getTaskList(); //call get task list for listiing tasks
}



}
