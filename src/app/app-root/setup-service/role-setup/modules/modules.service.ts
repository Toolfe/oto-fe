import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {


  moduleset: any[] = [];

  constructor(
    private http: HttpClient,
    private root: SetupRootService
  ) { }



  //post
  postModule(data: any): Observable<any> {
    return this.http.post<any>(this.root.getRoleUrl() + 'moduleset/', JSON.stringify(data), this.root.getHeaders())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  //get
  getModule(): Observable<any> {
    let url = this.root.stringifyUrl(this.root.getRoleUrl() + 'moduleset/10001');
    return this.http.get<any>(url, this.root.httpOptions)
      .pipe(map((res: any) => {
        this.moduleset = res.modules
        shareReplay();
        return res;
      }));
  }


}


