import { Component, OnInit } from '@angular/core';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';
import * as DecoupledEditor  from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'doc-editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MobileQueryService],

})
export class DocumentEditor implements OnInit {

  

  constructor(private mobileService:MobileQueryService) {
    this.mobileQuery=this.mobileService.mobileQuery
  }
  ngOnInit(): void {
    
  }
  mobileQuery:MediaQueryList

 

}
