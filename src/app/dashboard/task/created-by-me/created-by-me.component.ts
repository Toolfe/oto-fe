import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Tasks } from '../create-task/task-model';
import { TaskService } from '../service/task-service.service';
import { CreateSubtaskComponent } from '../subtask/create-subtask/create-subtask.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { GroupService } from 'src/app/app-root/setup-service/task-master-setup/group/group.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { OrderSetupService } from 'src/app/app-root/setup-service/order-setup/order-setup.service';
import { MatSelect } from '@angular/material/select';
export interface Task {
  name: string;
  id:number;
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
  selector: 'app-created-by-me',
  templateUrl: './created-by-me.component.html',
  styleUrls: ['./created-by-me.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class CreatedByMeComponent implements OnInit {


  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems!: number;
  startIndex!: number;
  endIndex!: number;

  displayedColumns: string[] = [

    'title',
    'project',
    'assignee',
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
      taskTitle: node.taskTitle,
      taskDescription: node.taskDescription,
      projectName: node.projectName,
      initiatorName: node.initiatorName,
      assigneeName: node.assigneeName,
      targetDate: node.targetDate,
      priorityName: node.priorityName,
      priorityId: node.priorityId,
      initiatorId: node.initiatorId,
      projectId: node.projectId,
      title: node.title,
      description: node.description,
      dependencies: node.dependencies,
      taskId: node.taskId,
      // status: node.status,
      duration: node.duration,
      statusId: node.statusId,
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
      assignee: node.assignee,
      observers: node.observers,
      initDate: node.initDate,
      subDepartment: node.subDepartment,
      customizedStatus: node.customizedStatus,
      subtaskRating: node.subtaskRating,
      subTasks: node.subTasks,
      task: node.task,
      taskid: node.taskid,
      level: level,
      subtaskParentId: node.subtaskParentId
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



  createdBy$ = this.getTaskList();
  $createdBy: any;
  Refreshing: any[] = [1, 2, 3, 4, 5]
  searchText!: string
  isDesc: boolean = false;
  column: any = 'title';
  columnSort!: boolean;
  taskLists: any;
  tasks: Task[] = [
    { id:1,name: 'Todo' },
    { id:2,name: 'Inprogress' },
    { id:3,name: 'Done' },
  ];
  tasklists: any[] = [];
  isEnable(permision: any) {
    return CommonMethods.userRole('taskManagementModule', 'createdByMe', permision);
  }


  toggleShow() {
    var el: any = document.getElementById("box");
    el.classList.toggle("show");
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
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
 
  selectedInitiatorvalue: any;
  selectedAssignedEmpvalue:any;
  selectedProjectValue: any;
  selectedTypeValue: any;
  selectedGroupValue: any;
  selectedPriorityValue: any;
  selectedOrderValue: any;
  taskStatus:any;
  searchFilter: any;

  constructor(
    private employee: EmployeeService,
    private taskGroup: GroupService,
    private taskType: TypeService,
    private projects: ProjectService,
    private taskPriority:PriorityService,
    private service: TaskService,
    private router: Router,
    private orderNumber:OrderSetupService,
    private notification: NotifierService,
    private dialog: MatDialog
  ) { }
  @ViewChild('itemsPerPageSelect')
  itemsPerPageSelect!: MatSelect;

  ngOnInit(): void {
    setTimeout(() => {
      this.itemsPerPageSelect.value = '10';
    });
  }

  getTaskList(): Observable<any> {

    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;
  
    const data = {
        offset: offset || 0,
      limit: limit|| 10,
      filter:this.searchFilter,
      selectedInitiator:this.selectedInitiatorvalue,
      selectedProject:this.selectedProjectValue,
      selectedPriority:this.selectedPriorityValue,
      selectedOrder:this.selectedOrderValue,
      taskStatus:this.taskStatus,
    }; 
    return this.service.getTaskByCreatedBy(data).pipe(delay(300),
      map(taskList => {
        this.totalItems=taskList.data[1][0].total;
        this.dataSource.data = taskList.data[0];
        this.tasklists = this.dataSource.data;
        this.updatePageInfo();
        return this.dataSource.data;
      }),
      catchError((err) => of('error'))
    )
  }
  getTaskById() {
    this.service.getTaskById().subscribe(res => {
      console.log(res, 'resss');
      sessionStorage.setItem('rootId', res.id)
      console.log(res, 'resssss');

    })
  }


  selectedTask(task: any) {
    console.log(task, 'task');

    if (task.type == 'task') {
      sessionStorage.setItem('rootId', task.id.toString());
      sessionStorage.setItem('taskId', task.id.toString());
      setTimeout(() => {
        this.router.navigate(['../task/view-sub-task']);
      }, 100);
    }
    else if (task.subtaskParentId == null || task.subtaskParentId == 0) {
      // sessionStorage.setItem('rootId', task.taskid.toString());
      let update = this.dialog.open(CreateSubtaskComponent, { data: task });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.createdBy$ = this.getTaskList();

        }
      })
    }


  }



