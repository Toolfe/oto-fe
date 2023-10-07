import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { TaskService } from '../service/task-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, delay, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommentsComponent } from '../comments/comments.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { QuickaAccessCreationComponent } from '../quick-access-creation/quick-access-creation.component'
@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class QuickaAccessComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['taskName', 'initiator', 'status'];
  dataSource!: MatTableDataSource<any>;
  items: any = [];

  assignToMe: boolean = false;
  assignByMe: boolean = false;
  completed: boolean = false;



  constructor(
    private service: TaskService,
    private router: Router,
    private notification: NotifierService,
    private dialog: MatDialog


  ) {
    this.dataSource = new MatTableDataSource();
    this.tableSelection('assignToMe')
  }

  sortData(data: any) {
    data.sort = this.sort;
  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.items);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('taskManagementModule', 'allTask', permision);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      if (res.success === true) {
        window.location.reload();
        // this.getQuickAccessAssignMe();
      }
    })
  }


  onStatusChange(obj: any, status: number) {
    if (obj.subtaskStatusId == 1 && status == 3) {
      this.notification.openSnackBar("You can't directly move a subtask from Todo into Done!", 2)
    } else if (obj.subtaskStatusId == 3 && status == 1) {
      this.notification.openSnackBar("You can't directly move a subtask from Done into Todo!", 2)
    } else {
      const currentSubtaskStatus: any = {}
      currentSubtaskStatus.id = obj.id;
      currentSubtaskStatus.status = status;
      this.service.updateSubTaskStatus(currentSubtaskStatus).subscribe(res => {
        if (res.success) {
          this.notification.openSnackBar('Subtask status has been updated', 1);
          this.getQuickAccessAssignMe();
        }
      });
    }
  }

  createTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let task = this.dialog.open(QuickaAccessCreationComponent, dialogConfig);
    task.afterClosed().subscribe((result: any) => {
      if (result == 'done') {

        this.getQuickAccessAssignMe();
      }
    })
  }

  tableSelection(data: string) {
    if (data === 'assignToMe') {
      this.assignToMe = true;
      this.assignByMe = false;
      this.completed = false;
      this.getQuickAccessAssignMe();
    } else if (data === 'assignByMe') {
      this.assignToMe = false;
      this.assignByMe = true;
      this.completed = false;
      this.getQuickAccessAssignBy();
    } else if (data === 'completed') {
      this.assignToMe = false;
      this.assignByMe = false;
      this.completed = true;
      this.getQuickAccessCompleted();
    }
  }

  getQuickAccessAssignMe() {
    this.service.getQuickAccessAssignMe().subscribe(res => {
      this.items = res;
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getQuickAccessAssignBy() {
    this.service.getQuickAccessAssignBy().subscribe(res => {
      this.items = res;
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getQuickAccessCompleted() {
    this.service.getQuickAccessCompleted().subscribe(res => {
      this.items = res;
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectedTask(task: any) {

      this.dialog.open(QuickaAccessCreationComponent, { data: task });
    
  }
}
