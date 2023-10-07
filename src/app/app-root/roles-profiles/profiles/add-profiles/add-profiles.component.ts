import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/app-root/setup-service/role-setup/profiles/profile.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Profiles } from '../profile.model';


export class Profile {
  profileName: any='';

}
@Component({
  selector: 'app-add-profiles',
  templateUrl: './add-profiles.component.html',
  styleUrls: ['./add-profiles.component.scss']
})


export class AddProfilesComponent implements OnInit {
  expandedIndex = 0;
  profileForm: any = FormGroup;
  update: boolean = false;
  allSelected = false;
  profileName!: Profile
  ischecked: boolean = false;
  checkAllTrades: boolean = false;
  selected: any[] = [];
  selectedValue!: boolean;
  checked: any;

  permissions: any = {
    creation: [false],
    selection: [false],
    updation: [false],
    deletion: [false],
  }

  
  editpermissions: any = [{
    creation: false,
    selection: false,
    updation: false,
    deletion: false,
  }
]
  rolesProfiles = this.editpermissions;
  org = this.editpermissions;
  contact = this.editpermissions;
  employee = this.editpermissions;
  taskMaster = this.editpermissions;
  partner = this.editpermissions;
  assign = this.editpermissions;
  project = this.editpermissions;
  docMaster = this.editpermissions;
  tms = this.editpermissions;
  dms = this.editpermissions;
  
  rolesScreens: any[] = [
    { id: 'profile', title: 'Profiles', selected: this.permissions },
    { id: 'role', title: 'Roles', selected: this.permissions },
  ]
  rolesProfilesModule: any[] = [
    { id: 'rolesProfilesModule', title: 'Roles And Profiles', screens: this.rolesScreens, },
  ];

  orgScreens: any[] = [

    { id: 'basicInfo', title: 'Basic Info', selected: this.permissions },
    { id: 'location', title: 'Location', selected: this.permissions },
    { id: 'division', title: 'Division', selected: this.permissions },
    { id: 'unit', title: 'Unit', selected: this.permissions },
    { id: 'department', title: 'Department', selected: this.permissions },
    { id: 'subDepartment', title: 'Sub department', selected: this.permissions },
    { id: 'employeeGroup', title: 'Employee Group', selected: this.permissions },
    { id: 'employeeCategory', title: 'Employee Category', selected: this.permissions },
    { id: 'employeeType', title: 'Employee Type', selected: this.permissions },
    { id: 'workingGroup', title: 'Working Group', selected: this.permissions },
    { id: 'qualification', title: 'Qualification', selected: this.permissions },
    { id: 'skillSet', title: 'Skill Set', selected: this.permissions },
    { id: 'industrySpecificSkills', title: 'Industry Specific Skills', selected: this.permissions },
    { id: 'language', title: 'Language', selected: this.permissions },
    { id: 'company', title: 'Company', selected: this.permissions },
    { id: 'industry', title: 'Industry', selected: this.permissions },
    { id: 'designation', title: 'Designation', selected: this.permissions },
    { id: 'workProcess', title: 'Work Process', selected: this.permissions },
    { id: 'resource', title: 'Resource', selected: this.permissions },
    { id: 'uoms', title: 'Uoms', selected: this.permissions },

  ];
  orgModule: any[] = [
    { id: 'organizationModule', title: 'Organization Setup', screens: this.orgScreens, },
  ];


  contactScreens: any[] = [
    { id: 'contactCategory', title: 'Contact Category', selected: this.permissions },
    { id: 'contactSubCategory', title: 'Contact Sub Category', selected: this.permissions },
    { id: 'contactType1', title: 'Contact Type 1', selected: this.permissions },
    { id: 'contacType2', title: 'Contact Type 2', selected: this.permissions },
    { id: 'functionality', title: 'Functionality', selected: this.permissions },


  ]
  contactModule: any[] = [
    { id: 'contactModule', title: 'Contact Setup', screens: this.contactScreens, },
  ];


  taskMasterScreens: any[] = [

    { id: 'type', title: 'Type', selected: this.permissions },
    { id: 'group', title: 'Group', selected: this.permissions },
    { id: 'kpi', title: 'Kpi', selected: this.permissions },
    { id: 'priority', title: 'Priority', selected: this.permissions },
    { id: 'expectation', title: 'Expectation', selected: this.permissions },
    { id: 'scale', title: 'Scale', selected: this.permissions },
    { id: 'rating', title: 'Rating', selected: this.permissions },
    { id: 'status', title: 'Status', selected: this.permissions },

  ];

  taskMasterModule: any[] = [
    { id: 'taskMasterModule', title: 'Task Master Setup', screens: this.taskMasterScreens, },
  ];

  employeeScreens: any[] = [
    { id: 'employeeDetails', title: 'Employee Details', selected: this.permissions },
  ]

