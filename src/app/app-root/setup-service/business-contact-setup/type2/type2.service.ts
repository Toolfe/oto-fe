import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class Type2Service {
  type2$=this.getType2().pipe(
    map(type2=>{
      return type2.data})
  );
  constructor(
    private http:HttpClient,
    private root:SetupRootService
  ) { }


    //post
postType2(data:any):Observable<any>{
 
  return this.http.post<any>(this.root.getContactUrl()+'businesspartnersubcategoryapi/masters/cm005', JSON.stringify(data),this.root.getHeadersnode())
     .pipe(
      catchError(this.root.errorHandl),
       map((res: any) => {
      return res;   
    }));
}


//get
// getType2(...params:any):Observable<any>{
// let offset=params[0]?params[0]:0;
// let limit=params[1]?params[1]:500000000;
// let sort=params[2]?params[2]:'id';
// let order=params[3]?params[3]:2;//DESC
// let url=this.root.stringifyUrl(this.root.getContactUrl()+'type2/',offset,limit,sort,order);
// return this.http.get<any>(url,this.root.getHeaders());
// }

getType2(): Observable<any> {
  return this.http.get(this.root.getContactUrl()+'businesspartnersubcategoryapi/masters/cm005',this.root.getHeadersnode());
}

//put
updateType2(data:any):Observable<any>{
data.setup={ id: sessionStorage.getItem('orgId') }; 

return this.http.post<any>(this.root.getContactUrl()+'businesspartnersubcategoryapi/masters/cm005', JSON.stringify(data),this.root.getHeadersnode())
  .pipe(map((res: any) => {
    return res;
  }));
}


//delete
deleteType2(data:any):Observable<any>{
  return this.http.delete<any>(this.root.getContactUrl()+'businesspartnersubcategoryapi/masters/cm005/'+data.id,this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}
}
