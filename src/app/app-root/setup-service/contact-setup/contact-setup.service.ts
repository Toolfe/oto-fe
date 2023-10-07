import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { HeaderErrorService } from '../header-error/header-error.service';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root',
})
export class ContactSetupService {

  constructor(private http: HttpClient, private root: SetupRootService) {}

  //Get form fields
  getFields(): Observable<any> {
    return this.http
      .get<any>(this.root.getContactUrl() + 'controls/1300', this.root.getHeaders())
      .pipe(shareReplay());
  }

  //Post contact
  postContacts() {
    let ContactData={
      id:sessionStorage.getItem('orgId'),
     createdBy:sessionStorage.getItem('id'),
     modifiedBy:sessionStorage.getItem('id'),
     active:true
    } 
    return this.http
      .post<any>( this.root.getContactUrl() + 'setup/',JSON.stringify(ContactData),this.root.getHeaders())
      .pipe(catchError(this.root.errorHandl));
  }




}
