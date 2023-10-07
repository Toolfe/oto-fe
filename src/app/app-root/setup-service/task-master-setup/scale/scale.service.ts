import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {
  designation$=this.getScale().pipe(
    map(scale=> {return scale.content})
  );

  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postScale(data:any):Observable<any>{
    return this.http.post<any>(this.root.getTaskUrl()+'scale/', JSON.stringify(data),this.root.getHeaders())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
getScale(...params:any):Observable<any>{
  
  let offset=params[0]?params[0]:1;
  let limit=params[1]?params[1]:50;
  let sort=params[2]?params[2]:'id';
  let order=params[3]?params[3]:2;//DESC
  let url=this.root.stringifyUrl(this.root.getTaskUrl()+'scale/',offset,limit,sort,order);
  return this.http.get<any>(url,this.root.getHeaders());
}




//put
updateScale(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  return this.http.put<any>(this.root.getTaskUrl()+'scale/', JSON.stringify(data),this.root.getHeaders())
    .pipe(map((res: any) => {
      return res;
    }));
}

  //delete
  deleteScale(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getTaskUrl()+'scale/'+data.id,this.root.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }

}