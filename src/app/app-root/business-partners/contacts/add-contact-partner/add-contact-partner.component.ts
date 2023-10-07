import { Component , Inject, OnInit,} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CategoryService } from 'src/app/app-root/setup-service/business-contact-setup/business-category/business-category.service';
import { SubCategoryService } from 'src/app/app-root/setup-service/business-contact-setup/sub-category/sub-category.service';
import { BusinessPartnersService } from 'src/app/app-root/setup-service/business-partners/business-partners.service';
import { ContactCategoryService } from 'src/app/app-root/setup-service/contact-setup/category/category.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { first } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewPartnerDataDialogComponent } from '../view-partner-details/view-partner-detail-component';
import { EditComponent } from '../edit/edit.component';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { AddBusinessPartnerComponent } from '../add-business-partner/add-business-partner.component';

interface ExampleFlatNode {
  id: number;
  expandable: boolean;
  name: string;
  code: string;
  subCategoryName: string;
  address: string;
  type: string;
  businessPartners: any;
  level: number;
}

@Component({
  selector: 'app-add-contact-partner',
  templateUrl: './add-contact-partner.component.html',
  styleUrls: ['./add-contact-partner.component.scss']
})
export class AddContactPartnerComponent implements OnInit {
  category$ = this.category.category$;
  subcategory$ = this.subcategory.subcategory$;
  partnerBrand$ = this.partner.partner$;
  contactFunctionality$ = this.partner.contactFunctionality$;

  firstCategoryId: number = 0;
  element: any;

  // resCategories!: Subscription
  loading!: boolean;
  i: any = 0;
  categories: any[] = []; //Resposne Data from Contact Setup
  formFields: any[] = [];

  partnerCode: any[] = [];
  links = this.categories;
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  selectedCategoryIndex: number = 0;
  selectedCategoryId: number = 0;
  contactForm!: FormGroup;
  subBusinessPartnerForm!: FormGroup;
  partnerCodeForm!: FormGroup;

  selectedCategory: any;
  partners: any[] = [];
  userRoleAccess: any;
  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;
  individualContact: any;


  cat: any;
  datavalues: any[] = [];
  public partnerForm: FormGroup = this.fb.group({
    setup: this.fb.group({
      id: sessionStorage.getItem('orgId'),
    })
  });

  businessPartner: boolean = false;


  //new view 

  $businessPartner: any[] = [];
  getPartner: any;
  businessPartner$: void | undefined;
  categoryId: any;



  constructor(
    private category: CategoryService,
    private subcategory: SubCategoryService,
    private partner: ContactCategoryService,
    private notification: NotifierService,
    private fb: FormBuilder,
    private businessPartnersService: BusinessPartnersService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.userRoleAccess = CommonMethods.userContext();
  }

  //new view 
  displayedColumns: string[] = ['name', 'subCategoryName', 'contactCategory', 'ContactFunctionality', 'email', 'mobileNumber', 'action'];

  private transformer = (node: any, level: number) => {
    return {
      expandable: node.expandable,
      id: node.id,
      type: node.type,
      code: node.code,
      name: node.name,
      subCategoryName: node.subCategoryName,
      email: node.email,
      mobileNumber: node.phone,
      contactCategory: node.categoryName,
      ContactFunctionality: node.functionalityName,
      address: node.address,
      businessPartners: node.businessPartners,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener: any = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.businessPartners
  );

  dataSource: any = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  ngOnInit(): void {
    this.category$.pipe(first()).subscribe((categories: any[]) => {

      if (categories && categories.length > 0) {
        this.firstCategoryId = categories[0].id;
        this.getBusinessPartner(this.firstCategoryId);
        this.onCategorySelect(this.firstCategoryId);
      }
    });
  }

  onCategorySelect(id: number) {
    this.categoryId = id;
    this.subcategory$ = this.subcategory.getSubCategoryList(id);
    this.getBusinessPartner(id);
  }


  onClick(id: number, category: any) {
    this.i = id;
    this.selectedCategory = category;
    this.formFields = category.businessPartnerCategoryFields;
  }


  //new view listing 

  addNew() {
    const datas = {
      categoryId: this.categoryId,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = datas;
    const dialogRef = this.dialog.open(AddBusinessPartnerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  addContact(data: any) {
    const individualContact = {
      businessPartnerId: data.id,
      businessCategoryId: this.categoryId,
      addContact: true,
    }
    this.dialog.open(EditComponent, {
      data: individualContact,
      disableClose: true,
    }).afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

  }


  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'department', permision);
  }

  getBusinessPartner(id: number) {
    this.businessPartnersService.getPartner(id).subscribe(
      (businessPartner) => {
        this.dataSource.data = businessPartner.data;
        console.log(this.dataSource.data, 'dataSource.data');
        return this.dataSource.data;
      },
      (error) => {
        console.error('Error fetching business partners:', error);
      }
    );
  }


  // filterTree(filterText: any) {
  //   return this.dataSource.data = this.getPartner().pipe(map(businessPartner => {
  //     return this.dataSource.data = businessPartner.filter((partner: any) => partner.name.toLowerCase().match(filterText.value) || partner.name.toUpperCase().match(filterText.value))
  //   }))
  // }

  applyFilter(filterText: any) {
    // this.filterTree(filterText);
    // if (filterText.value) {
    //   this.treeControl.expandAll();
    // } else {
    //   this.treeControl.collapseAll();
    // }
  }
  viewData(data: any) {
    data.category = this.categoryId;
    this.businessPartnersService.getPartnervalues(data).subscribe(
      (businessPartner) => {
        const viewdata = businessPartner.data;
        console.log(viewdata, 'viewdata');
        this.openDialog(viewdata);
      },
      (error) => {
        console.error('Error fetching business partners:', error);
      }
    );
  }

  openDialog(viewdata: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '600px';
    dialogConfig.maxHeight = '600px';

    dialogConfig.data = viewdata[0];

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(ViewPartnerDataDialogComponent, dialogConfig);
  }





  editData(data: any) {
    data.category = this.categoryId;
    this.businessPartnersService.getPartnervalues(data).subscribe(
      (businessPartner) => {
        const editData = businessPartner.data;
        console.log(editData, 'viewdata');
        this.openEditDialog(editData);
      },
      (error) => {
        console.error('Error fetching business partners:', error);
      }
    );
  }

  openEditDialog(editData: any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      // Pass the data to the dialog
      data: editData[0], disableClose: true

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }



  editContact(datas: any) {
    this.businessPartnersService.getIndividualContact(datas.id).subscribe(
      (res) => {
        const data = res.data;
        const individualContact = {
          businessCategoryId: this.categoryId,
          addContact: true,
          businessPartnerId: data[0].businessPartnerId,
          contactData: data,
        };
        this.dialog.open(EditComponent, {
          data: individualContact,
          disableClose: true,
        }).afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
      },
      (error) => {
        console.error('Error occurred while fetching contact data:', error);
      }
    );
  }

  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.businessPartnersService.deleteBusinessPartner(data.id).subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.openSnackBar('Business Partner Deleted Successfully', 1);
            } else this.notification.openSnackBar('Failed to Delete Business Partner', 1);
            return;
          },
        );
      }
    })
  }

  deleteContact(data: any) {
    this.businessPartnersService.deleteContact(data.id).subscribe(
      (res: any) => {
        if (res.success) {
          this.notification.openSnackBar('Contact Deleted Successfully', 1);
        } else this.notification.openSnackBar('Failed to Delete Contact', 1);
        return;
      },
    );
  }
}