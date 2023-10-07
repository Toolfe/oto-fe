import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTaskComponent } from './all-task/all-task.component';
import { AssignToMeComponent } from './assign-to-me/assign-to-me.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreatedByMeComponent } from './created-by-me/created-by-me.component';
import { MyRatingsComponent } from './my-ratings/my-ratings.component';
import { SavedTaskComponent } from './saved-task/saved-task.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import { ParentSubTaskComponent } from './subtask/parent-sub-task/parent-sub-task.component';
import { SubtaskComponent } from './subtask/subtask.component';
import { TaskRootComponent } from './task-root/task-root.component';
import { ViewSubTaskComponent } from './view-sub-task/view-sub-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { QuickaAccessComponent } from './quick-access/quick-access.component';
const routes: Routes = [
  {path:'', component:TaskRootComponent,
children:[
  {path:'create', component:CreateTaskComponent},
  {path:'', redirectTo:'assign-to-me', pathMatch:'full'},
  {path:'all-task', component:AllTaskComponent},
  {path:'view-task', component:ViewTaskComponent},
  {path:'view-sub-task', component:SubtaskComponent},
  {path:'view-parent-sub-task', component:ParentSubTaskComponent},
  {path:'view-sub-task',component:ViewSubTaskComponent},
  {path:'created-by-me', component:CreatedByMeComponent},
  {path:'quick-access', component:QuickaAccessComponent},
  {path:'shared-with-me', component:SharedWithMeComponent},
  {path:'assign-to-me', component:AssignToMeComponent},
  {path:'saved-task', component:SavedTaskComponent},
  {path:'completed-task', component:CompletedTaskComponent},
  {path:'rattings', component:MyRatingsComponent}

  
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
