import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { DocumentModule } from './document/document.module';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { AppRootModule } from '../app-root/app-root.module';
import { SearchComponent } from './dashboard-root/search/search.component';
// import { BreakTimerComponent } from '../shared/break-timer/break-timer.component';
import { HomeComponent } from './dashboard-root/home/home.component';
import { ChatComponent } from './dashboard-root/chat/chat.component';
import { ProjectComponent } from './project/project.component';
import { ProjectModule } from '../app-root/project/project.module';
import { AllProjectComponent } from '../app-root/project/all-project/all-project.component';
import { ProjectRootComponent } from '../app-root/project/project-root/project-root.component';
import { SearchViewComponent } from './search-view/search-view.component';
import { SharedModules } from '../shared.module';
import { EmpTaskDetailsComponent } from './dashboard-root/emp-task-details/emp-task-details.component';
import { EmpHistoryComponent } from './dashboard-root/emp-history/emp-history.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [DashboardRootComponent,
    SearchComponent, HomeComponent, ChatComponent, ProjectComponent, SearchViewComponent, EmpTaskDetailsComponent, EmpHistoryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, DocumentModule,
    LayoutModule, SharedModules, AppRootModule, ProjectModule
  ],
  exports: [SearchComponent],
  providers: [AllProjectComponent, ProjectRootComponent, DatePipe]
})
export class DashboardModule {

}
