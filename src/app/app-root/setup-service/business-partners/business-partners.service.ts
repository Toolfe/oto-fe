import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessPartnersService {
  setupUrl = this.root.getBusinessPartnerUrl() + 'businesspartnerapi/businesspartner';
  responseData: any;


  constructor(
    private http: HttpClient,
    private common: AuthService,
    private root: SetupRootService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  }

  getPartner(id: any): Observable<any> {
    return this.http.get(this.root.getContactUrl() + 'businesspartnerapi/businesspartner/' + id, this.root.getHeadersnode());
  }

  getPartnervalues(data: any): Observable<any> {
    return this.http.post(this.root.getContactUrl() + 'businesspartnerapi/businesspartnervalues',JSON.stringify(data), this.root.getHeadersnode());
  }

  postPartner(data: any): Observable<any> {
    return this.http.post<any>(this.root.getBusinessPartnerUrl() + 'businesspartnerapi/businesspartner', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(catchError(this.root.errorHandl));
  }

  postContactPartner(data: any): Observable<any> {
    return this.http.post<any>(this.root.getBusinessPartnerUrl() + 'businesspartnerapi/businesscontactpartner', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(catchError(this.root.errorHandl));
  }

  deleteBusinessPartner(id: any): Observable<any> {
    return this.http.delete(this.root.getContactUrl() + 'businesspartnerapi/businesspartner/' + id, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteContact(id: any): Observable<any> {
    return this.http.delete(this.root.getBusinessPartnerUrl() + 'businesspartnerapi/businesspartnercontact/' + id, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getIndividualContact(id: any): Observable<any> {
    return this.http.get(this.root.getContactUrl() + 'businesspartnerapi/businesspartnerIndividualContact/' + id, this.root.getHeadersnode());
  }
  
}
