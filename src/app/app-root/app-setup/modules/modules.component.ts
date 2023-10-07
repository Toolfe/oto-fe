import { Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppSetupRootComponent } from '../app-setup-root/app-setup-root.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
   planForm:any=FormGroup;
      plan$:any;
     public selectedPlan:any;

     @Input() parent:any=FormGroup


  constructor( private root:AppSetupRootComponent) { }

  ngOnInit(): void { 
  }

  onNext(){
    this.root.nextStep();
  }
  onPrevious(){
    this.root.previousStep();
  }


}