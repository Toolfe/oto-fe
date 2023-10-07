import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  assign$=this.getAssign();
resAssign:any[]=[];
  constructor(
    private http:HttpClient,
    private root:SetupRootService
  ) { }
  //post
postAssign(data:any):Observable<any>{
    return this.http.post<any>(this.root.getAssignUrl()+'assignment/', JSON.stringify(data),this.root.getHeaders())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
getAssign(...params:any):Observable<any>{
  
  let offset=params[0]?params[0]:1;
  let limit=params[1]?params[1]:500000000;
  let sort=params[2]?params[2]:'id';
  let order=params[3]?params[3]:2;//DESC
  let url=this.root.stringifyUrl(this.root.getAssignUrl()+'assignment/',offset,limit,sort,order);

  
  return this.http.get<any>(url,this.root.getHeaders()).pipe(shareReplay());
}



//put
updateAssign(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  

  return this.http.put<any>(this.root.getAssignUrl()+'assignment/', JSON.stringify(data),this.root.getHeaders())
    .pipe(map((res: any) => {
      return res;
    }));
}


  //delete
  delete(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getAssignUrl()+'assignment/'+data.id,this.root.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}
