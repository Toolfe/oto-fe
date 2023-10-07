import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { of, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { StatusService } from 'src/app/app-root/setup-service/task-master-setup/status/status.service';
import { ChatComponent } from 'src/app/dashboard/dashboard-root/chat/chat.component';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CustomFieldComponent } from '../../custom-field/custom-field.component';
import { RatingCalculationComponent } from '../../rating-calculation/rating-calculation.component';
import { TaskService } from '../../service/task-service.service';
import { CreateParentSubTaskComponent } from '../create-parent-sub-task/create-parent-sub-task.component';
import { SubTask } from '../sub-task.model';
import { TaskFilesComponent } from '../task-files/task-files.component';
import { TaskHistoryComponent } from '../task-history/task-history.component';
import { CommentsComponent } from '../../comments/comments.component';

@Component({
  selector: 'app-parent-sub-task',
  templateUrl: './parent-sub-task.component.html',
  styleUrls: ['../subtask.component.scss', './parent-sub-task.component.scss'],


})
export class ParentSubTaskComponent implements OnInit, OnDestroy {
  @Input() parentTask: any = FormGroup;
  @Output() newItemEvent = new EventEmitter<string>();

  isEditable: boolean = false;
  viewSubTask$ = this.service.getTask();
  status$ = this.service.getMasterData('tm008');
  hide!: boolean;
  task1: any;
  formFields: any;

  count: number = 0;
  @ViewChild('container1') con1: any;
  @ViewChild('container2') con2: any;
  @ViewChild('container3') con3: any;
  panelOpenState!: any;
  subTask: any[] = [];
  todo: any[] = [];
  inprogress: any[] = [];
  done: any[] = [];


  subTasks: any;
  updatedData: any = {}
  currentSubtaskStatus: any = {}
  taskId: any;
  selectedTask: any;
  dropTask: any;

  taskStatus!: boolean;
  todostatus!: boolean;
  inprogressStatus!: boolean;
  doneStatus!: boolean;
  fileFields: any = [];

  tasks: any = [] = []
  subtasks: any;
  rootTask: any;
  deptName: any;

  subTaskByIdSubscription!: Subscription;
  subTaskByParentSubscription!: Subscription;
  currentTask!: SubTask;
  allowDelete: boolean = false
  isReadMore!: boolean;

  constructor(
    private service: TaskService,
    private notification: NotifierService,
    private dialog: MatDialog,
    private status: StatusService,
    private priorities: PriorityService,
    private bottomSheet: MatBottomSheet,
    private location: Location
  ) {
    this.todostatus = true
  }


  taskPriorities: any = {};
  prioritySubscription!: Subscription;
  ngOnInit(): void {
    this.panelOpenState = true;
    this.getSubTaskById();

    // this.prioritySubscription= this.priorities.getPriority().subscribe(res=>{
    //   this.taskPriorities=res.content[0];
    // })

  }



  drop(event: any, data: any) {
    let selectedTask = this.updatedData;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    if (event.previousContainer.id === 'toDo' && event.container.id === 'inProgress') {
      let selectedTask = this.updatedData;
      // selectedTask.dependencies.filter((dependency: any) => {
      //   if (dependency.status !== 2) {
      // this.notification.openSnackBar('Please complete all dependencies', 2);
      // } else if (dependency.status == 2) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      event.container.data[event.currentIndex].status = 1
      this.updatedData.status = 2;
      this.service.updateSubTaskStatus(this.updatedData).subscribe(res => {
        if (this.updatedData.status == 2) {
          this.inprogressStatus = true;
          this.todostatus = false;
          this.doneStatus = false;
          // let s1: any;
          // s1 = 1;
          // this.tasks.status = s1;
          // this.service.updateTask(this.tasks).subscribe(res1 => {
          //   this.tasks.status = s1;
          // })
        }
      })
      // }
      // })

    }

    if (event.previousContainer.id === 'toDo' && event.container.id === 'inProgress' && selectedTask.dependencies.length === 0) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      event.container.data[event.currentIndex].status = 1
      this.service.updateSubTask(this.updatedData).subscribe(res => {
        if (this.updatedData.status == 1) {
          this.inprogressStatus = true;
          this.todostatus = false;
          this.doneStatus = false;
          let s1: any;
          s1 = 1;
          this.tasks.status = s1
          this.service.updateTask(this.tasks).subscribe(res1 => {
            this.tasks.status = s1;
          })
        }

      })

    }

