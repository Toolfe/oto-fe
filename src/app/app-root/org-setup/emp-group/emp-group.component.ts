import { Component, OnInit} from '@angular/core';
import { OrgSetupRootComponent } from '../org-setup-root/org-setup-root.component';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';


@Component({
  selector: 'app-emp-group',
  templateUrl: './emp-group.component.html',
  styleUrls: ['./emp-group.component.scss'],
})
export class EmpGroupComponent implements OnInit {
 
  empGroup:boolean=false;
  empCategory:boolean=false;
  empType:boolean=false;
  workingGroup:boolean=false
  qualification:boolean=false;
  skillSet:boolean=false;
  industrySpecificSkills:boolean=false;
  language:boolean=false;
  company:boolean=false;
  industry:boolean=false;
  designation:boolean=false;
  workProcess:boolean=false;
  resource:boolean=false;
  uoms:boolean=false;
  selectedIndex: number = 0;
  selectedTab:any;
  userRoleAccess: any;
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

  
    constructor(private root:OrgSetupRootComponent) { 
      this.userRoleAccess = CommonMethods.userContext();
    }
  ngOnInit(): any {
    if(sessionStorage.getItem('role')== '1'){
      
      this.selectedTab = "Emp Group";
      this.empGroup=true; 
      this.empCategory=true;
      this.empType=true;
      this.workingGroup=true;
      this.qualification=true;
      this.skillSet=true;
      this.industrySpecificSkills=true;
      this.language=true;
      this.company=true;
      this.industry=true;
      this.designation=true;
      this.workProcess=true;
      this.resource=true;
      this.uoms=true;
      
      
    }
    if(sessionStorage.getItem('role')=='2'){
      this.selectedTab = "Emp Group";
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.employeeGroup.selection==true || profile.employeeGroup.creation==true || profile.employeeGroup.deletion==true || 
          profile.employeeGroup.updation==true){
          this.empGroup=true;
          return this.empGroup; 
        }

      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.employeeCategory.selection==true || profile.employeeCategory.creation==true || profile.employeeCategory.deletion==true || 
          profile.employeeCategory.updation==true){
          this.empCategory=true;
          return this.empCategory; 
        }

      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.employeeType.selection==true || profile.employeeType.creation==true || profile.employeeType.deletion==true || 
          profile.employeeType.updation==true){
          this.empType=true;
          return this.empType; 
        }

      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.workingGroup.selection==true || profile.workingGroup.creation==true || profile.workingGroup.deletion==true || 
          profile.workingGroup.updation==true){
          this.workingGroup=true;
          return this.workingGroup; 
        }

      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.qualification.selection==true || profile.qualification.creation==true || profile.qualification.deletion==true || 
          profile.qualification.updation==true){
          this.qualification=true;
          return this.qualification; 
        }

      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.skillSet.selection==true || profile.skillSet.creation==true || profile.skillSet.deletion==true || 
          profile.skillSet.updation==true){
          this.skillSet=true;
          return this.skillSet; 
        }

      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.industrySpecificSkills.selection==true || profile.industrySpecificSkills.creation==true || profile.industrySpecificSkills.deletion==true || 
          profile.industrySpecificSkills.updation==true){
          this.industrySpecificSkills=true;
          return this.industrySpecificSkills; 
        }

      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.language.selection==true || profile.language.creation==true || profile.language.deletion==true || 
          profile.language.updation==true){
          this.language=true;
          return this.language; 
        }

      })
     
    
    } 
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.company.selection==true || profile.company.creation==true || profile.company.deletion==true || 
          profile.company.updation==true){
          this.company=true;
          return this.company; 
        }

      })
     
    
    }
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.industry.selection==true || profile.industry.creation==true || profile.industry.deletion==true || 
          profile.industry.updation==true){
          this.industry=true;
          return this.industry; 
        }

      })
     
    
    }
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.designation.selection==true || profile.designation.creation==true || profile.designation.deletion==true || 
          profile.designation.updation==true){
          this.designation=true;
          return this.designation; 
        }

      })
     
    
    }
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.workProcess.selection==true || profile.workProcess.creation==true || profile.workProcess.deletion==true || 
          profile.workProcess.updation==true){
          this.workProcess=true;
          return this.workProcess; 
        }

      })
     
    
    }
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.resource.selection==true || profile.resource.creation==true || profile.resource.deletion==true || 
          profile.resource.updation==true){
          this.resource=true;
          return this.resource; 
        }

      })
     
    
    }
    if(sessionStorage.getItem('role')=='2'){
      let profiles:any=this.userRoleAccess.customRole;
      profiles=JSON.parse(profiles);

      profiles.forEach((profile:any):any=>{
        profile=profile.organizationModule;
        if(profile.uoms.selection==true || profile.uoms.creation==true || profile.uoms.deletion==true || 
          profile.uoms.updation==true){
          this.uoms=true;
          return this.uoms; 
        }

      })
     
    
    }
  

}

  }
  