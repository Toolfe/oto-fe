import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderNumberComponent } from './add-order-number/add-order-number.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { OrderNumberComponent } from './order-number/order-number.component';
import { ProjectRootComponent } from './project-root/project-root.component';

const routes:  Routes = [
  
    {path:'', redirectTo:'all-projects', pathMatch:'full'},
    {path:'all-projects', component:AllProjectComponent},
    {path:'order-number', component:OrderNumberComponent},
    {path:'add-order', component:AddOrderNumberComponent}
    


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
