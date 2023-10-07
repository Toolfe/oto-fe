import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';


@Component({
  selector: 'app-task-master-root',
  templateUrl: './task-master-root.component.html',
  styleUrls: ['./task-master-root.component.scss']
})
export class TaskMasterRootComponent implements OnInit {
  selectedIndex: number = 0;
  selectedTab: any;

  type:boolean=false;
  group:boolean=false;
  kpi:boolean=false;
  priority:boolean=false
  expectation:boolean=false;
  status:boolean=false;
  scale:boolean=false;
  rating:boolean=false;
  

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


  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('role')=='1'){
      this.selectedTab = 'Set Range';
      this.type=true; 
      this.group=true;
      this.kpi=true;
      this.priority=true;
      this.expectation=true;
      this.status=true;
      this.scale=true;
      this.rating=true;
    
    }
    if(sessionStorage.getItem('role')=='employee'){
      let profiles:any=sessionStorage.getItem('customRole');
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.taskMasterModule);
        if(profile.type.selection==true || profile.type.creation==true || profile.type.deletion==true || 
          profile.type.updation==true){
          this.type=true;
          return this.type; 
        }
  
      })
     
    
    } 
    if(sessionStorage.getItem('role')=='employee'){
      let profiles:any=sessionStorage.getItem('customRole');
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.taskMasterModule);
        if(profile.group.selection==true || profile.group.creation==true || profile.group.deletion==true || 
          profile.group.updation==true){
          this.group=true;
          return this.group; 
        }
  
      })
     
    
    } 
    if(sessionStorage.getItem('role')=='employee'){
      let profiles:any=sessionStorage.getItem('customRole');
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.taskMasterModule);
        if(profile.kpi.selection==true || profile.kpi.creation==true || profile.kpi.deletion==true || 
          profile.kpi.updation==true){
          this.kpi=true;
          return this.kpi; 
        }
  
      })
     
    
    } 
    if(sessionStorage.getItem('role')=='employee'){
      let profiles:any=sessionStorage.getItem('customRole');
      profiles=JSON.parse(profiles);
  
      profiles.forEach((profile:any):any=>{
        profile=JSON.parse(profile.taskMasterModule);
        if(profile.priority.selection==true || profile.priority.creation==true || profile.priority.deletion==true || 
          profile.priority.updation==true){
          this.priority=true;
          return this.priority; 
        }
  
      })
      if(sessionStorage.getItem('role')=='employee'){
        let profiles:any=sessionStorage.getItem('customRole');
        profiles=JSON.parse(profiles);
    
        profiles.forEach((profile:any):any=>{
          profile=JSON.parse(profile.taskMasterModule);
          if(profile.expectation.selection==true || profile.expectation.creation==true || profile.expectation.deletion==true || 
            profile.expectation.updation==true){
            this.expectation=true;
            return this.expectation; 
          }
    
        })
        if(sessionStorage.getItem('role')=='employee'){
          let profiles:any=sessionStorage.getItem('customRole');
          profiles=JSON.parse(profiles);
      
          profiles.forEach((profile:any):any=>{
            profile=JSON.parse(profile.taskMasterModule);
            if(profile.status.selection==true || profile.status.creation==true || profile.status.deletion==true || 
              profile.status.updation==true){
              this.status=true;
              return this.expectation; 
            }
      
          })
          if(sessionStorage.getItem('role')=='employee'){
            let profiles:any=sessionStorage.getItem('customRole');
            profiles=JSON.parse(profiles);
        
            profiles.forEach((profile:any):any=>{
              profile=JSON.parse(profile.taskMasterModule);
              if(profile.scale.selection==true || profile.scale.creation==true || profile.scale.deletion==true || 
                profile.scale.updation==true){
                this.scale=true;
                return this.scale; 
              }
        
            })
            if(sessionStorage.getItem('role')=='employee'){
              let profiles:any=sessionStorage.getItem('customRole');
              profiles=JSON.parse(profiles);
          
              profiles.forEach((profile:any):any=>{
                profile=JSON.parse(profile.taskMasterModule);
                if(profile.rating.selection==true || profile.rating.creation==true || profile.rating.deletion==true || 
                  profile.rating.updation==true){
                  this.rating=true;
                  return this.rating; 
                }
          
              })
       
}

    
}
    }
  }
}
  }
}