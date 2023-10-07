import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './login/reset/reset.component';
import { AuthGuard } from './services/auth/guard/auth-guard.guard';

const welcomeModule = () => import('./welcome/welcome.module').then(x => x.WelcomeModule);
const homeModule=() => import('./home/home.module').then(x => x.HomeModule);
const dashboardModule = () => import('./dashboard/dashboard.module').then(x => x.DashboardModule);
const approotModule =() => import ('./app-root/app-root-routing.module') .then (x=>x.AppRootRoutingModule);
const documentModule = () => import('./dashboard/document/document.module').then(x => x.DocumentModule);
const taskModule = () => import('./dashboard/task/task.module').then(x => x.TaskModule);
const helpModule = () => import('./help/help.module').then(x => x.HelpModule);

const routes: Routes = [
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path:'welcome', loadChildren:welcomeModule},
  {path:'login', component:LoginComponent},
  {path:'reset-password',component:ResetComponent},
  {path:'home', loadChildren:homeModule, canActivate:[AuthGuard]},
  {path:'setup', loadChildren:approotModule,canActivate:[AuthGuard]},
  {path:'dashboard',loadChildren:dashboardModule,canActivate:[AuthGuard]},
  {path:'document', loadChildren:documentModule,canActivate:[AuthGuard]},
  {path:'task', loadChildren:taskModule,canActivate:[AuthGuard]},
  {path:'help', loadChildren:helpModule,canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/login' }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
