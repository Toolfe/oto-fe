import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  dialogdata: any = []

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data != null) {
      this.dialogdata = this.data
    }
  }

  ngOnInit(): void {

  }


}
