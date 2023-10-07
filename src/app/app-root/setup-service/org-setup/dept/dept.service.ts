import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class DeptService {
  resDept:any[]=[];

  department$=this.getDepartment().pipe(
    map((dept=> {return dept.data})));
    

  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postDepartment(data:any):Observable<any>{

    return this.http.post<any>(this.root.getOrgUrl()+'departmentapi/department', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getDepartment(...params:any):Observable<any>{
  
 
//   let id=params[0]?params[0]:0;
//   let offset=params[1]?params[1]:1;
//   let limit=params[2]?params[2]:500000000;
//   let sort=params[3]?params[3]:'id';
//   let order=params[4]?params[4]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getOrgUrl()+'department/'+id+'/',offset,limit,sort,order);
  

  
//   return this.http.get<any>(url,this.root.getHeaders())
// }


getDepartment(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'departmentapi/department',this.root.getHeadersnode());
}

  //delete
  deleteDepartment(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'departmentapi/department/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

