import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { SearchService } from 'src/app/services/global-search/search.service';
export interface User {
  name: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl;
  keywords:any;

  constructor(private service: SearchService,

    private http:AuthService,

     private router:Router) { }

  searchData!:string; 
  options: any;
  filteredOptions!: Observable<any[]>;

  ngOnInit() {

    this.logStatus()

    // setInterval(() => {
    //   this.logStatus();
    // },60000);
 
   
  
  }
  logStatus(){
    let orgId=sessionStorage.getItem('orgId')
    let employeeId=sessionStorage.getItem('empId')
    
    let activeStatus = 1;

    if (this.isSystemOn() && !this.isApplicationActive()) {
      activeStatus = 2;
    }

    else if (!this.isSystemOn()){
      activeStatus = 3;
    }

    this.http.authenticateStatus(employeeId, orgId, activeStatus).subscribe(res => {
     
    });
  }
  
  isApplicationActive(): boolean {
    return !document.hidden;
  }
  
  isSystemOn(): boolean {
    return navigator.onLine;
  }

 

/*   onSearch(){
    this.service.searchData=this.searchData;
    this.service.getKeyWords().subscribe(res=>{
      let keys:any;
      res.forEach((key:any) => {
        keys=key;
        console.log(key,'key');
        if (this.searchData==keys) {
          this.router.navigate(['/dashboard/search-view']);
        }
      });
     })

  } */

 
  
}
