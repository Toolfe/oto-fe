import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class SubDeptService {

  subDept$=this.getSubDepartment().pipe(
    map(subDept=> {return subDept.data})
  );
  resSubDept:any;
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

  //post
postSubDepartment(data:any):Observable<any>{
  
    return this.http.post<any>(this.root.getOrgUrl()+'subdepartmentapi/subdepartment', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


getSubDepartment(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'subdepartmentapi/subdepartment',this.root.getHeadersnode());
}




  //delete
  deleteSubDepartment(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'subdepartmentapi/subdepartment/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

