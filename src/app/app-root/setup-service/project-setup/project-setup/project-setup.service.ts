import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectSetupService {

  projectData:any[]=[]

  responseData:any[]=[];
  
  
    constructor( private http:HttpClient,
      private common:AuthService,
      private root:SetupRootService) { }



  projectSetup():Observable<any>{
    let myData:any={};
    myData.orgId= sessionStorage.getItem('orgId');
    myData.createdBy=sessionStorage.getItem('id');
    myData.modifiedBy=sessionStorage.getItem('id');
    myData.active= true;
    return this.http.post<any>(this.root.getProjectUrl()+'setup/', JSON.stringify(myData),this.root.getHeaders())
      .pipe(catchError(this.root.errorHandl));
  }
  
  
}
