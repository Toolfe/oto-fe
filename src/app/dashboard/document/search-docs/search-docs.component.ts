import { Component, OnInit } from '@angular/core';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';

@Component({
  selector: 'app-search-docs',
  templateUrl: './search-docs.component.html',
  styleUrls: ['./../../dashboard-root/search/search.component.scss'],
  providers:[MobileQueryService]
})
export class SearchDocsComponent implements OnInit {
  isMobile:MediaQueryList;
    constructor(private mobileService:MobileQueryService) {
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
  }
  