  employeeModule: any[] = [
    { id: 'employeeModule', title: 'Employee Setup', screens: this.employeeScreens, },
  ];

  assignScreens: any[] = [
    { id: 'assignDetails', title: 'Assign Details', selected: this.permissions },
  ]

  assignModule: any[] = [
    { id: 'assignModule', title: 'Assign Setup', screens: this.assignScreens, },
  ];

  partnerScreens: any[] = [
    { id: 'businessPartner', title: 'Business Partner Details', selected: this.permissions },
  ]
  partnerModule: any[] = [
    { id: 'businessPartnerModule', title: 'Business Partner Setup', screens: this.partnerScreens, },
  ];

  projectScreens: any[] = [
    { id: 'project', title: 'Project Details', selected: this.permissions },
  ]

  projectModule: any[] = [
    { id: 'projectModule', title: 'Project Setup', screens: this.projectScreens, },
  ];


  docScreens: any[] = [
    { id: 'category', title: 'Category', selected: this.permissions },
    { id: 'type', title: 'Type', selected: this.permissions },
  ]
  docModule: any[] = [
    { id: 'documentMasterModule', title: 'Document Setup', screens: this.docScreens, },
  ];


  taskScreens: any[] = [
    { id: 'allTask', title: 'All Task', selected: this.permissions },
    { id: 'createdByMe', title: 'Created By Me', selected: this.permissions },
    { id: 'sharedWithMe', title: 'Shared With Me', selected: this.permissions },
    { id: 'saved', title: 'Saved', selected: this.permissions },
    { id: 'completed', title: 'Completed', selected: this.permissions },
    { id: 'ratings', title: 'My Ratings', selected: this.permissions },
  ]
  taskModule: any[] = [
    { id: 'taskManagementModule', title: 'Task Management', screens: this.taskScreens, },
  ];

  documentScreens: any[] = [
    { id: 'allFiles', title: 'All Files', selected: this.permissions },
    { id: 'sharedWithMe', title: 'Shared With Me', selected: this.permissions },
    { id: 'saved', title: 'saved', selected: this.permissions },
    { id: 'approval', title: 'Approval', selected: this.permissions },
    { id: 'trash', title: 'Trash', selected: this.permissions },

  ]


  documentModule: any[] = [
    { id: 'documentManagementModule', title: 'Document Management', screens: this.documentScreens, },
  ];







  constructor(private fb: FormBuilder,
    private router: Router,
    private service: ProfileService,
    private notification: NotifierService,
    @Inject(MAT_DIALOG_DATA) public data: Profiles
    
  ) {
  
   }


  ngOnInit(): void {
  
    this.data = history.state;
    this.profileForm = this.fb.group({
    
      profileName: [],
      active: true,
      rolesProfilesModule: this.fb.group({}),
      organizationModule: this.fb.group({}),
      contactModule: this.fb.group({}),
      taskMasterModule: this.fb.group({}),
      employeeModule: this.fb.group({}),
      assignModule: this.fb.group({}),
      businessPartnerModule: this.fb.group({}),
      projectModule: this.fb.group({}),
      documentMasterModule: this.fb.group({}),
      taskManagementModule: this.fb.group({}),
      documentManagementModule: this.fb.group({})

    })
    
    for (let i = 0; i < this.rolesScreens.length; i++) {
      this.profileForm.get('rolesProfilesModule')
        .addControl(
          this.rolesScreens[i].id, this.fb.group({
            creation: [false],
            selection: [false],
            updation: [false],
            deletion: [false],
          })
        )

    }
    for (let i = 0; i < this.orgScreens.length; i++) {
      this.profileForm.get('organizationModule')
        .addControl(
          this.orgScreens[i].id, this.fb.group({
            creation: [false],
            selection: [false],
            updation: [false],
            deletion: [false],
          })
        )

    }
    for (let i = 0; i < this.contactScreens.length; i++) {
      this.profileForm.get('contactModule').addControl(
        this.contactScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );
 

    }
    for (let i = 0; i < this.taskMasterScreens.length; i++) {
      this.profileForm.get('taskMasterModule').addControl(
        this.taskMasterScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );

    }
    for (let i = 0; i < this.employeeScreens.length; i++) {
      this.profileForm.get('employeeModule').addControl(
        this.employeeScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );

    }
    for (let i = 0; i < this.assignScreens.length; i++) {
      this.profileForm.get('assignModule').addControl(
        this.assignScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );

    }
    for (let i = 0; i < this.partnerScreens.length; i++) {
      this.profileForm.get('businessPartnerModule').addControl(
        this.partnerScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );

    }
    for (let i = 0; i < this.projectScreens.length; i++) {
      this.profileForm.get('projectModule').addControl(
        this.projectScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );

    }
    for (let i = 0; i < this.docScreens.length; i++) {
      this.profileForm.get('documentMasterModule').addControl(
        this.docScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );

    }
    for (let i = 0; i < this.taskScreens.length; i++) {
      this.profileForm.get('taskManagementModule').addControl(
        this.taskScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );

    }

    for (let i = 0; i < this.documentScreens.length; i++) {
      this.profileForm.get('documentManagementModule').addControl(
        this.documentScreens[i].id, this.fb.group({
          creation: [false],
          selection: [false],
          updation: [false],
          deletion: [false],
        })

      );

   
    }

    if(this.data.id){
      this.update = true;
      this.editData(this.data);
    }



    this.profileName = {
      profileName: 'Profile 1',
    }



  }


