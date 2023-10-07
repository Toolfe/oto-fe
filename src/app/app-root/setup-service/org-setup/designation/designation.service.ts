import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})



export class DesignationService {

  designation$=this.getDesignation().pipe(

    map(designation=> {return designation.data})
    
  );
  resDesignation:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postDesignation(data:any):Observable<any>{
  
    return this.http.post<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em002', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


getDesignation(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em002',this.root.getHeadersnode());
}



  //delete
  deleteDesignation(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em002/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

