import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  role$ = this.getRoles().pipe(
    map((role => { return role.data })));

  constructor(private http: HttpClient,
    private root: SetupRootService) { }

  //post
  postrole(data: any): Observable<any> {


    return this.http.post<any>(this.root.getRoleUrl() + 'roleapi/roles', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }

  getRoles(): Observable<any> {
    return this.http.get(this.root.getRoleUrl() + 'roleapi/roles', this.root.getHeadersnode());
  }
  viewRoles(id: number): Observable<any> {
    return this.http.get(this.root.getRoleUrl() + 'roleapi/roles/' + id, this.root.getHeadersnode());
  }
  //delete
  deleteRoles(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getRoleUrl() + 'roleapi/roles/' + data.id, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

}
