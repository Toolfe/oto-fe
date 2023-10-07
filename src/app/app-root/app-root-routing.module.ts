import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRootComponent } from './app-root/app-root.component';
import { ViewBusinessPartnersComponent } from './business-partners/contacts/view-business-partners/view-business-partners.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
//const appsetupModule = () => import('./app-setup/app-setup.module').then(x => x.AppSetupModule);
const orgsetupModule =() => import ('./org-setup/org-setup.module') .then (x=>x.OrgSetupModule);
const employeeModule =() => import ('./employee/employee.module') .then (x=>x.EmployeeModule);
const contactpModule =() => import ('./contact/contact.module') .then (x=>x.ContactModule);

const BusinessContactModule =() => import ('./business-partners-setup/business-contact.module') .then (x=>x.BusinessContactModule);

const projectModule =() => import ('./project/project.module') .then (x=>x.ProjectModule);
const reporttypeModule=()=> import ('./report-type/report-type.module').then(x=>x.ReportTypeModule)
const businesspartnersModule =() => import ('./business-partners/business-partners.module') .then (x=>x.BusinessPartnersModule);
const rolesprofilesModule =() => import ('./roles-profiles/roles-profiles.module') .then (x=>x.RolesProfilesModule);
const assignescalateModule =() => import ('./assign-escalate/assign-escalate.module') .then (x=>x.AssignEscalateModule);
const TaskMasterSetupModule=()=>import('./task-master-setup/task-master-setup.module').then(x=>x.TaskMasterSetupModule)
const DocMasterSetupModule=()=>import('./../app-root/doc-master-setup/doc-master-setup.module').then(x=>x.DocMasterSetupModule)
const DocRecordingModule=()=>import('./../app-root/doc-recording/doc-recording.module').then(x=>x.DocRecordingModule)


const routes: Routes = [
  {path:'', component:AppRootComponent,
children:[
  {path:'', redirectTo:'orgsetup', pathMatch:'full'},
  //{path:'appsetup', loadChildren:appsetupModule},
  {path:'orgsetup', loadChildren:orgsetupModule},
  {path:'empsetup', loadChildren:employeeModule},
  {path:'contact-setup', loadChildren:contactpModule},

  {path:'business-master', loadChildren:BusinessContactModule},

  {path:'project', loadChildren:projectModule},
  {path:'report-type', loadChildren:reporttypeModule},
  {path:'create-project', component:AddProjectComponent},
  {path:'businessPartners', loadChildren:businesspartnersModule},
  {path:'roles-profile', loadChildren:rolesprofilesModule},
  {path:'assign-escalate', loadChildren:assignescalateModule},
  {path:'task-master', loadChildren:TaskMasterSetupModule},
  {path:'doc-master', loadChildren:DocMasterSetupModule},
  {path:'doc-recording', loadChildren:DocRecordingModule}
  
]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRootRoutingModule { }
