import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';
import { TaskService } from '../service/task-service.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./../../dashboard-root/search/search.component.scss'],
  providers:[MobileQueryService]

})
export class SearchTaskComponent implements OnInit {

  searchText!:string;

  isMobile:MediaQueryList;
    constructor(private mobileService:MobileQueryService,
                private service:TaskService) {
      this.isMobile=this.mobileService.mobileQuery;
    }
  show:boolean=false;
    ngOnInit(): void {
    
     
    }
  
    showSuggest(){

    }

    selectFilter(){
      this.show=!this.show
    }

    searchTaskList(task:any){
    this.service.mergeTaskData=task.value;

    }
      applyFilter(event: Event,task:any) {
        this.service.mergeTaskData=task.value;

    const filterValue = (event.target as HTMLInputElement).value;
    task.filter = filterValue.trim().toLowerCase();
 

   
  }

}
