import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {
 
  url:string='http://localhost:8096/json/table/getJson';
  countryList:any;
  phoneNumber!:string;
  headerOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*'
    })
  }

  constructor(  private http:HttpClient,) { }

  getCountry():Observable<any>{
    return this.http.get<any>(this.url+'/otm-json-country-code/',this.headerOptions).pipe(shareReplay());
  }

  getCountryCurrency():Observable<any>{
    return this.http.get<any>(this.url+'/otm-json-currency/',this.headerOptions).pipe(shareReplay());
  }

  getControlSet():Observable<any>{
    return this.http.get<any>(this.url+'/otm-control-set',this.headerOptions).pipe(shareReplay());
  }



  getFormFields(){
    return this.http.get<any>(this.url,this.headerOptions)
    .pipe(shareReplay());
  }
}
