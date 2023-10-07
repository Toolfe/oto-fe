import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';

@Component({
  selector: 'app-org-setup-root',
  templateUrl: './org-setup-root.component.html',
  styleUrls: ['./org-setup-root.component.scss'],
})
export class OrgSetupRootComponent implements OnInit,OnDestroy {
selection!:boolean;
basicInfo!:boolean;
division!:boolean;
location!:boolean;
unit!:boolean;
department!:boolean;
subDepartment!:boolean;
selectedIndex: number = 0;
userRoleAccess : any;

  constructor() {
    this.userRoleAccess = CommonMethods.userContext();

      if (sessionStorage.getItem('role') == '1') {
        this.basicInfo = true;
        this.location = true;
        this.division = true;
        this.department = true;
        this.subDepartment = true;
    }
   }

  /**Displayed Tab Options */
  menuList=['Basic Info','Location','Division', 'Business Unit','Department',
              'Sub Department',  'Employee Group'];
  selectedList:any;

  tabVisible(data:any):any{
  if(sessionStorage.getItem('role') == '1' ){
    return true 
  }else{
    if(data=='Location' ){
      let profiles:any= this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
      let flag:boolean=false;
      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.location.selection==true || profile.location.creation==true || profile.location.deletion==true || 
          profile.location.updation==true){
          flag=true;
          return flag; 
        }
      })
      return flag;
    }
    if(data=='Division' ){
      let profiles:any= this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
      let flag:boolean=false;
      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.division.selection==true || profile.division.creation==true || profile.division.deletion==true || 
          profile.division.updation==true){
          flag=true;
          return flag; 
        }
      })
      return flag;
    }
    if(data=='Business Unit' ){
      let profiles:any= this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
      let flag:boolean=false;
      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.unit.selection==true || profile.unit.creation==true || profile.unit.deletion==true || 
          profile.unit.updation==true){
          flag=true;
          return flag; 
        }
      })
      return flag;
    }
    if(data=='Department' ){
      let profiles:any= this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
      let flag:boolean=false;
      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.department.selection==true || profile.department.creation==true || profile.department.deletion==true || 
          profile.department.updation==true){
          flag=true;
          return flag; 
        }
      })
      return flag;
    }
    if(data=='Sub Department' ){
      let profiles:any= this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);
      let flag:boolean=false;
      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.subDepartment.selection==true || profile.subDepartment.creation==true || profile.subDepartment.deletion==true || 
          profile.subDepartment.updation==true){
          flag=true;
          return flag; 
        }
      })
      return flag;
    }
    else{
      return true
    }
   
  }

  }

  ngOnInit(): void {
    if(sessionStorage.getItem('selectedList')==null){
      this.selectedList=this.menuList[0];
      //Initialize with first tab
    
    }else{
      this.selectedIndex=Number(sessionStorage.getItem('selectedList'));
      this.selectedList=this.menuList[this.selectedIndex]; //If tab is already selected
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('selectedList');  //Remove selected tab from session storage
  }

  openMenuList(selected:any, index:number){
    this.selectedList=selected;
    sessionStorage.setItem('selectedList',index.toString()); //Set selected tab to session storage
  }
}