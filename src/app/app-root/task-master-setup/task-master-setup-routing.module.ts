import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskMasterRootComponent } from './task-master-root/task-master-root.component';

const routes: Routes = [
  {path:'', component:TaskMasterRootComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskMasterSetupRoutingModule { }
