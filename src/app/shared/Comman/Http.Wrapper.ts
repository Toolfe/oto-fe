
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import {Utilities} from './Utilities';

@Injectable()
export class HttpWrapper {

private headers: any;
private options: any ;
private token: any ;

constructor(private appSettings: Utilities, private http: HttpClient ) {


}

private getReqHeader() {

this.token = localStorage.getItem('token');

if (!this.token) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  } else {
    this.headers = new Headers({ 'x-access-token' : localStorage.getItem('token'),
    'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });

}

return this.options;
}

public post(url: string, body: string) {
    return this.http.post( this.appSettings.GetPath(url), body, this.getReqHeader())
    .map((res: { json: () => any; }) => res.json());
}

public get(url: string) {
  return this.http.get(this.appSettings.GetPath(url), this.getReqHeader()).map((res: { json: () => any; }) => res.json());
  }
}
