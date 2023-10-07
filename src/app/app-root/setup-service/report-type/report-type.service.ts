import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class ReportTypeService {

  report$=this.getReportTemplate().pipe(
    map((report=> {return report.content})));
  
  
    constructor(
      private http:HttpClient,
      private root:SetupRootService,
    ) { }
  
     //post
  postReportTemplate(data:any):Observable<any>{
      return this.http.post<any>(this.root.getReportUrl()+'reports/', JSON.stringify(data),this.root.getHeaders())
         .pipe(
          catchError(this.root.errorHandl),
           map((res: any) => {
          return res;   
        }));
    }
  
  
  //get
  getReportTemplate(...params:any):Observable<any>{
    
    let offset=params[0]?params[0]:1;
    let limit=params[1]?params[1]:500000000;
    let sort=params[2]?params[2]:'id';
    let order=params[3]?params[3]:2;//DESC
    let url=this.root.stringifyUrl(this.root.getReportUrl()+'reports/',offset,limit,sort,order);
    return this.http.get<any>(url,this.root.getHeaders());
  }

  getReportDownload(data:any):Observable<any>{
    console.log(data,'idService');
    return this.http.get<any>(this.root.getReportUrl()+'reports/download/'+data,this.root.getHeaders())
    .pipe(map((res: any) => {
      return res;
    }));
  }
  
  
  
  //put
  updateReportTemplate(data:any):Observable<any>{
    data.setup={ id: sessionStorage.getItem('orgId') };  
    return this.http.put<any>(this.root.getReportUrl()+'reports/', JSON.stringify(data),this.root.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }
  
  
    //delete
    deleteReportTemplate(data:any):Observable<any>{
      return this.http.delete<any>(this.root.getReportUrl()+'reports/'+data.id,this.root.getHeaders())
        .pipe(map((res: any) => {
          return res;
        }));
    }
  
  
  }
  
  
  
  