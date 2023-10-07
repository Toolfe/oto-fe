import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { GroupService } from 'src/app/app-root/setup-service/task-master-setup/group/group.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit,OnDestroy {
  dept$=this.departments.department$;
  emp$=this.employee.employee$;
  type$=this.taskType.type$;
  group$=this.taskGroup.group$;
  projects$=this.projects.project$;
  $priority:any;
  priority:any;
  prioritySubscription!:Subscription;

  constructor(
    private departments:DeptService,
    private taskGroup:GroupService,
    private taskType:TypeService,
    private projects:ProjectService,
    private employee:EmployeeService,
    private priorities:PriorityService,
  ) { }

  ngOnInit(): void {
    this.getPriority();
  }
  getPriority(){
    this.prioritySubscription=this.priorities.getPriority().subscribe((res:any)=>{
      this.$priority=res.content;
      let data=this.$priority
      let obj:any = data.find((o: { priority1: any; }) => o.priority1);
      const arr = Object.values(obj);
       arr.shift();
      arr.pop();
      this.priority=arr;
    })
  }

  ngOnDestroy(): void {
    this.prioritySubscription.unsubscribe();
  }
  
}
