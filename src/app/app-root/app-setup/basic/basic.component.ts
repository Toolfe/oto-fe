import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppSetupRootComponent } from '../app-setup-root/app-setup-root.component';
import { OrgSetupService } from '../../setup-service/org-setup/org-setup.service';
import { CountryCodeService } from 'src/app/shared/country-code/country-code.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit{
@Input() parent:any=FormGroup;
data:any='';
currency$:any[]=[];
searchCurrency!:string;
currency:any;
  constructor(
    private root:AppSetupRootComponent,
    private orgService:OrgSetupService,
    private currencyService:CountryCodeService) { }

  ngOnInit(): void {
  
    this.currencyService.getCountryCurrency().subscribe(res=>{   
      let currencies:any= JSON.parse(res.jsonData);
      currencies.sort((a:any, b:any) => (a.currencyName > b.currencyName) ? 1 : -1)
      this.currency$=currencies;
    });   
  }


onNext(){
  this.root.nextStep();
}
onPrevious(){
  this.root.previousStep();
}
}