import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { RoleSetupService } from '../../setup-service/role-setup/role-setup.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
@Component({
  selector: 'app-roles-profile-root',
  templateUrl: './roles-profile-root.component.html',
  styleUrls: ['./roles-profile-root.component.scss']
})
export class RolesProfileRootComponent implements OnInit {
  roleEmpForm:any=FormGroup;
  genericRole= new FormControl;
  customisedRole= new FormControl;
  employeeId=new FormControl;

  Profile:boolean=false;
  Role:boolean=false;
  userRoleAccess: any;


  menuList=['Profiles','Roles', ];
  selectedList:any;
 
  constructor(private fb:FormBuilder,
              private service:RoleSetupService){
                this.userRoleAccess = CommonMethods.userContext();
              }

 

    ngOnInit(){
      if(sessionStorage.getItem('role')=='1'){
        this.Profile=true; 
        this.Role=true; 
      
      
      }
      if(sessionStorage.getItem('role')=='2'){
        let profiles: any = this.userRoleAccess.customRole;
        profiles=JSON.parse(profiles);
    
        profiles.forEach((profile:any):any=>{
          profile=profile.rolesProfilesModule;
          if(profile.profile.selection==true || profile.profile.creation==true || profile.profile.deletion==true || 
            profile.profile.updation==true){
            this.Profile=true;
            return this.Profile; 
          }
    
        })
      }

        if(sessionStorage.getItem('role')=='2'){
          let profiles: any = this.userRoleAccess.customRole;
          profiles=JSON.parse(profiles);
      
          profiles.forEach((profile:any):any=>{
            profile=profile.rolesProfilesModule;
            if(profile.role.selection==true || profile.role.creation==true || profile.role.deletion==true || 
              profile.role.updation==true){
              this.Role=true;
              return this.Role; 
            }
      
          })
        }
       

      this.selectedList=this.menuList[0];
      this. roleSetup();
    }
  


    openMenuList(menuList:any){
      this.selectedList=menuList;
    }
  
  
  selectedIndex: number = 0;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }
  
  public nextStep() {
    this.selectedIndex += 1;
  }
  
  public previousStep() {
    this.selectedIndex -= 1;
  }
  getDefine(){
    this.genericRole.setValue(this.service.defineData);
    return this.genericRole;
  }
  getRoles(){
    this.customisedRole.setValue(this.service.rolesData);
    return this.customisedRole;
  }
  getRoleEmp(){
    this.employeeId.setValue(this.service.roleEmpData);
    return this.employeeId;
  }

  
  
  roleSetup(){
    this.service.defineData=[]
    this.service.rolesData=[]
    this.service.roleEmpData=[]
    this.service.profileData=[]
 
    this.roleEmpForm=this.fb.group({
      basic:this.fb.group({
        createdOn: sessionStorage.getItem('id'),
        modifiedOn: sessionStorage.getItem('id'),
        createdBy: 1,
        modifiedby: 1,
        active: true,
        orgid: [],
        genericRoles:this.fb.group({
          name: null,
          modules:this.fb.group({
            name:[]
          }),
          screens:this.fb.group({
            screen:[]
          }),
          tabels:this.fb.group({
            name:[]
          }),
          dataFields:this.fb.group({
            name:[]
          }),
          customRoles:this.fb.group({
            division:[],
            location:[],
            unit:[],
            department:[],
            subDepartment:[],
            empGroup:[],
            empCategory:[],
            empType:[],
            workingGroup:[],
            designation:[],
            accessProfiles:[],
            employees:[],
            createdOn:[],
            modifiedOn:[],
            createdBy:[],
            modifiedby:[],
            active:true,

          })
        })
     
      })
   
    })
  }
  }

