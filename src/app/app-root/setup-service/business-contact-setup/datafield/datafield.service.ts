import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class DatafieldService {

  constructor(
    private http:HttpClient,
    private root:SetupRootService
  ) { }

   //post
postDataField(data:any):Observable<any>{
  
  
  return this.http.post<any>(this.root.getContactUrl()+'datafield/', JSON.stringify(data),this.root.getHeaders())
     .pipe(
      catchError(this.root.errorHandl),
       map((res: any) => {
      return res;   
    }));
}


//get
getDataField(...params:any):Observable<any>{
let offset=params[0]?params[0]:0;
let limit=params[1]?params[1]:500000000;
let sort=params[2]?params[2]:'id';
let order=params[3]?params[3]:2;//DESC
let url=this.root.stringifyUrl(this.root.getContactUrl()+'datafield/',offset,limit,sort,order);
return this.http.get<any>(url,this.root.getHeaders())
  .pipe(map((res: any) => {
  
    return res;  
  }));
}



//put
updateDataField(data:any):Observable<any>{
data.setup={ id: sessionStorage.getItem('orgId') }; 


return this.http.put<any>(this.root.getContactUrl()+'datafield/', JSON.stringify(data),this.root.getHeaders())
  .pipe(map((res: any) => {
    return res;
  }));
}


//delete
deleteDataField(data:any):Observable<any>{
  return this.http.delete<any>(this.root.getContactUrl()+'datafield/'+data.id,this.root.getHeaders())
    .pipe(map((res: any) => {
      return res;
    }));
}

}
