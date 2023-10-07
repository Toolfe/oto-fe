import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';

@Component({
  selector: 'app-define-root',
  templateUrl: './define-root.component.html',
  styleUrls: ['./define-root.component.scss']
})
export class DefineRootComponent implements OnInit {

  constructor() { }

  selectedIndex: number = 0;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
}

  ngOnInit(): void {
  }

}
