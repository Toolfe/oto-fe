import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignEscalateRootComponent } from './assign-escalate-root/assign-escalate-root.component';
import { AssignComponent } from './assign/assign.component';

const routes: Routes = [
  {path:'', component:AssignEscalateRootComponent,
  children:[{path:'',component:AssignComponent}]
    },
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignEscalateRoutingModule { }
