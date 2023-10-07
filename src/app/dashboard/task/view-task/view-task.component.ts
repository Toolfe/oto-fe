import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ChatComponent } from '../../dashboard-root/chat/chat.component';
import { TaskService } from '../service/task-service.service';
import { CreateSubtaskComponent } from '../subtask/create-subtask/create-subtask.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],

})
export class ViewTaskComponent  {
}