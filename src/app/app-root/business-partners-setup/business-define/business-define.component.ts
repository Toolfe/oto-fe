import { Component, OnInit } from '@angular/core';
import { BusinessPartnersetupComponent } from '../business-partner-setup-root/business-partner-setup-root.component';

@Component({
  selector: 'app-define',
  templateUrl: './business-define.component.html',
  styleUrls: ['./business-define.component.scss']
})
export class DefineComponent implements OnInit {

  constructor(private root:BusinessPartnersetupComponent) { }



  ngOnInit(): void {

  }

 
  onNext(){
    this.root.nextStep();
  }
}
