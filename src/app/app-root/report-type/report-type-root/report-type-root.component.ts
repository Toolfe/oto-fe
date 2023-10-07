import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-report-type-root',
  templateUrl: './report-type-root.component.html',
  styleUrls: ['./report-type-root.component.scss']
})
export class ReportTypeRootComponent implements OnInit {

  selectedIndex: number = 0;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
}

  constructor() { }

  ngOnInit(): void {
  }

}
