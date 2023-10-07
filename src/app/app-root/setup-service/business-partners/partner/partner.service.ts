import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { BrandDetails } from 'src/app/app-root/business-partners/partner-model';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  partner$=this.getPartnerBrands();
  contactPartner$=this.getPartner().pipe(map(partner=>{return partner.content}));
  category$: any;

  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

 //post
 postPartner(data:any):Observable<any>{

    return this.http.post<any>(this.root.getBusinessPartnerUrl()+'busipartner', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
getPartner(...params:any):Observable<any>{
  
  let offset=params[0]?params[0]:1;
  let limit=params[1]?params[1]:500000000;
  let sort=params[2]?params[2]:'id';
  let order=params[3]?params[3]:2;//DESC
  let url=this.root.stringifyUrl(this.root.getBusinessPartnerUrl()+'businesspartnerapi/businesspartner',offset,limit,sort,order);

  
  return this.http.get<any>(url,this.root.getHeadersnode());
    
}
//put
updatePartner(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  return this.http.post<any>(this.root.getBusinessPartnerUrl()+'businesspartnerapi/businesspartner', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}


  //delete
  deleteParner(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getBusinessPartnerUrl()+'businesspartnerapi/businesspartner/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  postPartnerBrand(data:BrandDetails):Observable<BrandDetails>{
    let setup:any={};
    setup.id=sessionStorage.getItem("orgId");
    data.setup=setup;
    data.active=true;
    return this.http.post<BrandDetails>(this.root.getBrandUrl()+'businesspartnerapi/businesspartner', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(
      catchError(this.root.errorHandl),
       map((res: any) => {
      return res;   
    }));
  }

  getPartnerBrands():Observable<BrandDetails[]>{
   return this.http.get<BrandDetails[]>(this.root.getBrandUrl()+'businesspartnerapi/businesspartner',this.root.getHeadersnode());
  }

  updatePartnerBrand(data:BrandDetails):Observable<BrandDetails>{
    let setup:any={};
    setup.id=sessionStorage.getItem("orgId");
    data.setup=setup;
    return this.http.put<BrandDetails>(this.root.getBrandUrl()+'businesspartnerapi/businesspartner'+data.id, JSON.stringify(data),this.root.getHeadersnode())
    .pipe(
      catchError(this.root.errorHandl),
       map((res: any) => {
      return res;   
    }));
  }

  deletePartnerBrand(id:any){
   return this.http.delete<any>(this.root.getBrandUrl()+'businesspartnerapi/businesspartner/'+id, this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
  }
}

