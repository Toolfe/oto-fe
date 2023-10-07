import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlRootService {
      //http header
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    }),
  }

        //http header
  fileHeader = {
    headers: new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem('token')
    }),
        }
  
    public getFileURL(): string {
        return 'http://localhost :2350/';
    }
}
