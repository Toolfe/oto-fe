import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { ChatComponent } from '../../dashboard-root/chat/chat.component';
import { RatingCalculationComponent } from '../rating-calculation/rating-calculation.component';
import { TaskService } from '../service/task-service.service';
import { CreateSubtaskComponent } from './create-subtask/create-subtask.component';
import { SubTask } from './sub-task.model';
import { TaskHistoryComponent } from './task-history/task-history.component';



@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']

})
export class SubtaskComponent implements OnInit, OnDestroy {

  isEditable: boolean = false;

  viewTask$ = this.service.getTask();


  tasks: any = [] = []
  taskPriorities: any = {};
  subTasksSubscription!: Subscription;

  count: number = 0;
  @ViewChild('container1') con1: any;
  @ViewChild('container2') con2: any;
  @ViewChild('container3') con3: any;
  panelOpenState!: any;
  subtasks: any[] = []

  todo: any[] = [];
  inprogress: any[] = []
  done: any[] = [];
  dependenciesStatus: any;
  taskDependency: any;


  subtask: any;
  subTask: any
  taskId: any;
  updatedData: any = {}

  subtaskSubscription!: Subscription;
  prioritySubscription!: Subscription;
  currentTask!: SubTask;
  allowDelete: boolean = false;


  dropTask: any;
  hide!: boolean;
  taskStatus!: boolean;
  todostatus!: boolean;
  inprogressStatus!: boolean;
  doneStatus!: boolean;
  isOverriding: boolean = false;
  status: any;

  isReadMore: boolean = false;

  constructor(private service: TaskService,
    private notification: NotifierService,
    private dialog: MatDialog,
    private priorities: PriorityService,
    private location: Location) {
    this.todostatus = true
  }


  drop(event: any) {
    let selectedTask = this.updatedData;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }



    if (event.previousContainer.id === 'toDo' && event.container.id === 'inProgress') {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      event.container.data[event.currentIndex].status = 1
      this.updatedData.status = 2;
      this.service.updateSubTaskStatus(this.updatedData).subscribe(res => {
        if (this.updatedData.status == 2) {
          this.inprogressStatus = true;
          this.todostatus = false;
          this.doneStatus = false;
          // let s1:any; 
          // s1=1;
          // this.tasks.status=s1;
          //  this.service.updateTask(this.tasks).subscribe(res1=>{
          //   this.tasks.status=s1;
          // }) 
        }
      })
    }

    if (event.previousContainer.id === 'inProgress' && event.container.id === 'done') {
      let selectedTask = this.updatedData;
      // selectedTask.dependencies.filter((dependency: any) => {
      // if (dependency.status !== 2) {
      //   this.notification.openSnackBar('Please complete all dependencies', 2);
      // }else if(dependency.status==2){

      this.service.getSubTaskDependenciesStatus(this.updatedData.id).subscribe(res => {
        if (res.success === true) {
          this.notification.openSnackBar(`Please complete all dependencies`, 2);
        } else if (res.success === false){

          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
          event.container.data[event.currentIndex].status = 2
          this.updatedData.status = 3;
          this.service.updateSubTaskStatus(this.updatedData).subscribe(res => {
           
            if (this.updatedData.status == 3) {
              this.initiateRating();
              this.inprogressStatus = true;
              this.todostatus = false;
              this.doneStatus = false;
              let s1: any;
              s1 = 2;
              this.tasks.status = s1;
              //  this.service.updateTask(this.tasks).subscribe(res1=>{
              //   this.tasks.status=s1;
              // }) 
            }
          })
        }
        // }
        // })
      })
    }

    if (event.previousContainer.id === 'inProgress' && event.container.id === 'done' && selectedTask.dependencies.length === 0) {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      event.container.data[event.currentIndex].status = 2
      this.updatedData.status = 3;
      this.service.updateSubTaskStatus(this.updatedData).subscribe(res => {
        console.log(res, 'r');

        if (res) {
          this.todo = [],
          this.inprogress = [],
          this.done = []
          this.getTaskById();
        }

        if (this.inprogress.length == 0 && this.todo.length == 0) {
          this.doneStatus = true;
          this.inprogressStatus = false;
          this.todostatus = false;
          let s1: any;
          s1 = 2;
          this.tasks.status = s1;
          this.service.updateTask(this.tasks).subscribe(res1 => {
            this.tasks.status = s1;

          })
        }

      })
    }

