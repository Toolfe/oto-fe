import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {
  address$ = this.getAddress();
  resAddress: any;
  constructor(
    private http: HttpClient,
    private root: SetupRootService,
  ) { }

  //post
  postAddress(data: any): Observable<any> {
    return this.http.post<any>(this.root.getOrgUrl() + 'basicsetupapi/basicinfo', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }

  getAddress(...params: any): Observable<any> {
    return this.http.get<any>(this.root.getOrgUrl() + 'address/', this.root.getHeaders())
      .pipe(delay(300), map(address => { return address.content }));
  }

  getAppsetup(): Observable<any> {
    return this.http.get(this.root.getOrgUrl() + 'basicsetupapi/basicinfo', this.root.getHeadersnode());
  }
  //delete
  deleteAddress(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getOrgUrl() + 'basicsetupapi/basicinfo/' + data.id, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }
}

