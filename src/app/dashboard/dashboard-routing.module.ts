import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './dashboard-root/chat/chat.component';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { EmpHistoryComponent } from './dashboard-root/emp-history/emp-history.component';
import { HomeComponent } from './dashboard-root/home/home.component';
import { ProjectComponent } from './project/project.component';
import { SearchViewComponent } from './search-view/search-view.component';

const routes: Routes = [
  
  {path:'', component:DashboardRootComponent,
children:[
  {path:'', component:HomeComponent},
  {path:'search-view', component:SearchViewComponent}, 
  {path:'projects', component:ProjectComponent},
  {path:'chat', component:ChatComponent},
  {path:'emp-history', component:EmpHistoryComponent},
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
