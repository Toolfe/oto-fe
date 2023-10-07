import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile$=this.getProfile().pipe(
    map((profile=> {return profile.data})));

  constructor(private http:HttpClient,
    private root:SetupRootService) { }


    
  //post
postProfile(data:any):Observable<any>{
  
  
  return this.http.post<any>(this.root.getRoleUrl()+'profileapi/profile', JSON.stringify(data),this.root.getHeadersnode())
     .pipe(
      catchError(this.root.errorHandl),
       map((res: any) => {
      return res;   
    }));
}


getProfile(): Observable<any> {
  return this.http.get(this.root.getRoleUrl()+'profileapi/profile',this.root.getHeadersnode());
}

//delete
deleteProfile(data:any):Observable<any>{
  return this.http.delete<any>(this.root.getRoleUrl()+'profileapi/profile/'+data.id,this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}
}


  