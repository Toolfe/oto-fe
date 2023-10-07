import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })
  
export class URLService {

public static getFileURL(): string {
    return environment.DMS_URL;
}

public static headerOptions() {
  return{
    headers: new HttpHeaders({
      'x-access-token':'Bearer '+sessionStorage.getItem('token'),
      'Content-Type': 'application/json'}),
    //responseType: '*' as 'json'
  }
}

public static getHeadersnode(){
  let httpOptions = {
   headers: new HttpHeaders({
     'x-access-token': 'Bearer '+ sessionStorage.getItem('token'),
     'Content-Type': 'application/json',
   }),
 }
 return httpOptions;
}

public static deleteHeader() {
  return{
    headers: new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'json'
  }
}

public static uploadHeader() {
  return{
      headers: new HttpHeaders({
        'x-access-token':'Bearer '+sessionStorage.getItem('token'),
      })
      
  }
}

public static downloadHeader() {
  return {
    headers: new HttpHeaders({
      'x-access-token':'Bearer '+sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    }),
    responseType: 'blob' as 'json'
  }
}


}
