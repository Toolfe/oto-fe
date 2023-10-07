import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
@Component({
  selector: 'app-business-partner-setup-root',
  templateUrl: './business-partner-setup-root.component.html' ,
  styleUrls: ['./../../org-setup/org-setup-root/org-setup-root.component.scss'],

})
export class BusinessPartnersetupComponent implements OnInit {
 
  selectedIndex: number = 0;
  selectedTab:any;
  contactForm:any=FormGroup;
  category=new FormControl;
  subCategory=new FormControl;
  type1=new FormControl;
  type2=new FormControl;
  businessfunctionality=new FormControl;
  formField:any;
  userRoleAccess: any;
  contactCategory:boolean=false;
  contactSubCategory:boolean=false;
  contactType1:boolean=false;
  contacType2:boolean=false;
  contactFunctionality:boolean=false;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
    this.selectedTab = tabChangeEvent.tab.textLabel;
}

public nextStep() {
    this.selectedIndex += 1;
}

public previousStep() {
    this.selectedIndex -= 1;
}

 
  constructor(){
    this.userRoleAccess = CommonMethods.userContext();
  }

  menuList=['Define','Data Fields'];
  selectedList:any;
  ngOnInit(){
    if(sessionStorage.getItem('role')=='1'){
      this.selectedTab = 'Business Partner Category';
      this.contactCategory=true; 
      this.contactSubCategory=true;
      this.contactType1=true;
      this.contacType2=true;
      this.contactFunctionality=true;
    
    }
    if(sessionStorage.getItem('role')=='2'){
      let profiles: any = this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.contactModule);
        if(profile.contactCategory.selection==true || profile.contactCategory.creation==true || profile.contactCategory.deletion==true || 
          profile.contactCategory.updation==true){
          this.contactCategory=true;
          return this.contactCategory; 
        }
  
      })
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles: any = this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.contactModule);
        if(profile.contactSubCategory.selection==true || profile.contactSubCategory.creation==true || profile.contactSubCategory.deletion==true || 
          profile.contactSubCategory.updation==true){
          this.contactSubCategory=true;
          return this.contactSubCategory; 
        }
  
      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles: any = this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.contactModule);
        if(profile.contactType1.selection==true || profile.contactType1.creation==true || profile.contactType1.deletion==true || 
          profile.contactType1.updation==true){
          this.contactType1=true;
          return this.contactType1; 
        }
  
      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles: any = this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.contactModule);
        if(profile.contacType2.selection==true || profile.contacType2.creation==true || profile.contacType2.deletion==true || 
          profile.contacType2.updation==true){
          this.contacType2=true;
          return this.contacType2; 
        }
  
      })
      if(sessionStorage.getItem('role')=='2'){
        let profiles: any = this.userRoleAccess.customRole;
        profiles=JSON.parse(profiles);
    
        profiles.forEach((profile:any):any=>{
          profile=JSON.parse(profile.contactModule);
          if(profile.businessfunctionality.selection==true || profile.businessfunctionality.creation==true || profile.businessfunctionality.deletion==true || 
            profile.businessfunctionality.updation==true){
            this.contactFunctionality=true;
            return this.contactFunctionality; 
          }
    
        })
       
      
      }
    
    
    } 
   
  }
}


