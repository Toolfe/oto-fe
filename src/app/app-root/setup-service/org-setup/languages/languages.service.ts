import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  language$=this.getLanguage().pipe(
    map(language=>{return language.data})
  );
  resLanguage:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postLanguage(data:any):Observable<any>{
  
    return this.http.post<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em006', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


getLanguage(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em006',this.root.getHeadersnode());
}



  //delete
  deleteLanguage(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'employeesetupapi/employeemasters/em006/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }




}

