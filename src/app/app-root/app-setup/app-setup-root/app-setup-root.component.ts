import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-app-setup-root',
  templateUrl: './app-setup-root.component.html',
  styleUrls: ['./app-setup-root.component.scss']
})
export class AppSetupRootComponent implements OnInit {
appSetupForm:any=FormGroup;

currencyCode!:string;
currencyName!:string;
userData:any;
plan = new FormControl;
plan$:any;
  selectedIndex: number = 0;
 public static plan:any;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
} 
public nextStep() {
    this.selectedIndex += 1;    
}

public previousStep() {
    this.selectedIndex -= 1;
}
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.appForm();
  
  }


 planDetails(event$:any){
      this.plan.setValue(event$);
      return this.plan;
  }




appForm(){
  this.appSetupForm=this.fb.group({
    appSetup:this.fb.group({
      companyName:['', [Validators.required]],
      legalEntityRef:['', [Validators.required]],
      businessNature:['', [Validators.required]],
      currency:[],
      address:['', [Validators.required]],
      adminId:[sessionStorage.getItem('id')],
      createdBy:sessionStorage.getItem('id'),
      modifiedBy:sessionStorage.getItem('id'),
      planDetails:this.fb.group({ 
        createdBy:sessionStorage.getItem('id'),
        modifiedBy:sessionStorage.getItem('id'),
          plan:this.fb.group({
            id:[]
          }),
          fromDate:['',[Validators.required]],
          toDate:['',[Validators.required]],
          paymentPeriod:['',[Validators.required]],
          active:[false]
      }),
      active:[true]
    })
  })
}

}