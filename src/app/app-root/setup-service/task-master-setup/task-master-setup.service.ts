import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { URLService } from 'src/app/shared/Url/url';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class TaskMasterSetupService {

  constructor(private http:HttpClient,
              private common:AuthService,
              private root:SetupRootService
              ) { }


  

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  }

  taskMasterSetup(){
    let task={
      orgId:sessionStorage.getItem('orgId'),
      createdBy:sessionStorage.getItem('id'),
      modifiedBy:sessionStorage.getItem('id'),
      active:true
    }
    let requestData=JSON.stringify(task);   
   return this.http.post<any>(this.root.getTaskUrl()+'master/',requestData, this.root.getHeaders())
     .pipe(
       //retry(1),
       catchError(this.common.errorHandl),
    );
 } 


}