  toggleCheckboxAll(event: any, module: any, permission: string) {
    module.screens.map((screen: any) => {
      this.profileForm.get(module.id).get(screen.id).get(permission).patchValue(event.target.checked);
    });

  }


  singleCheckbox(event: any) {
    if (event.target.checked == true) {
      this.ischecked = true
    }

    if (this.ischecked && this.checkAllTrades) {
      event.target.checked = true
    }
  }

  check(event: MouseEvent,) {
    event.stopPropagation();
  }

  moduleValidation(data: any[]){


    const allCreationTrue = data.every(obj => Object.values(obj).every((val: any) => val.creation === true));
    const allSelectionTrue = data.every(obj => Object.values(obj).every((val: any) => val.selection === true));
    const allUpdationTrue = data.every(obj => Object.values(obj).every((val: any) => val.updation === true));
    const allDeletionTrue = data.every(obj => Object.values(obj).every((val: any) => val.deletion === true));
    
    return data  = [
      {
      creation : allCreationTrue,
      selection : allSelectionTrue,
      updation : allUpdationTrue,
      deletion : allDeletionTrue,
      }
    ]
  }


  editData(appData:any){
    this.profileForm.patchValue({
      profileName: appData.profileName
    });

console.log(this.profileForm);
  let profileData=appData.rolesProfilesModule;
  let orgData=appData.organizationModule;
  let contactData=appData.contactModule;
  let taskData=appData.taskMasterModule;
  let employeeData=appData.employeeModule;
  let assignData=appData.assignModule;
  let partnerData=appData.businessPartnerModule;
  let projectData=appData.projectModule;
  let docData=appData.documentMasterModule;
  let taskManagementData=appData.taskManagementModule;
  let documentManagementData=appData.documentManagementModule;
  
 
  this.rolesProfiles= this.moduleValidation([profileData]);
  this.org = this.moduleValidation([orgData]);
  this.contact = this.moduleValidation([contactData]);
  this.taskMaster = this.moduleValidation([taskData]);
  this.employee = this.moduleValidation([employeeData]);
  this.assign = this.moduleValidation([assignData]);
  this.partner = this.moduleValidation([partnerData]);
  this.project = this.moduleValidation([projectData]);
  this.docMaster = this.moduleValidation([docData]);
  this.tms = this.moduleValidation([taskManagementData]);
  this.dms = this.moduleValidation([documentManagementData]);

 this.rolesScreens.map((screen: any) => {
  this.profileForm.get('rolesProfilesModule').get(screen.id).patchValue({
    creation:profileData[screen.id].creation,
    selection:profileData[screen.id].selection,
    updation:profileData[screen.id].updation,
    deletion:profileData[screen.id].deletion,
  });
})

       this.orgScreens.map((screen: any) => {
        this.profileForm.get('organizationModule').get(screen.id).patchValue({
          creation:orgData[screen.id].creation,
          selection:orgData[screen.id].selection,
          updation:orgData[screen.id].updation,
          deletion:orgData[screen.id].deletion,
        });
      }) 

      this.contactScreens.map((screen: any) => {
        this.profileForm.get('contactModule').get(screen.id).patchValue({
          creation:contactData[screen.id].creation,
          selection:contactData[screen.id].selection,
          updation:contactData[screen.id].updation,
          deletion:contactData[screen.id].deletion,
        });
      }) 
      this.taskMasterScreens.map((screen: any) => {
        this.profileForm.get('taskMasterModule').get(screen.id).patchValue({
          creation:taskData[screen.id].creation,
          selection:taskData[screen.id].selection,
          updation:taskData[screen.id].updation,
          deletion:taskData[screen.id].deletion,
        });
      })
      this.employeeScreens.map((screen: any) => {
        this.profileForm.get('employeeModule').get(screen.id).patchValue({
          creation:employeeData[screen.id].creation,
          selection:employeeData[screen.id].selection,
          updation:employeeData[screen.id].updation,
          deletion:employeeData[screen.id].deletion,
        });
      })
      this.assignScreens.map((screen: any) => {
        this.profileForm.get('assignModule').get(screen.id).patchValue({
          creation:assignData[screen.id].creation,
          selection:assignData[screen.id].selection,
          updation:assignData[screen.id].updation,
          deletion:assignData[screen.id].deletion,
        });
      })
      this.partnerScreens.map((screen: any) => {
        this.profileForm.get('businessPartnerModule').get(screen.id).patchValue({
          creation:partnerData[screen.id].creation,
          selection:partnerData[screen.id].selection,
          updation:partnerData[screen.id].updation,
          deletion:partnerData[screen.id].deletion,
        });
      })
      this.projectScreens.map((screen: any) => {
        this.profileForm.get('projectModule').get(screen.id).patchValue({
          creation:projectData[screen.id].creation,
          selection:projectData[screen.id].selection,
          updation:projectData[screen.id].updation,
          deletion:projectData[screen.id].deletion,
        });
      })
      this.docScreens.map((screen: any) => {
        this.profileForm.get('documentMasterModule').get(screen.id).patchValue({
          creation:docData[screen.id].creation,
          selection:docData[screen.id].selection,
          updation:docData[screen.id].updation,
          deletion:docData[screen.id].deletion,
        });
      })
      this.taskScreens.map((screen: any) => {
        this.profileForm.get('taskManagementModule').get(screen.id).patchValue({
          creation:taskManagementData[screen.id].creation,
          selection:taskManagementData[screen.id].selection,
          updation:taskManagementData[screen.id].updation,
          deletion:taskManagementData[screen.id].deletion,
        });
      })
      this.documentScreens.map((screen: any) => {
        this.profileForm.get('documentManagementModule').get(screen.id).patchValue({
          creation:documentManagementData[screen.id].creation,
          selection:documentManagementData[screen.id].selection,
          updation:documentManagementData[screen.id].updation,
          deletion:documentManagementData[screen.id].deletion,
        });
      })
      this.moduleValidation([profileData]);

  }

