import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, delay, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { AppSetup } from '../../app-models/setupModel';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class AppSetupService {

  appsetupData: any;

  appSetup$ = this.getAppsetup();

  plan: any;
  url = 'http://localhost:3006/';



  constructor(
    private http: HttpClient,
    private common: AuthService,
    private root: SetupRootService) { }

  appHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    }
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

  basicSetup(data: any) {
    var requestData = JSON.stringify(data);
    return this.http.post<String>(this.root.getAppSetupUrl(), requestData, this.appHeader());
  }


  // getAppsetup(){
  //   return this.http.get<any>(this.root.getAppSetupUrl()+sessionStorage.getItem('orgId'), this.root.getHeaders())
  //     .pipe(shareReplay());
  // }

  getAppsetup(): Observable<any> {
    return this.http.get(this.root.getOrgUrl() + 'basicinfo', this.getHeadersnode());
  }


}
