import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../service/task-service.service';
import { SubTask } from '../sub-task.model';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss']
})
export class TaskHistoryComponent {

  constructor(private service: TaskService,
    @Inject(MAT_DIALOG_DATA) public task: any,

  ) {

    console.log(task, "popup");

  }

  taskHistory$ = this.service.getTaskHistory(this.task.id);

  getStatusClass(method: string) {
    let cssClass: string;
    if (method == "create") {
      cssClass = "create"
    }
    else {
      cssClass = "update"
    }
    return cssClass;
  }

  getCurrentStatus(num: number): string {
    let status: string;
    if (num == 1) {
      status = "Todo";
    } else if (num == 2) {
      status = "In-progress"
    } else {
      status = "Done"
    }
    return status;
  }

  getModifiedTime(time: string) {
    const timeZoneOffset = new Date().getTimezoneOffset();
  }
}
