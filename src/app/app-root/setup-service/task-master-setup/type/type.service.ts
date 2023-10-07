import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  getCategory() {
    throw new Error('Method not implemented.');
  }
  type$=this.getType().pipe(
    map((type: any) =>{
      return type.data;
    }));;
    
    
    resType:any[]=[];

  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postType(data:any):Observable<any>{
    return this.http.post<any>(this.root.getTaskUrl()+'tasktypeapi/tasktype', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getType(...params:any):Observable<any>{
  
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:500000000;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getTaskUrl()+'type/',offset,limit,sort,order);
//   return this.http.get<any>(url,this.root.getHeaders());
// }

getType(): Observable<any> {
  return this.http.get(this.root.getTaskUrl()+'tasktypeapi/tasktype',this.root.getHeadersnode());
}


//put
updateType(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  return this.http.post<any>(this.root.getTaskUrl()+'tasktypeapi/tasktype', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}


  //delete
  deleteType(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getTaskUrl()+'tasktypeapi/tasktype/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }
}