  updateProfile() {

    let profileData=this.profileForm.value;
    // profileData.rolesProfilesModule=JSON.stringify(profileData.rolesProfilesModule);
    // profileData.organizationModule=JSON.stringify(profileData.organizationModule);
    // profileData.contactModule=JSON.stringify(profileData.contactModule);
    // profileData.taskMasterModule=JSON.stringify(profileData.taskMasterModule);
    // profileData.employeeModule=JSON.stringify(profileData.employeeModule);
    // profileData.assignModule=JSON.stringify(profileData.assignModule);
    // profileData.businessPartnerModule=JSON.stringify(profileData.businessPartnerModule);
    // profileData.projectModule=JSON.stringify(profileData.projectModule);
    // profileData.documentMasterModule=JSON.stringify(profileData.documentMasterModule);
    // profileData.taskManagementModule=JSON.stringify(profileData.taskManagementModule);
    // profileData.documentManagementModule=JSON.stringify(profileData.documentManagementModule);
    profileData.id=this.data.id;

   this.service.postProfile(profileData).subscribe(res=>{
       this.notification.openSnackBar('update successfully', 1);
   })

  }



  public addItem() {
    if (this.profileForm.valid == true) {
      let dataRow=this.profileForm.value;
      // dataRow.rolesProfilesModule=JSON.stringify(this.profileForm.value.rolesProfilesModule);
      // dataRow.organizationModule=JSON.stringify(this.profileForm.value.organizationModule);
      // dataRow.contactModule=JSON.stringify(this.profileForm.value.contactModule);
      // dataRow.taskMasterModule=JSON.stringify(this.profileForm.value.taskMasterModule);
      // dataRow.employeeModule=JSON.stringify(this.profileForm.value.employeeModule);
      // dataRow.assignModule=JSON.stringify(this.profileForm.value.assignModule);
      // dataRow.businessPartnerModule=JSON.stringify(this.profileForm.value.businessPartnerModule);
      // dataRow.projectModule=JSON.stringify(this.profileForm.value.projectModule);
      // dataRow.documentMasterModule=JSON.stringify(this.profileForm.value.documentMasterModule);
      // dataRow.taskManagementModule=JSON.stringify(this.profileForm.value.taskManagementModule);
      // dataRow.documentManagementModule=JSON.stringify(this.profileForm.value.documentManagementModule);

      this.service.postProfile(dataRow).subscribe(res => {
        this.notification.openSnackBar('Profile Created Successfully', 1);
        this.profileForm.reset();
        this.router.navigate(['/setup/roles-profile']);
      })

    } else {
      this.notification.openSnackBar('Please fill  the required field', 2);
    }
  }

  backBtn() {
    this.router.navigate(['/setup/roles-profile']);
  }


}
