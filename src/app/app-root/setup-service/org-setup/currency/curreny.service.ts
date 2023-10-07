import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class CurrenyService {
  currency$=this.getCurrency();
  resCurrency:any[]=[];
  allCurrencies$= this.getCurrencyList();
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

  headerOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*'
    })
  }
  
//get currencies list
getCurrencyList(){
  return this.http.get<any>(this.root.getAllCurrencyUrl(), this.headerOptions).pipe(
                     map((res: any) => {return res}),
                     catchError(err=>of('error')));

}

   //post
postCurrency(data:any):Observable<any>{
  
    return this.http.post<any>(this.root.getOrgUrl()+'currency/', JSON.stringify(data),this.root.getHeaders())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
getCurrency(...params:any):Observable<any>{
  
  let offset=params[0]?params[0]:1;
  let limit=params[1]?params[1]:5000;
  let sort=params[2]?params[2]:'id';
  let order=params[3]?params[3]:2;//DESC 
  let url=this.root.stringifyUrl(this.root.getOrgUrl()+'currency/',offset,limit,sort,order);
  
  
  return this.http.get<any>(url,this.root.getHeaders());
}



//put
updateCurrency(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  


  return this.http.put<any>(this.root.getOrgUrl()+'currency/', JSON.stringify(data),this.root.getHeaders())
    .pipe(map((res: any) => {
      return res;
    }));
}


  //delete
  deleteCurrency(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'currency/'+data.currencyCode,this.root.getHeaders())
      .pipe(map((res: any) => {
        
        return res;
      }));
  }

}