    if (event.previousContainer.id === 'inProgress' && event.container.id === 'toDo') {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      event.container.data[event.currentIndex].status = 0;
      this.updatedData.status = 1;
      this.service.updateSubTaskStatus(this.updatedData).subscribe(res => {
        if (this.updatedData.status == 0) {
          this.inprogressStatus = true;
          this.todostatus = false;
        }

        if (this.inprogress.length == 0 && this.done.length == 0) {
          this.inprogressStatus = false;
          this.todostatus = true;
          let s1: any;
          s1 = 0;
          this.tasks.status = s1
          this.service.updateTask(this.tasks).subscribe(res1 => {
            this.tasks.status = s1;

          })
        }

      })
    }

    if (event.previousContainer.id === 'done' && event.container.id === 'inProgress') {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      event.container.data[event.currentIndex].status = 1;
      this.updatedData.status = 2;
      this.service.updateSubTaskStatus(this.updatedData).subscribe(res => {
        if (res) {
          this.todo = [],
          this.inprogress = [],
          this.done = []
          this.getTaskById();
        }
        if (this.inprogress.length > 0) {
          this.inprogressStatus = true;
          this.doneStatus = false;
          this.todostatus = false;
          let s1: any;
          s1 = 1
          this.tasks.status = s1;
          this.service.updateTask(this.tasks).subscribe(res1 => {
            this.tasks.status = s1;

          })
        }

      })
    }
    if (event.previousContainer.id == 'toDo' && event.container.id == 'done') {
      this.notification.openSnackBar("You can't directly move a subtask from Todo into Done!", 2)
      event.container.data[event.currentIndex].status = 1;


    }
    if (event.previousContainer.id == 'done' && event.container.id == 'toDo') {
      this.notification.openSnackBar("You can't directly move a subtask from Done into Todo!", 2)
      event.container.data[event.currentIndex].status = 4;

    }

  }




  onClick(data: any) {
    // sessionStorage.setItem('assigneeId',data.assignee.id);
    this.service.selectedDropTask = data;
    this.service.viewSubTaskDataById(this.service.selectedDropTask.id).subscribe(res => {
      // let task: any = {};
      // task.id = this.taskId;
      const subTaskData = res.data[0];
      this.updatedData = data;
      // this.updatedData.task = task;
      this.service.selectedDropTask = subTaskData;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '40%';
      let update = this.dialog.open(RatingCalculationComponent, { data: subTaskData });
      update.afterClosed().subscribe(res => {
        if (res) {
          this.todo = [],
          this.inprogress = [],
          this.done = []
          this.getTaskById();
        }
      })
    });


  }



  onDrop(event: any, data: any) {

    // sessionStorage.setItem('assigneeId',data.assigneeId);
    this.service.selectedDropTask = data;
    // let task: any = {};
    // task.id = this.taskId
    // this.updatedData = data
    this.updatedData.id = data.id
    // if (event.container.id == 'done' && event.previousContainer.id == 'inProgress') {

      // setTimeout(() => {

      // this.service.viewSubTaskDataById(this.service.selectedDropTask.id).subscribe(res => {
      //   if (res.success == true) {
      //     const subTaskData = res.data[0];
      //     this.service.selectedDropTask = subTaskData;
      //     const dialogConfig = new MatDialogConfig();
      //     dialogConfig.disableClose = true;
      //     dialogConfig.autoFocus = true;
      //     dialogConfig.width = '40%';
      //     this.dialog.open(RatingCalculationComponent, { data: subTaskData });
      //   }
   
      // });
    // }, 300);
    // }

  }

  initiateRating(){
    this.service.viewSubTaskDataById(this.service.selectedDropTask.id).subscribe(res => {
      if (res.success == true) {
        const subTaskData = res.data[0];
        this.service.selectedDropTask = subTaskData;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';

        let update = this.dialog.open(RatingCalculationComponent, { data: subTaskData });
        update.afterClosed().subscribe(res => {
          if (res) {
            this.todo = [],
            this.inprogress = [],
            this.done = []
            this.getTaskById();
          }
        });
      }
    });
  } 



  ngOnInit(): void {
    this.panelOpenState = true;
    this.getTaskById();
    //    this.prioritySubscription= this.priorities.getPriority().subscribe(res=>{
    //     this.taskPriorities=res.content[0];
    //     console.log(this.taskPriorities);
    //  })
  }





  openChat() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(ChatComponent, {
      panelClass: 'confirm-dialog-container',
      width: '30%',
      height: '85vh',
      position: {
        right: '2%'
      },
    })
  }


  refresh() {
    this.viewTask$ = this.service.getSubTaskById();
  }

  getPriority(priority: any) {
    let priorityClass: string = ""
    if (priority == 1) {
      priorityClass = "overRiding"
      this.isOverriding = true;
    } else if (priority == 2) {
      priorityClass = "overWhelming"
    }
    else if (priority == 3) {
      priorityClass = "moderatePriority"
    }
    else if (priority == 4) {
      priorityClass = "subjectivePriority"
    }
    else {
      priorityClass = "normalPriority"
    }
    return priorityClass;
  }

  crateSubtask(tId: any, pId: any) {
    console.log(tId, " ", pId);

    const dialogConfig = new MatDialogConfig();
    let obj: any = {};
    obj.taskId = tId;
    obj.projectId = pId;
    obj.type = "create";
    dialogConfig.data = obj;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let task = this.dialog.open(CreateSubtaskComponent, dialogConfig)
    task.afterClosed().subscribe(res => {
      if (res) {
        this.todo = [],
        this.inprogress = [],
        this.done = []
        this.getTaskById();
      }

    })
  }





  getTaskById(): any {
    this.subtaskSubscription = this.service.getTaskById().subscribe(res => {
      this.tasks = res.data[0];
      console.log(this.tasks, "ttt");
      this.taskId = res.id;
      let subtask: any[] = [];
      subtask.push(res.data[0]);
      this.subTask = subtask;
      this.subTask.forEach((element: any) => {
        this.subtasks = element.subTasks;
        element.subTasks.forEach((subtask: any) => {
          if (subtask.statusId == 1) {
            this.todo.push(subtask);
            console.log(this.todo, 'todo');

          }
          if (subtask.statusId == 2) {
            this.inprogress.push(subtask);
          }
          if (subtask.statusId == 3) {
            this.done.push(subtask);
          }

          if (this.todo.length > 0) {
            this.todostatus = true;
            this.doneStatus = false;
          }
          if (this.inprogress.length > 0) {
            this.inprogressStatus = true;
            this.todostatus = false
            this.doneStatus = false;
          }
          if (this.todo.length == 0 && this.inprogress.length == 0) {
            this.doneStatus = true;
            this.inprogressStatus = false;
            this.todostatus = false;

          }

          if (this.done.length > 0 && this.todo.length > 0) {
            this.inprogressStatus = true;
            this.todostatus = false;
            this.doneStatus = false;
          }

        });
      })

    })
  }






  editData(data: any) {
    console.log(data, 'data');

    let update = this.dialog.open(CreateSubtaskComponent, { data: data });
    update.afterClosed().subscribe(res => {
      console.log(res, 'res');
      if (res) {
        this.todo = [],
        this.inprogress = [],
        this.done = []
        this.getTaskById();
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
        this.service.deleteSubTask(data).subscribe(res => {
          this.todo = this.todo.filter(item => item.id != data.id);
          this.notification.openSnackBar('Task Deleted Successfully', 2);

        })
      } else return;
    })


  }

  selectedTask(task: SubTask) {
    if (task.status == 0) {
      this.allowDelete = true;
    }
    this.currentTask = task;

  }

  taskHistory() {
    let task = this.currentTask;
    this.dialog.open(TaskHistoryComponent, { data: task, autoFocus: false });
  }

  onBack() {
    this.location.back();
  }

  readMore() {
    this.isReadMore = true;

  }
  readLess() {
    this.isReadMore = false;
  }
  ngOnDestroy(): void {
    // this.subtaskSubscription.unsubscribe();
    // this.prioritySubscription.unsubscribe();
  }

}


