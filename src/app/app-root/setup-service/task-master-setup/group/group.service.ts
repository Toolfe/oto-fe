import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  [x: string]: any;
  
  group$=this.getGroup().pipe(
    map((group=> {return group.data})));

  resGroup:any[]=[];

  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postGroup(data:any):Observable<any>{
    return this.http.post<any>(this.root.getTaskUrl()+'taskgroupapi/taskgroup', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


  //get
// getGroup(...params:any):Observable<any>{
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:500000000;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getTaskUrl()+'group/',offset,limit,sort,order);
//   return this.http.get<any>(url,this.root.getHeaders());
   
// }

getGroup(): Observable<any> {
  return this.http.get(this.root.getTaskUrl()+'taskgroupapi/taskgroup', this.root.getHeadersnode());
}

//put
updateGroup(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  return this.http.post<any>(this.root.getTaskUrl()+'taskgroupapi/taskgroup', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}


  //delete
  deleteGroup(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getTaskUrl()+'taskgroupapi/taskgroup/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

