import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AdminRegister, OTPRequest, OTPResponse, VerifyContact } from '../../../models/adminRegister';
import { Router } from '@angular/router';
import { SetupRootService } from 'src/app/app-root/setup-service/setup-root/setup-root.service';
import { AppRootComponent } from 'src/app/app-root/app-root/app-root.component';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage = '';
  submitData: any;

  isLoggedIn!: boolean;


  //URL
  url='http://localhost:2000/';


  constructor(
    private http: HttpClient,
    private router: Router,
    private root:SetupRootService) { }

  //http header
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  header = {
    headers: new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem('token'),
     }),
  }

  //post -- User Register
  register(data: AdminRegister) {
    return this.http.post<any>(this.url + 'register', JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandl))
  }

  //post -- send otp
  sendOtp(data: OTPRequest) {
    return this.http.post<OTPResponse>(this.url + 'send', JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandl))
  }

  //post -- Verify OTP
  verify(data: VerifyContact) {
    return this.http.post<OTPResponse>(this.url + 'verify', JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandl))
  }


  // authenticate(data: any) {
  //   return this.http.post<any>(this.url + 'auth/authentication', JSON.stringify(data), this.httpOptions)
  //     .pipe(catchError(this.errorHandl))
  // }


//  authenticate(data: any): Observable<any> {
//     return this.http.get("../../../../assets/data/login.json");
// }

authenticate(data: any): Observable<any> {
  return this.http.post(environment.AUTH_URL + 'auth/authentication',data);
}

authenticateStatus(employeeId: any, orgId: any , activeStatus: number): Observable<any> {
  const data = {
    employeeId: employeeId,
    activeStatus: activeStatus,
    orgId: orgId
  };
  return this.http.post(environment.AUTH_URL + 'auth/authenticationStatus', JSON.stringify(data), this.root.getHeadersnode())
    .pipe(catchError(this.errorHandl));
}

getauthenticateStatus(status: any): Observable<any> {
  return this.http.get(environment.EMP_URL + 'dashboardapi/authenticationStatus/'+status,this.root.getHeadersnode())
  .pipe(catchError(this.errorHandl));
}

resetPassword(data: any): Observable<any> {
  return this.http.post(environment.AUTH_URL + 'auth/reset_password',data);
}


  logout(data:any) {
    let id=sessionStorage.getItem('id')
     return this.http.patch<any>(environment.AUTH_URL + 'logout/'+id, JSON.stringify(data), this.root.getHeaders())
    .pipe(catchError(this.errorHandl))

  }

  clearSession(){
    this.router.navigate(['/login'])
    sessionStorage.clear();
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('currentIndex');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('orgId');

    this.isLoggedIn = false;
  }

  refreshToken() {
    return this.http.get<any>(this.url+'refreshtoken',this.header ).pipe(tap(() => {
      ;
    }));
  }

  refreshtoken() {
    return this.http.post<any>(this.url+'refreshtoken/',this.header )
      .pipe(catchError(this.errorHandl))
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
   // sessionStorage.setItem('errorMessage', this.errorMessage);
    return throwError(error);
  }




}

