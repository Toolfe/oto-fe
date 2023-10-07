import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class RoleEmpService {

  constructor(private http:HttpClient,
    private root:SetupRootService) { }

//post
postRoleEmp(data:any) {
return this.http.post<any>(this.root.getContactUrl()+'setup/', JSON.stringify(data),this.root.getHeaders())
.pipe(
//retry(1),
catchError(this.root.errorHandl)
)
}

//put
updateRoleEmp(data:any) {
return this.http.put<any>(this.root.getContactUrl()+'setup/'+data.id, JSON.stringify(data),this.root.getHeaders())
.pipe(
//retry(1),
catchError(this.root.errorHandl)
)
}

//delete
deleteRoleEmp(data:any){
this.http.delete(this.root.getContactUrl()+'setup/'+data.id,this.root.httpOptions ).subscribe(data => {
});
}
}
