import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';

@Component({
  selector: 'app-assign-escalate-root',
  templateUrl: './assign-escalate-root.component.html',
  styleUrls: ['./assign-escalate-root.component.scss']
})
export class AssignEscalateRootComponent implements OnInit {
assignForm:any=FormGroup;


assign:any=new FormControl;
escalate:any=new FormControl;
userRoleAccess: any;

assignDetails:boolean=false;

  constructor() {
    this.userRoleAccess = CommonMethods.userContext();
   }

  selectedIndex: number = 0;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

 

  ngOnInit(): void {
    if(sessionStorage.getItem('role')=='1'){
      this.assignDetails=true; 
    
    
    }
    if(sessionStorage.getItem('role')=='2'){
      let profiles: any = this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.assignModule);
        if(profile.assignDetails.selection==true || profile.assignDetails.creation==true || profile.assignDetails.deletion==true || 
          profile.assignDetails.updation==true){
          this.assignDetails=true;
          return this.assignDetails; 
        }
  
      })
    
  }

  }
 
}
