import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location$=this.getLocation().pipe(
    map(location=> {return location.data})
  )
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }


resLocation:any[]=[];
resLocationId:any={};

 //post
postLocation(data:any):Observable<any>{
  
    return this.http.post<any>(this.root.getOrgUrl()+'locationapi/location', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


getLocation(): Observable<any> {
  return this.http.get(this.root.getOrgUrl()+'locationapi/location',this.root.getHeadersnode());
}


  //delete
  deleteLocation(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getOrgUrl()+'locationapi/location/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


  locationResponse(){
    this.getLocation().subscribe(data=>{
   this.resLocation=data.content;
  
});
  }

}

