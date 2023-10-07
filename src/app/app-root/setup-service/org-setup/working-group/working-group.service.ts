import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class WorkingGroupService {

workinggroup$=this.getWorkingGroup().pipe(
  map(workinggroup=>{return workinggroup.data})
);
  resWorkingGroup:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

  //post
postWorkingGroup(data:any):Observable<any>{
  
    return this.http.post<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em014', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }

getWorkingGroup(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em014',this.root.getHeadersnode());
}

  //delete
  deleteWorkingGroup(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em014/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }
}

