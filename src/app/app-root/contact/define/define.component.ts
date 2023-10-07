import { Component, OnInit } from '@angular/core';
import { ContactRootComponent } from '../contact-root/contact-root.component';

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss']
})
export class DefineComponent implements OnInit {

  constructor(private root:ContactRootComponent) { }



  ngOnInit(): void {

  }

 
  onNext(){
    this.root.nextStep();
  }
}
