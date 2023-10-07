import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderErrorService {
  errorMessage!: string;

  constructor() { }

  //org url
  orgURL:string='';
  contactURl:string='http://localhost :2045/contact/api/v1/';
    //http header
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    }


    
   // Error handlinge
   errorHandl(error:any) {
    if(error.error != null || error.error !=undefined) {
      // Get client-side error
      this.errorMessage = error.error.message;
    } else {
      // Get server-side error
     this.errorMessage = `Something went wrong`;
    } 
   
    
    sessionStorage.setItem('errorMessage', this.errorMessage);
    return throwError(this.errorMessage);
 }
}
