import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject, of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
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
import { Subtask, Tasks } from '../create-task/task-model';
import { CustomFieldComponent } from '../custom-field/custom-field.component';
import { CommentsComponent } from '../comments/comments.component';
import { TaskService } from '../service/task-service.service';
import { CreateParentSubTaskComponent } from '../subtask/create-parent-sub-task/create-parent-sub-task.component';
import { CreateSubtaskComponent } from '../subtask/create-subtask/create-subtask.component';
import { TaskRootComponent } from '../task-root/task-root.component';
import { MatSort } from '@angular/material/sort';
import { OrderSetupService } from 'src/app/app-root/setup-service/order-setup/order-setup.service';
import { MatSelect } from '@angular/material/select/select';
export interface Task {
  id: number;
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
  selector: 'app-assign-to-me',
  templateUrl: './assign-to-me.component.html',
  styleUrls: ['./assign-to-me.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class AssignToMeComponent implements OnInit, OnDestroy {
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
      expandable: node.subtaskcount > 0,
      id: node.id,
      subtaskTitle: node.subtaskTitle,
      taskTitle: node.taskTitle,
      subtaskDescription: node.subtaskDescription,
      projectName: node.projectName,
      initiatorName: node.initiatorName,
      dependencies: node.dependencies,
      statusId: node.statusId,
      priorityName: node.priorityName,
      subtaskTargetDate: node.subtaskTargetDate,
      title: node.title,
      description: node.description,
      // dependencies:node.dependencies,
      status: node.status,
      subtaskStatusId: node.subtaskStatusId,
      priorityFactor: node.priorityFactor,
      type: node.type,
      taskType: node.taskType,
      project: node.project,
      estimatedDate: node.estimatedDate,
      active: node.active,
      activeStatus: node.activeStatus,
      subtaskDuration: node.subtaskDuration,
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
      assignee: node.assignee,
      observers: node.observers,
      initDate: node.initDate,
      subDepartment: node.subDepartment,
      customizedStatus: node.customizedStatus,
      subtaskRating: node.subtaskRating,
      subTasks: node.subTasks,
      task: node.task,
      taskId: node.taskId,
      subtaskParentId: node.subtaskParentId,
      taskName: node.taskName,
      level: level,
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
  taskPriority$ = this.taskPriority.taskPriority$;
  order$ = this.orderNumber.order$;


  $priority: any;
  priority: any;
  prioritySubscription!: Subscription;
  tasklists: any[] = [];
  allTask: boolean = false;
  taskLists: any;

  isDesc: boolean = false;
  column: any = 'title';
  columnSort!: boolean;

  searchText!: string;
  tasks: Task[] = [
    { id: 1, name: 'Todo' },
    { id: 2, name: 'Inprogress' },
  ];

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  Refreshing: any[] = [1, 2, 3, 4, 5]

  task$ = this.getSubTaskByEmp()
  status$ = this.status.status$;
  task: any;
  mergeData: any;



  @Input() parent: any = FormGroup;
  isEmpty!: boolean;
  hide: boolean = false;
  $taskList: any[] = [];
  $task: any[] = [];
  taskSearch: any;
  dotoSearch: any;

  joined$!: BehaviorSubject<string[]>;
  taskId: any;

  mobileQuery: MediaQueryList
  length = 100;


  @ViewChild(MatMenuTrigger)
  ddTrigger!: MatMenuTrigger;

  @ViewChild(MatMenuTrigger)
  type!: MatMenuTrigger;

  @ViewChild('itemsPerPageSelect')
  itemsPerPageSelect!: MatSelect;


  selectedInitiatorvalue: any;
  selectedProjectValue: any;
  selectedTypeValue: any;
  selectedGroupValue: any;
  selectedPriorityValue: any;
  selectedOrderValue: any;
  taskStatus: any;
  searchFilter: any;
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

  searchProject: any;
  searchCreatedBy: any;

  constructor(private mobileService: MobileQueryService,
    private service: TaskService,
    private dialog: MatDialog,
    private router: Router,
    private employee: EmployeeService,
    private taskGroup: GroupService,
    private taskType: TypeService,
    private projects: ProjectService,
    private taskPriority: PriorityService,
    private orderNumber: OrderSetupService,
    private priorities: PriorityService,
    private notification: NotifierService,
    private status: StatusService,


  ) {

    this.mobileQuery = this.mobileService.mobileQuery
  }

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems!: number;
  startIndex!: number;
  endIndex!: number;


  getSubTaskByEmp(): Observable<any> {

    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    const data = {
      offset: offset || 0,
      limit: limit || 10,
      filter: this.searchFilter,
      selectedInitiator: this.selectedInitiatorvalue,
      selectedProject: this.selectedProjectValue,
      selectedPriority: this.selectedPriorityValue,
      selectedOrder: this.selectedOrderValue,
      taskStatus: this.taskStatus,
    };

    return this.service.getTaskByAssignee(data).pipe(
      delay(100),
      map(taskByAssignee => {
        this.totalItems = taskByAssignee.data[1][0].total;
        this.dataSource.data = taskByAssignee.data[0];;
        this.taskLists = this.dataSource.data;
        this.updatePageInfo();
        return this.dataSource.data;
      }),
      catchError((err) => of('error')))
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


  sort(property: any) {
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
     setTimeout(() => {
      this.itemsPerPageSelect.value = '10';
    });
  }




  getsubtaskList(element: any) {

    const data = {
      filter: this.searchFilter,
      selectedInitiator: this.selectedInitiatorvalue,
      selectedProject: this.selectedProjectValue,
      selectedPriority: this.selectedPriorityValue,
      selectedOrder: this.selectedOrderValue,
      taskStatus: this.taskStatus,
      id: element.id
    };

    this.service.getSubtaskAssigneeChild(data).subscribe(res => {
      const userIndex = this.taskLists.findIndex((task: { id: any; }) => task.id === element.id);
      let node = this.findObjectInNestedArray(this.taskLists, element);
      node['subTasks'] = res.data;
      this.dataSource.data = this.taskLists;
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


  createTask() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let task = this.dialog.open(CreateTaskComponent, dialogConfig);
    task.afterClosed().subscribe((result: Tasks) => {
      if (result) {
        this.task$ = this.getSubTaskByEmp().pipe(delay(100), map(taskList => {
          return taskList.filter((task: any) => task.id == result.id);

        }))

      }
    })


  }
  getSubTaskById() {
    this.subTaskByIdSubscription = this.service.getSubTask().subscribe(res => {
      this.task = res
      let subtask: any[] = [];
      subtask.push(res);
      this.subTask = subtask;
      this.subTask.forEach((element: any) => {
        sessionStorage.setItem('rootId', element.task.id)
        this.taskId = element.task.id

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

  editsubtask(data: any) {
    console.log(data, 'subtak');
    if (data.parentId == null) {
      this.dialog.open(CreateSubtaskComponent, { data: data });
    } else {
      this.dialog.open(CreateParentSubTaskComponent, { data: data });
    }

  }






  refreshTask() {
    this.task$ = this.getSubTaskByEmp().pipe(delay(100), map(taskList => {
      return taskList;

    }))
  }






  selectedTask(task: any) {

    if (task.type == 'subtask') {
      this.service.selectedSubTask = task.id.toString();
      this.service.currentSubtaskId = task.id;
      sessionStorage.setItem('subtaskId', task.id.toString());
      setTimeout(() => {
        this.router.navigate(['../task/view-parent-sub-task']);
      }, 100);
    } else {
      this.dialog.open(CreateParentSubTaskComponent, { data: task });
    }
  }

  selectedSubTask(task: Tasks, subtask: any) {
    this.service.selectedTask = task.id.toString();
    sessionStorage.setItem('taskId', this.service.selectedTask);
    this.service.selectedSubTask = subtask.id.toString();
    sessionStorage.setItem('subtaskId', subtask.id.toString());
    setTimeout(() => {
      this.router.navigate(['../task/view-parent-sub-task']);
    }, 100);
  }




  editData(data: any) {
    this.dialog.open(CreateTaskComponent, { data: data });
  }

  clicktask(task: Tasks) {
    console.log(task.type, 'task');
    if (task.type == 'task') {
      sessionStorage.setItem('rootId', task.id.toString());
    }
    if (task.type == 'subTask') {
      sessionStorage.setItem('subtaskId', task.id.toString());
    }

    // this.getSubTaskById();

  }



  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteTask(data).subscribe(res => {
          this.task$ = this.getSubTaskByEmp().pipe(delay(100), map(taskList => {
            return taskList;
          }));
          this.notification.openSnackBar('Task Deleted Successfully', 2);

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
      this.task$ = this.getSubTaskByEmp().pipe(delay(100), map(taskList => {
        return taskList;
      }))
    })

  }


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
      // if (res.success === true) {
        // this.task$ = this.getSubTaskByEmp(); 
        this.refreshTask();
      // }
    })
    // });
  }

  filterTree(filterText: any) {
    return this.dataSource.data = this.getSubTaskByEmp().pipe(map(taskList => {
      return this.dataSource.data = taskList.filter((task: any) => task.title.toLowerCase().match(filterText.value) || task.title.toUpperCase().match(filterText.value))
    }))

  }

  // Pagination code set 

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.updatePageInfo();
    this.task$ = this.getSubTaskByEmp();
  }

  onPrevClick() {
    this.currentPage--;
    this.updatePageInfo();
    this.task$ = this.getSubTaskByEmp();
  }

  onNextClick() {
    this.currentPage++;
    this.updatePageInfo();
    this.task$ = this.getSubTaskByEmp();
  }

  updatePageInfo() {

    this.startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endIndex = Math.min(this.currentPage * this.itemsPerPage);
    if (this.endIndex > this.totalItems) {
      this.endIndex = this.totalItems
    }
  }


  ngOnDestroy(): void {
    // this.prioritySubscription.unsubscribe();
  }

  onResetCreatedByme() {
    this.selectedInitiatorvalue = []; // Clear the selected values array
  }
  onResetProject() {
    this.selectedProjectValue = []; // Clear the selected values array
  }
  onResetOrder() {
    this.selectedOrderValue = []; // Clear the selected values array
  }
  onResetPriority() {
    this.selectedPriorityValue = []; // Clear the selected values array
  }
  onResetFilter() {
    this.searchFilter = ""; // Clear the selected values array
  }
  onResetTaskStatus() {
    this.taskStatus = []; // Clear the selected values array
  }
  resetSearch() {
    //Reset all selected values
    this.selectedInitiatorvalue = [];
    //this.selectedAssignedEmpvalue = [];
    this.selectedProjectValue = [];
    this.selectedOrderValue = [];
    this.selectedPriorityValue = [];
    this.searchFilter = null;
    this.taskStatus = [];
    this.task$ = this.getSubTaskByEmp();
  }
  filtersSearch() {
    this.task$ = this.getSubTaskByEmp()
  }
}