    if (event.previousContainer.id === 'inProgress' && event.container.id === 'done') {

      this.service.getSubTaskDependenciesStatus(this.updatedData.id).subscribe(res => {
        if (res.success === true) {
          this.notification.openSnackBar(`Please complete all dependencies`, 2);
        } else if (res.success === false) {
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          event.container.data[event.currentIndex].status = 2
          this.updatedData.status = 3;
          this.service.updateSubTaskStatus(this.updatedData).subscribe(res => {


            if (this.updatedData.status == 3) {
              this.initiateRating();
              this.doneStatus = true;
              this.inprogressStatus = false;
              this.todostatus = false;
              let s1: any;
              s1 = 2;
              this.tasks.status = s1;
              // this.service.updateTask(this.tasks).subscribe(res1 => {
              //   this.tasks.status = s1;
              // })
            }

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
          this.tasks.status = s1;
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

  refresh() {
    this.viewSubTask$ = this.service.getSubTaskByParentId();
  }
  editTask(data: any) {
    this.task1 = data;
    let update = this.dialog.open(CustomFieldComponent, { data: data });
    update.afterClosed().subscribe(res => {
      // if (res == 'done') {
      //   this.viewSubTask$ = this.service.getSubTask();
      // }
    })
  }
  crateSubtasks(id: any, taskId: any, projectId: any) {
    let obj: any = {};
    obj.id = id;
    obj.taskId = taskId;
    obj.projectId = projectId;
    obj.type = 'create';

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = obj;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let data = this.dialog.open(CreateParentSubTaskComponent, dialogConfig);
    data.afterClosed().subscribe(data => {
      if (data) {
        this.todo = [],
          this.inprogress = [],
          this.done = []
        this.getSubTaskById();
        // this.todo.push(data);
      }
    })

  }





  getSubTask() {
    return this.viewSubTask$ = this.service.getSubTask().pipe(delay(200), map(res => {
      this.task1 = res;
      return res;
    }))
  }



  getSubTaskById() {
    this.subTaskByIdSubscription = this.service.getSubtaskByIdAssignee().subscribe(res => {
      // console.log(res.taskType.customFields);
      // this.fileFields=JSON.parse(res.taskType.customFields);
      // this.fileFields=this.fileFields.filter((field:any)=>(field.type=="file"));
      // console.log(this.fileFields,'formmmm');

      this.tasks = res.data[0];
      // this.deptName=res.taskType.department.name
      let subtask: any[] = [];
      subtask.push(res.data[0]);
      this.subTask = subtask;
      sessionStorage.setItem('rootId', res.data[0].taskId)
      this.taskId = res.data[0].taskId;
      this.subTask.forEach(element => {
        console.log(element, 'element');


        this.subTasks = element.subTasks;
        // this.taskId = element.task.id;
        element.subTasks.forEach((subtask: any) => {
          if (subtask.subtaskStatusId == 1) {
            this.todo.push(subtask);
          }
          if (subtask.subtaskStatusId == 2) {
            this.inprogress.push(subtask);
          }
          if (subtask.subtaskStatusId == 3) {
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

  onClick(data: any) {
    console.log(data, 'data');
    this.service.selectedDropTask = data;
    this.service.viewSubTaskDataById(this.service.selectedDropTask.id).subscribe(res => {
      const subTaskData = res.data[0];
      // this.service.selectedDropTask=data;
      // let task: any = {};
      // task.id = this.taskId;
      this.updatedData = data;
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
          this.getSubTaskById();
        }
      })
    });

  }



  onDrop(event: any, data: any) {
    console.log(data, 'data');

    // sessionStorage.setItem('assigneeId',data.assignee.id);
    sessionStorage.setItem('taskId', data.id);
    this.service.selectedDropTask = data;
    // let task: any = {};
    // task.id = this.taskId
    // this.updatedData = data
    this.updatedData.id = data.id
    // if (event.container.id == 'done' && event.previousContainer.id == 'inProgress') {
    //   // setTimeout(() => {
    //   this.service.viewSubTaskDataById(this.service.selectedDropTask.id).subscribe(res => {
    //     const subTaskData = res.data[0];
    //     this.service.selectedDropTask = subTaskData;
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     dialogConfig.width = '40%';
    //     this.dialog.open(RatingCalculationComponent, { data: subTaskData });
    //     // }, 300);
    //   });
    // }

  }

  initiateRating() {
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
            this.getSubTaskById();
          }
        })
        // this.dialog.open(RatingCalculationComponent, { data: subTaskData });
      }
    });
  }


  getSubTaskByParent() {
    this.subTaskByParentSubscription = this.service.getSubTaskByParentId().subscribe(res => {
      this.subTasks = res;

    })
  }




  editData(data: any) {
    let update = this.dialog.open(CreateParentSubTaskComponent, { data: data });
    update.afterClosed().subscribe(res => {
      if (res) {
        this.todo = [],
          this.inprogress = [],
          this.done = []
        this.getSubTaskById();

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

  selectStatus(id: number, status: number, statusName: string) {

    this.currentSubtaskStatus.id = id;
    this.currentSubtaskStatus.status = status;
    this.service.updateSubTaskStatus(this.currentSubtaskStatus).subscribe(res => {
      if (res.success) {
        this.tasks.statusName = statusName;
        this.notification.openSnackBar('Subtask status has been updated', 1);
      }
    });
  }
  // selectStatus(task: any, status: string, genericStatus: string) {

  //   let data = task
  //   data.customizedStatus = status
  //   let t: any = {}
  //   t.id = sessionStorage.getItem('rootId')
  //   data.task = t;
  //   let selectedTask: any = task;
  //   selectedTask.dependencies.filter((item: any) => {
  //     if (item.status !== 2) {
  //       this.notification.openSnackBar('Your Dependencies task is not completed', 2);
  //     } else if (item.status == 2) {
  //       if (genericStatus == 'Todo') {
  //         data.status = 0
  //         this.service.updateSubTask(data).subscribe(res => {
  //         })

  //       }
  //       if (genericStatus == 'InProgress') {
  //         data.status = 1
  //         this.service.updateSubTask(data).subscribe(res => {
  //         })

  //       }
  //       if (genericStatus === 'Done') {
  //         data.status = 2
  //         this.service.updateSubTask(data).subscribe(res => {
  //         })
  //       }
  //     }
  //   })

  //   if (selectedTask.dependencies.length == 0) {
  //     if (genericStatus == 'Todo') {
  //       data.status = 0
  //       this.service.updateSubTask(data).subscribe(res => {
  //       })

  //     }
  //     if (genericStatus == 'InProgress') {
  //       data.status = 1
  //       this.service.updateSubTask(data).subscribe(res => {
  //       })

  //     }
  //     if (genericStatus === 'Done') {
  //       data.status = 2
  //       this.service.updateSubTask(data).subscribe(res => {

  //       })
  //     }

  //   }


  // }

  selectedTasks(task: SubTask) {
    if (task.status == 0) {
      this.allowDelete = true;
    }
    this.currentTask = task;

  }

  taskHistory() {
    let task = this.currentTask;
    this.dialog.open(TaskHistoryComponent, { data: task, autoFocus: false });
  }

  isOverriding: boolean = false;
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


  // onStartStop(id: number, status: number) {
  //   let obj: any = {};
  //   obj.id = id;
  //   obj.status = status;
  //   this.service.updateSubTaskActiveStatus(obj).subscribe(res => {
  //     if (res.success == true) {
  //       this.tasks.activeStatus = status;
  //     }
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
        this.tasks.activeStatus = obj.status;
      }
    })
  }

  openBottomSheet() {
    console.log(this.task1);

    const bottomSheetRef = this.bottomSheet.open(TaskFilesComponent, {
      data: {
        id: this.task1.id,
        fileFields: this.fileFields,
        value: this.task1.taskFiles,
        typeField: JSON.parse(this.task1.typeFields)
      }
    });
    bottomSheetRef.afterDismissed().subscribe((fileData) => {
      this.task1.taskFiles = fileData;
      console.log(fileData, "File data");

    })
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
    this.subTaskByIdSubscription.unsubscribe();
  }
}
