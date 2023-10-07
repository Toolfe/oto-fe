import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpRootComponent } from './emp-root/emp-root.component';



const routes: Routes = [
  {path:'', component:EmpRootComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
