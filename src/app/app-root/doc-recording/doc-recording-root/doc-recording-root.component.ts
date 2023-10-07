import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-doc-recording-root',
  templateUrl: './doc-recording-root.component.html',
  styleUrls: ['./doc-recording-root.component.scss']
})
export class DocRecordingRootComponent implements OnInit {
  selectedIndex: number = 0;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
