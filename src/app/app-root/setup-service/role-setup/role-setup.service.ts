import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleSetupService {
defineData:any[]=[];
rolesData:any[]=[];
profileData:any[]=[];
roleEmpData:any[]=[];
  constructor(private http:HttpClient,
    private common:AuthService) { }

    setupUrl='http://localhost :2036/role/setup';

    httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    }
  
   roleSetup(data:any){
     var requestData=JSON.stringify(data);   
    return this.http.post<any>(this.setupUrl, requestData, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.common.errorHandl),
     );
  } 
  
  headerOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*'
    })
  }


}
