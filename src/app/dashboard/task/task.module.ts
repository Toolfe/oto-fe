import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskRootComponent } from './task-root/task-root.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { SearchTaskComponent } from './search-task/search-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { SubtaskComponent } from './subtask/subtask.component';
import { CreateSubtaskComponent } from './subtask/create-subtask/create-subtask.component';
import { AllTaskComponent } from './all-task/all-task.component';
import { SharedModules } from 'src/app/shared.module';
import { CreatedByMeComponent } from './created-by-me/created-by-me.component';
import { QuickaAccessComponent } from './quick-access/quick-access.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import { SavedTaskComponent } from './saved-task/saved-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { MyRatingsComponent } from './my-ratings/my-ratings.component';
import { ViewSubTaskComponent } from './view-sub-task/view-sub-task.component';
import { ParentSubTaskComponent } from './subtask/parent-sub-task/parent-sub-task.component';
import { CreateParentSubTaskComponent } from './subtask/create-parent-sub-task/create-parent-sub-task.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RatingCalculationComponent } from './rating-calculation/rating-calculation.component';
import { FiltersComponent } from './filters/filters.component';
import { AssignToMeComponent } from './assign-to-me/assign-to-me.component';
import { CustomFieldComponent } from './custom-field/custom-field.component';
import { CommentsComponent } from './comments/comments.component';
import { QuickaAccessCreationComponent } from './quick-access-creation/quick-access-creation.component'
import { TaskHistoryComponent } from './subtask/task-history/task-history.component';
import { TaskFilesComponent } from './subtask/task-files/task-files.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SubTaskAttachmentComponent } from './subtask-attachments/subtask-attachments.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TaskRootComponent,
    CreateTaskComponent,
    SearchTaskComponent,
    ViewTaskComponent,
    SubtaskComponent, SubTaskAttachmentComponent,QuickaAccessCreationComponent,
    CreateSubtaskComponent, AllTaskComponent, CreatedByMeComponent, QuickaAccessComponent, SharedWithMeComponent, SavedTaskComponent, CompletedTaskComponent, MyRatingsComponent, ViewSubTaskComponent, ParentSubTaskComponent, CreateParentSubTaskComponent, RatingCalculationComponent, FiltersComponent, AssignToMeComponent, CustomFieldComponent, CommentsComponent, TaskHistoryComponent, TaskFilesComponent
  ],
  providers: [DatePipe],

  imports: [
    SharedModules,
    CommonModule,
    TaskRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    FlexLayoutModule ,
    MatCardModule
  ]


})
export class TaskModule { }
