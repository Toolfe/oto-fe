import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class EmpGroupService {

  employeeGroup$=this.http.get<any>(this.getEmpGroupURL(),this.root.getHeaders())
                 .pipe(map(empGroup=>{return empGroup.content}), catchError(this.root.errorHandl));

  empgroup$=this.getEmpGroup().pipe(
    map(empgroup=>{return empgroup.data})
);
  resEmpGroup:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

 //post
 postEmpGroup(data:any):Observable<any>{
    return this.http.post<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em003', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getEmpGroup(...params:any):Observable<any>{
  
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:500000000;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getOrgUrl()+'employee-group/',offset,limit,sort,order);
  
  
//   return this.http.get<any>(url,this.root.getHeaders());
// }
getEmpGroup(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em003',this.root.getHeadersnode());
}

//get
getEmpGroupURL(...params:any){
  
  let offset=params[0]?params[0]:1;
  let limit=params[1]?params[1]:50;
  let sort=params[2]?params[2]:'id';
  let order=params[3]?params[3]:2; //DESC
  let url=this.root.stringifyUrl(this.root.getOrgUrl()+'employee-group/',offset,limit,sort,order);
  return url;
}


  //delete
  deleteEmpGroup(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em003/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

