import { Component, OnInit } from '@angular/core';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';
@Component({
  selector: 'app-my-docs',
  templateUrl: './my-docs.component.html',
  styleUrls: ['./my-docs.component.scss'],
  providers:[MobileQueryService]
})
export class MyDocsComponent implements OnInit {
  mobileQuery:MediaQueryList
  constructor(private mobileSerice:MobileQueryService){
    this.mobileQuery=this.mobileSerice.mobileQuery
  }

  ngOnInit(): void {
  }

}
