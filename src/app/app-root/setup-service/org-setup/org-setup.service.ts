import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay} from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class OrgSetupService{
  addressData:any;
  divisionData:any;
  unitData:any;
  deptData:any;
  subDeptData:any;
  currencyData:any;
  locationData:any;
  employeeGroupData:any;
  empCategoryData:any;
  empTypeData:any;
  workGroupData:any;
  qualificationData:any;
  skillsSetData:any;
  skillsData:any;
  languageData:any;
  companyData:any;
  industryData:any;
  designationData:any;
  workProcessData:any;
  resourceData:any
  uomsData:any;
  //id=sessionStorage.getItem('orgId')

  //response declaration
//orgData:any;
currency:any[]=[];
responseData:any[]=[];
resAddress:any[]=[];
resDivision:any[]=[];
resLocation:any[]=[];
resUnit$:any[]=[];
resUnit:any[]=[];
resDept$:any[]=[];
resDept:any[]=[];
resSubdept$:any[]=[];
resSubdept:any[]=[];
resCurrency:any[]=[];
resEmpgroup:any[]=[];
resCategory:any[]=[];
resTypes:any[]=[];
resWorkgroup:any[]=[];
resQualifications:any[]=[];
resSkillsets:any[]=[];
resIndustryskill:any[]=[];
resLanguage:any[]=[];
resCompany:any[]=[];
resIndustry:any[]=[];
resDesgination:any[]=[];
resWorkprocess:any[]=[];
resResource:any[]=[];
resUoms:any[]=[];




currencyUrl='http:///otm-json-currency';


constructor(
  private http:HttpClient,
  private common:AuthService,
  private root:SetupRootService
 ) { }








headerOptions = {
  headers: new HttpHeaders({
    'Accept': '*/*'
  })
}

getCurrency():Observable<any>{
  return this.http.get<any>(this.currencyUrl, this.headerOptions);
}

saveCurrency(){
    this.getCurrency().subscribe(data=>{
      this.currency=data;
     
      return this.currency;     
    }) 
  }


orgResponse(){
 return this.http.get<any>(this.root.getOrgUrl()+'setup/'+sessionStorage.getItem('orgId'), this.root.httpOptions).subscribe(
   data=>{
    
    this.responseData=data;
    this.resAddress=data.addresses;
    this.resLocation=data.locations;
    this.resDivision=data.divisions;
    this.resUnit$=this.fetchUnit();
    this.resDept$=this.fetchDept();
    this.resSubdept$=this.fetchSubdept();
    this.resCurrency=data.currencies;  
    this.resEmpgroup=data.employeeGroups;
    this.resCategory=data.categories;
    this.resTypes=data.empTypes;
    this.resWorkgroup=data.workGroups;
    this.resQualifications=data.qualifications;
    this.resSkillsets=data.skillSets;
    this.resIndustryskill=data.skills;
    this.resLanguage=data.languages;
    this.resCompany=data.companies;
    this.resIndustry=data.industries;
    this.resDesgination=data.designations;
    this.resWorkprocess=data.workProcesses;
    this.resResource=data.resources;
    this.resUoms=data.uoms; 
   }),
  shareReplay()
} 

getLocation(){
  let tempLocation:any[]=[]; 
  let input:any[]=this.locationData
  let response:any[]=this.resLocation;
  
  response.forEach((x:any)=>{
    tempLocation.push(x);
  })
  input.forEach((y:any)=>{
    tempLocation.push(y);
  })
  this.resLocation=tempLocation;
  
} 

getDivision(){
 
  
  let tempDivision:any[]=[]; 
  let input:any[]=this.divisionData
  let response:any[]=this.resDivision;
  
  response.forEach((x:any)=>{
    tempDivision.push(x);
  })
  input.forEach((y:any)=>{
    tempDivision.push(y);
  })
  this.resDivision=tempDivision;
  
} 

fetchUnit(){
let response:any[]=[];   
this.resDivision.forEach((x:any)=>{
  x.units.forEach((element:any) => {
    response.push(element);    
  });  
 })
 
 
return this.resUnit=response; 
}

getUnit(){
  let tempUnit:any[]=[]; 
  let input:any[]=this.unitData
  let response:any[]=this.resUnit;
  
  response.forEach((x:any)=>{
    tempUnit.push(x);
  })
  input.forEach((y:any)=>{
    tempUnit.push(y);
  })
  this.resUnit=tempUnit;
  
}

fetchDept(){
  let response:any[]=[];   
this.resUnit.forEach((x:any)=>{
  x.departments.forEach((element:any) => {
    response.push(element);    
  });  
 })
 
return this.resDept=response; 
}

getDept(){
  let tempDept:any[]=[]; 
  let input:any[]=this.deptData;
  let response:any[]=this.resDept;
  
  response.forEach((x:any)=>{
    tempDept.push(x);
  })
  input.forEach((y:any)=>{
    tempDept.push(y);
  })
  this.resDept=tempDept;

}

fetchSubdept(){
  let response:any[]=[];   
  this.resDept.forEach((x:any)=>{
  x.subdepartments.forEach((element:any) => {
  response.push(element);    
  });  
 })
 
return this.resSubdept=response; 
}

getsubDept(){
  let tempSubdept:any[]=[]; 
  let input:any[]=this.subDeptData
  let response:any[]=this.resSubdept;
  
  response.forEach((x:any)=>{
    tempSubdept.push(x);
  })
  input.forEach((y:any)=>{
    tempSubdept.push(y);
  })
  this.resSubdept=tempSubdept;
  
}

  getCurrency$(){
    let tempCurrency:any[]=[]; 
    let input:any[]=this.currencyData
    let response:any[]=this.resCurrency;
    
    response.forEach((x:any)=>{
      tempCurrency.push(x);
    })
    input.forEach((y:any)=>{
      tempCurrency.push(y);
    })
    this.resCurrency=tempCurrency;
    
  }

  getEmpgroup(){
    let tempEgroup:any[]=[]; 
    let input:any[]=this.employeeGroupData;
    let response:any[]=this.resEmpgroup;
    
    response.forEach((x:any)=>{
      tempEgroup.push(x);
    })
    input.forEach((y:any)=>{
      tempEgroup.push(y);
    })
    this.resEmpgroup=tempEgroup;
   
  }





}
