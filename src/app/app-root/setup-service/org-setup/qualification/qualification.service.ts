import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  qualification$ = this.getQualification().pipe(
    map(qualification => { return qualification.data })
  );
// qualification$=this.getQualification();
  resQualification:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postQualification(data:any):Observable<any>{
  
    return this.http.post<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em008', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }



getQualification(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em008',this.root.getHeadersnode());
}


  //delete
  deleteQualification(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em008/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

