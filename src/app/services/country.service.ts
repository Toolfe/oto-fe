import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countries } from 'src/app/models/country';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  country$:Observable<Countries[]> | undefined
  cities$:Observable<Countries[]> | undefined

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': '*'
    })
  }
  countryList$: Observable<Countries[]> | undefined;

  constructor( private http:HttpClient) { }

  countryList(){
    const url="https://countriesnow.space/api/v0.1/countries";
    const data$ = this.http.get<any>(url,this.httpOptions);
    return data$;

  }
}
