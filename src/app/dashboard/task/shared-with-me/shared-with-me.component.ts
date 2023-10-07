import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { GroupService } from 'src/app/app-root/setup-service/task-master-setup/group/group.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { Tasks } from '../create-task/task-model';
import { CustomFieldComponent } from '../custom-field/custom-field.component';
import { TaskService } from '../service/task-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrderSetupService } from 'src/app/app-root/setup-service/order-setup/order-setup.service';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select/public-api';
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
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class SharedWithMeComponent implements OnInit, OnDestroy {
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
      subtaskTitle: node.subtaskTitle,
      taskTitle: node.taskTitle,
      subtaskDescription: node.subtaskDescription,
      projectName: node.projectName,
      initiatorName: node.initiatorName,
      assigneeName:node.assigneeName,
      dependencies: node.dependencies,
      statusId: node.statusId,
      priorityName: node.priorityName,
      subtaskTargetDate: node.subtaskTargetDate,
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
  sharedwithMe$ = this.getTaskList();
  $sharedWithMe: any;
  emp$ = this.employee.employee$;
  type$ = this.taskType.type$;
  group$ = this.taskGroup.group$;
  project$ = this.projects.project$;
  taskPriority$=this.taskPriority.taskPriority$;
  order$=this.orderNumber.order$;


  $priority: any;
  priority: any;
  prioritySubscription!: Subscription;
  isEmpty: boolean = true;
  subTasks: any;
  Refreshing: any[] = [1, 2, 3, 4, 5]
  searchText!: string;
  isDesc: boolean = false;
  column: any;
  taskLists: any;
  columnSort!: boolean;


  tasks: Task[] = [
    { id:1,name: 'Todo' },
    { id:2,name: 'Inprogress' },
    { id:3,name: 'Done' },


  ];

  isEnable(permision: any) {
    return CommonMethods.userRole('taskManagementModule', 'sharedWithMe', permision);
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
  

  @ViewChild(MatMenuTrigger)
  ddTrigger!: MatMenuTrigger;

  @ViewChild(MatMenuTrigger)
  type!: MatMenuTrigger;


  selectedAssignedEmpvalue: any;
  selectedProjectValue: any;
  selectedTypeValue: any;
  selectedGroupValue: any;
  searchFilter:any;
  taskStatus:any;
  selectedPriorityValue: any;
  selectedEmp!: string;
  selectedProject!: string;
  selectedType!: string;
  selectedGroup!: string;
  selectedPriority!: string;
  selectedOrderValue: any;
  searchType: any;
  searchProject: any;
  searchCreatedBy: any;


  cancelClick(ev: MouseEvent) {
    ev.stopPropagation();
  }

  onCancel() {
    this.ddTrigger.closeMenu();
  }




  constructor(private service: TaskService,
    private router: Router,
    private employee: EmployeeService,
    private taskGroup: GroupService,
    private taskType: TypeService,
    private projects: ProjectService,
    private orderNumber:OrderSetupService,
    private taskPriority:PriorityService,
    private dialog: MatDialog) { }
    @ViewChild('itemsPerPageSelect')
  itemsPerPageSelect!: MatSelect;
  

  ngOnInit(): void {
   
    this.updatePageInfo(); 
    setTimeout(() => {
      this.itemsPerPageSelect.value = '10';
    });
   }

  editSubTaskData(data: any) {
    sessionStorage.setItem('subtaskId', data.id.toString())
    this.service.viewSubTaskDataById(data.id).subscribe(res => {
      // this.getTaskList();
      const subTaskData = res.data[0];
      let update = this.dialog.open(CustomFieldComponent, { data: subTaskData });
      update.afterClosed().subscribe(res => {
        this.sharedwithMe$ = this.getTaskList();
      })
    });
  }
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems!: number;
  startIndex!: number;
  endIndex!: number;
  
  
  getTaskList(): Observable<any> {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;
  
    const data = {
     

      offset: offset || 0,
      limit: limit|| 10,
      filter:this.searchFilter,
      selectedAssigne:this.selectedAssignedEmpvalue,
      selectedProject:this.selectedProjectValue,
      selectedPriority:this.selectedPriorityValue,
      selectedOrder:this.selectedOrderValue,
      taskStatus:this.taskStatus,
    }; 

    return this.service.getTaskByObserver(data).pipe(delay(300),
      map(taskList => {
       this.totalItems=taskList.data[1][0].total;
        this.dataSource.data =taskList.data[0];
        this.taskLists = this.dataSource.data;
        return this.dataSource.data;
      }),
      catchError((err) => of('error'))
    )
  }


  selectedTask(subtask: any) {

    sessionStorage.setItem('taskId', this.service.selectedTask);
    this.service.selectedSubTask = subtask.id.toString();
    sessionStorage.setItem('subtaskId', subtask.id.toString());
    setTimeout(() => {
      this.router.navigate(['../task/view-parent-sub-task'])
    }, 100);
  }
  refreshTask() {
    this.sharedwithMe$ = this.getTaskList().pipe(map(taskList => {
      return taskList;
    }))
  }
  onReset() {
    this.selectedEmp = '';
    this.selectedType = '';
    this.selectedPriority = '';
    this.refreshTask();

  }

  filterTree(filterText: any) {
    return this.dataSource.data = this.getTaskList().pipe(map(taskList => {
      return this.dataSource.data = taskList.filter((task: any) => task.title.toLowerCase().match(filterText.value) || task.title.toUpperCase().match(filterText.value))
    }))

  }


  getsubtaskList(element: any) {
    const data = {
      filter:this.searchFilter,
      selectedAssigne:this.selectedAssignedEmpvalue,
      selectedProject:this.selectedProjectValue,
      selectedPriority:this.selectedPriorityValue,
      selectedOrder:this.selectedOrderValue,
      taskStatus:this.taskStatus,
      id:element.id
    }; 

    this.service.getSubtaskObserversChild(data).subscribe(res => {
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



  // filter string from mat input filter
  applyFilter(filterText: any) {
    this.filterTree(filterText);
    if (filterText.value) {
      this.treeControl.expandAll();
    } else {
      this.treeControl.collapseAll();
    }
  }
  
  // Pagination code set 

  onItemsPerPageChange() {
    this.currentPage = Math.ceil(this.startIndex / this.itemsPerPage);
    this.updatePageInfo();
    this.sharedwithMe$ = this.getTaskList();
  }
  
  onPrevClick() {
    this.currentPage--;
    this.updatePageInfo();
    this.sharedwithMe$ = this.getTaskList();
  }
  
  onNextClick() {
    this.currentPage++;
    this.updatePageInfo();
    this.sharedwithMe$ = this.getTaskList();
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
    this.searchFilter=""; // Clear the selected values array
  }
  onResetTaskStatus(){
    this.taskStatus=[]; // Clear the selected values array
  }
  resetSearch() {
    //Reset all selected values
   // this.selectedInitiatorvalue = [];
    this.selectedAssignedEmpvalue = [];
    this.selectedProjectValue = [];
    this.selectedOrderValue = []; 
    this.selectedPriorityValue = []; 
    this.searchFilter =null;
    this.taskStatus=[];
    this.sharedwithMe$ = this.getTaskList();
  }
    
  filtersSearch() {
    this.sharedwithMe$ = this.getTaskList();
  }

}
