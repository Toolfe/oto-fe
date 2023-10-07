import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class ExpectationService {
  expectation$=this.getExpectation().pipe(map((expectation=> {return expectation.data})));


  resExpectation:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postExpectation(data:any):Observable<any>{
    return this.http.post<any>(this.root.getTaskUrl()+'taskexpectationapi/taskexpectation/', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getExpectation(...params:any):Observable<any>{
  
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:500000000;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getTaskUrl()+'expectation/',offset,limit,sort,order);
//   return this.http.get<any>(url,this.root.getHeaders());
// }

getExpectation(): Observable<any> {
  return this.http.get(this.root.getTaskUrl()+'taskexpectationapi/taskexpectation',this.root.getHeadersnode());
}

//put
updateExpectation(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  return this.http.post<any>(this.root.getTaskUrl()+'taskexpectationapi/taskexpectation/', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}


  //delete
  deleteExpectation(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getTaskUrl()+'taskexpectationapi/taskexpectation/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

