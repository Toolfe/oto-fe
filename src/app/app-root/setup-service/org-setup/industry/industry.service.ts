import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  industry$=this.getIndustry().pipe(map(industry=> {return industry.data}));
  resIndustry:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postIndustry(data:any):Observable<any>{
 return this.http.post<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em004', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getIndustry(...params:any):Observable<any>{
  
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:500000000;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getOrgUrl()+'industry/',offset,limit,sort,order);
  
  
//   return this.http.get<any>(url,this.root.getHeaders());
// }

getIndustry(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em004',this.root.getHeadersnode());
}



  //delete
  deleteIndustry(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em004/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

