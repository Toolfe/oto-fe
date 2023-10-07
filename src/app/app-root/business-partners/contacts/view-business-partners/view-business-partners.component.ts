import { Component, Inject, OnInit } from '@angular/core';
import { BusinessPartnersService } from '../../../setup-service/business-partners/business-partners.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewPartnerDataDialogComponent } from '../view-partner-details/view-partner-detail-component';
import { NotifierService } from 'src/app/notification/service/notifier.service';


@Component({
  selector: 'app-view-business-partners',
  templateUrl: './view-business-partners.component.html',
  styleUrls: ['./view-business-partners.component.scss'],

})
export class ViewBusinessPartnersComponent implements OnInit {
  $businessPartner: any[] = [];
  getPartner: any;
  categories: any;
  selectedCategory: any;
  businessPartner$: void | undefined;

  constructor(
    private businessPartnersService: BusinessPartnersService ,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {}

  ngOnInit(): void {
  
  }

  openDialog(viewdata: any): void {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = '600px';
    dialogConfig.maxHeight = '600px';
  
    dialogConfig.data = viewdata[0];
  
    dialogConfig.disableClose = true;
  
    const dialogRef = this.dialog.open(ViewPartnerDataDialogComponent, dialogConfig);
  }
  
}