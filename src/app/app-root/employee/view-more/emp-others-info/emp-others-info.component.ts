import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-others-info',
  templateUrl: './emp-others-info.component.html',
  styleUrls: ['./emp-others-info.component.scss']
})
export class EmpOthersInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

}
