import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class ContactFunctionalityService {
  functionality$=this.getFunctionality().pipe(
    map(functionality=>{
      return functionality.data})
  );
  constructor(
    private http:HttpClient,
    private root:SetupRootService
  ) { }

 //post
postFunctionality(data:any):Observable<any>{
  return this.http.post<any>(this.root.getContactUrl()+'contactcategoryapi/masters/cm007', JSON.stringify(data),this.root.getHeadersnode())
     .pipe(
      catchError(this.root.errorHandl),
       map((res: any) => {
      return res;   
    }));
}


//get
// getFunctionality(...params:any):Observable<any>{
// let offset=params[0]?params[0]:0;
// let limit=params[1]?params[1]:500000000;
// let sort=params[2]?params[2]:'id';
// let order=params[3]?params[3]:2;//DESC
// let url=this.root.stringifyUrl(this.root.getContactUrl()+'functionality/',offset,limit,sort,order);
// return this.http.get<any>(url,this.root.getHeaders());

// }

getFunctionality(): Observable<any> {
  return this.http.get(this.root.getContactUrl()+'contactcategoryapi/masters/cm007',this.root.getHeadersnode());
}
//put
updateFunctionality(data:any):Observable<any>{
data.setup={ id: sessionStorage.getItem('orgId') }; 


return this.http.post<any>(this.root.getContactUrl()+'contactcategoryapi/masters/cm007', JSON.stringify(data),this.root.getHeadersnode())
  .pipe(map((res: any) => {
    return res;
  }));
}


//delete
deleteFunctionality(data:any):Observable<any>{
  return this.http.delete<any>(this.root.getContactUrl()+'contactcategoryapi/masters/cm007/'+data.id,this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}
}
