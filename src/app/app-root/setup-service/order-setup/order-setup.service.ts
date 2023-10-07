import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class OrderSetupService {

  order$=this.getOrder().pipe(
    map((order=> {return order.data})));
  
  
    constructor(
      private http:HttpClient,
      private root:SetupRootService,
    ) { }
  
     //post
  postOrder(data:any):Observable<any>{
      return this.http.post<any>(this.root.getProjectOrderUrl()+'ordernoapi/orderno', JSON.stringify(data),this.root.getHeadersnode())
         .pipe(
          catchError(this.root.errorHandl),
           map((res: any) => {
          return res;   
        }));
    }
  
  
  //get
  // getOrder(...params:any):Observable<any>{
    
  //   let offset=params[0]?params[0]:1;
  //   let limit=params[1]?params[1]:500000000;
  //   let sort=params[2]?params[2]:'id';
  //   let order=params[3]?params[3]:2;//DESC
  //   let url=this.root.stringifyUrl(this.root.getProjectOrderUrl()+'orderno/',offset,limit,sort,order);
  //   return this.http.get<any>(url,this.root.getHeadersnode());
  // }
  getOrder(): Observable<any> {
    return this.http.get(this.root.getProjectOrderUrl()+'ordernoapi/orderno',this.root.getHeadersnode());
  
}
  
  
  //put
  updateOrder(data:any):Observable<any>{
    data.setup={ id: sessionStorage.getItem('orgId') };  
    return this.http.post<any>(this.root.getProjectOrderUrl()+'ordernoapi/orderno', JSON.stringify(data),this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }
  
  
    //delete
    deleteOrder(data:any):Observable<any>{
      return this.http.delete<any>(this.root.getProjectOrderUrl()+'ordernoapi/orderno/'+data.id,this.root.getHeadersnode())
        .pipe(map((res: any) => {
          return res;
        }));
    }
  
  
  }
  
  
  
  