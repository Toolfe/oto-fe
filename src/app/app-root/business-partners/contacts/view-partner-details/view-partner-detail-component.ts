import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-partner-detail',
  templateUrl: 'view-partner-detail-component.html', // Your dialog template
  styleUrls: ['./view-partner-detail-component.scss'],
})
export class ViewPartnerDataDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