  editData(data: any) {
    let update = this.dialog.open(CreateTaskComponent, { data: data });
    update.afterClosed().subscribe(res => {
      if (res) {
        this.createdBy$ = this.getTaskList();

      }
    })
  }
  editsubtask(data: any) {
    console.log(data, 'subtak');
    if (data.parentId == null) {
      sessionStorage.setItem("rootId", data.taskid.toString())
      let update = this.dialog.open(CreateSubtaskComponent, { data: data });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.createdBy$ = this.getTaskList();

        }
      })
    }


  }

  copyTask(task: any) {
    console.log(task, 'task');

    let dataRow: any = task
    // delete dataRow['id'];
    dataRow['isDuplicate'] = true;
    let update = this.dialog.open(CreateTaskComponent, { data: dataRow });
    update.afterClosed().subscribe(res => {
      if (res) {
        this.createdBy$ = this.getTaskList().pipe(delay(300), map(taskList => {
          return taskList;
        }))
      }
    })

  }



  createTask() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let task = this.dialog.open(CreateTaskComponent, dialogConfig);
    task.afterClosed().subscribe((result: any) => {
      if (result == 'done') {
        this.createdBy$ = this.getTaskList();

      }
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
          // this.getTaskList();
          if (res.success == true) {
            this.notification.openSnackBar('Task Deleted Successfully', 2);
          } else{
            this.notification.openSnackBar('Data In use', 0);
          }
          this.createdBy$ = this.getTaskList().pipe(delay(100), map(taskList => {
            return taskList;
          }));
        })
      } else return;
    })


  }



  getsubtaskList(element: any) {
    if (element.type == 'task') {

      const data = {
        filter:this.searchFilter,
        selectedAssigne:this.selectedAssignedEmpvalue,
        selectedProject:this.selectedProjectValue,
        selectedPriority:this.selectedPriorityValue,
        selectedOrder:this.selectedOrderValue,
        taskStatus:this.taskStatus,
        id:element.id
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

      this.service.getSubtaskBySubtaskId(element.id).subscribe(res => {

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

  // Pagination code set 

  onItemsPerPageChange() {
    this.currentPage = Math.ceil(this.startIndex / this.itemsPerPage);
    this.updatePageInfo();
    this.createdBy$ = this.getTaskList();
  }
  
  onPrevClick() {
    this.currentPage--;
    this.updatePageInfo();
    this.createdBy$ = this.getTaskList();
  }
  
  onNextClick() {
    this.currentPage++;
    this.updatePageInfo();
    this.createdBy$ = this.getTaskList();
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
    this.searchFilter=[]; // Clear the selected values array
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
    this.createdBy$ = this.getTaskList();
  }
  filtersSearch() {
    this.createdBy$ = this.getTaskList();
  }

}
