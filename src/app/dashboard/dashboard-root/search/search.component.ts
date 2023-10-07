import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/global-search/search.service';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent implements OnInit {
isMobile:MediaQueryList;
  constructor(private mobileService:MobileQueryService,
              private service:SearchService) {
    this.isMobile=this.mobileService.mobileQuery;
  }
show:boolean=false;
searchData!:string;
selectedSearchData!:any
  ngOnInit(): void {
    this.searchData=this.service.searchData
   
  }

  showSuggest(){

  }
}
