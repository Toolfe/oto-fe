import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EmpsetupService } from 'src/app/app-root/setup-service/emp-setup/empsetup.service';
import { FetchCommon } from '../../setup-service/common-function/fetch-common';
import { OrgSetupService } from '../../setup-service/org-setup/org-setup.service';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {

  selectedIndex: number = 0;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }
  item:any;  
  imageSrc:any;
  $location:any;
  $division:any;
  $unit:any;
  $department:any;
  $subDept:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any
              ) { }

  ngOnInit(){
  
    
  }


}
