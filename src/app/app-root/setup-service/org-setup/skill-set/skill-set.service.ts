import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class SkillSetService {

skillset$=this.getSkillSet().pipe(
  map(skillset=>{return skillset.data})
);
  resSkillSet:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

  //post
postSkillSet(data:any):Observable<any>{

    return this.http.post<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em010', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }

getSkillSet(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em010',this.root.getHeadersnode());
}


  //delete
  deleteSkillSet(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em010/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

