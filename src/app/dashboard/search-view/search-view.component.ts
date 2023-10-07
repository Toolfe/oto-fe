import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/global-search/search.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit {
  searchData!:string;
  constructor(private service:SearchService) { }

  ngOnInit(): void {
    this.searchData=this.service.searchData
  }

}
