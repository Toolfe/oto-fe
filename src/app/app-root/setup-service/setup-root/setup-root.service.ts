import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupRootService {
  errorMessage!: string;

  constructor() { }

  //http header

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    }),
  }

  public getHeaders() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      }),
    }
    return httpOptions;
  }

  public getHeadersnode() {
    let httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      }),
    }
    return httpOptions;
  }

  public getAppSetupUrl(): string {
    let url: string = 'http://localhost:2026/app/api/v1/appsetup/';
    return url;
  }

  public getPlanUrl(): string {
    let url: string = 'http://localhost:2026/app/api/v1/appsetup/plan/';
    return url;
  }

  public getOrgUrl(): String {
    let url: String = environment.ORG_URL;
    return url;
  }

  public getAllCurrencyUrl(): string {
    let url: string = 'https://raw.githubusercontent.com/otomatetech/country-data-json/main/src/currency-codes.json';
    return url;
  }
  public getContactUrl(): String {
    let url: String = environment.CONTACT_URL;   //2007 port 
    return url;
  }

  public getBusinessPartnerUrl(): String {
    let url: String = environment.CONTACT_URL;
    return url;
  }

  public getBrandUrl(): String {
    let url: String = environment.CONTACT_URL;
    return url;
  }

  public getEmployeeUrl(): String {
    let url: String = environment.EMP_URL; 
    return url;
  }

  public getRoleUrl(): String {
    let url: String = environment.ROLE_URL;
    return url;
  }

  public getAssignUrl(): String {
    let url: String = 'http://localhost:2038/assign/api/v1/';
    return url;
  }

  public getTaskUrl(): String {
    let url: String = environment.TASK_URL;
    return url;
  }

  public getProcessUrl(): String {
    let url: String = environment.TMS_URL;
    return url;
  }
  public getProjectUrl(): String {
    let url: String = environment.PROJECT_URL;
    return url;
  }

  public getProjectOrderUrl(): String {
    let url: String = environment.PROJECT_URL;
    return url;
  }
  public getReportUrl(): String {
    let url: String = 'http://localhost:2056/task/api/v1/';
    return url;
  }

  public getDocUrl(): String {
    let url: String = environment.DOC_URL;
    return url;
  }


  // Error handlinge
  errorHandl(error: any) {
    if (error.error != null || error.error != undefined) {
      // Get client-side error
      this.errorMessage = error.error.message;
    } else {
      // Get server-side error
      this.errorMessage = `Something went wrong`;
    }

    sessionStorage.setItem('errorMessage', this.errorMessage);
    return throwError(this.errorMessage);
  }


  public stringifyUrl(url: string, ...params: any): string {
    if (params[3]) {
      return url + params[0] + '/' + params[1] + '/' + params[2] + '/' + params[3];
    } else if (params[2]) {
      return url + params[0] + '/' + params[1] + '/' + params[2];
    } else if (params[1]) {
      return url + params[0] + '/' + params[1];
    } else if (params[0]) {
      return url + params[0];

    } else {
      return url;
    }
  }
}
