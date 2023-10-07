import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { shareReplay } from 'rxjs/operators';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { DivisionService } from 'src/app/app-root/setup-service/org-setup/division/division.service';
import { LocationService } from 'src/app/app-root/setup-service/org-setup/location/location.service';
import { SubDeptService } from 'src/app/app-root/setup-service/org-setup/sub-dept/sub-dept.service';
import { UnitService } from 'src/app/app-root/setup-service/org-setup/unit/unit.service';
import { ProfileService } from 'src/app/app-root/setup-service/role-setup/profiles/profile.service';
import { RolesService } from 'src/app/app-root/setup-service/role-setup/roles/roles.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from '../roles.model';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';



@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss'],

})


export class AddRolesComponent implements OnInit {
  @ViewChild('location') locSelect!: MatSelect;
  @ViewChild('division') divSelect!: MatSelect;
  @ViewChild('unit') unitSelect!: MatSelect;
  @ViewChild('department') deptSelect!: MatSelect;
  allSelectedLocation = false;
  allSelecteddivision = false;
  allSelectedUnit = false;
  allSelecteddepartment = false;

  profiles$ = this.profile.profile$.pipe(shareReplay());
  location$ = this.locations.location$.pipe(shareReplay());
  division$ = this.divisions.division$.pipe(shareReplay());
  unit$ = this.units.unit$.pipe(shareReplay());
  department$ = this.departments.department$.pipe(shareReplay());
  subDepartment$ = this.subdepartment.subDept$.pipe(shareReplay());





  searchProfile!: string;
  profiles: any[] = [];
  update!: boolean;
  tempProfile: any = {};
  $profile: any;
  filter: any;

  orgScreen: any;
  rolesForm: any = FormGroup;

  ischecked: boolean = false;
  checkAllTrades: boolean = false;
  selected: any[] = [];
  selectedValue!: boolean;
  checked: any;


  selectedLocation!: boolean;
  selectedDivision!: boolean;
  selectedunit!: boolean;
  selectedDepartment!: boolean;

  orgLocation: any[] = [];
  orgDivision: any[] = [];
  orgUnit: any[] = [];
  orgDepartment: any[] = [];


  divi: any;

  location: any[] = [
    { id: 'locations', title: 'Location', screens: this.orgLocation },
  ];

  division: any[] = [
    { id: 'divisions', title: 'Division', screens: this.orgDivision, },
  ];


  unit: any[] = [
    { id: 'units', title: 'Unit', screens: this.orgUnit, },
  ];

  department: any[] = [
    { id: 'departments', title: 'Department', screens: this.orgDepartment, },
  ];
  last_selection: any = null;
  constructor(private fb: FormBuilder,
    private profile: ProfileService,
    private locations: LocationService,
    private divisions: DivisionService,
    private units: UnitService,
    private departments: DeptService,
    private subdepartment: SubDeptService,
    private service: RolesService,
    private notification: NotifierService,
    @Inject(MAT_DIALOG_DATA) public data: Roles,
    public dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
    this.divisions.getDivision().subscribe(res => {
      this.divi = res.content
    })
    // this.location$.subscribe(data => {
    //   this.location.forEach((element: any) => {
    //     element.screens = data
    //   })
    // })
    // this.division$.subscribe(data => {
    //   this.division.forEach((element: any) => {
    //     element.screens = data
    //   })
    // }
    // )
    // this.unit$.subscribe(data => {
    //   this.unit.forEach((element: any) => {
    //     element.screens = data
    //   })
    // })
    // this.department$.subscribe(data => {
    //   this.department.forEach((element: any) => {
    //     element.screens = data
    //   })
    // })

    this.rolesForm = this.fb.group({
      name: [],
      profiles: [],
      createdBy: sessionStorage.getItem('id'),
      modifiedBy: sessionStorage.getItem('id'),
      setup: this.fb.group({
        id: sessionStorage.getItem('orgId'),
      }),
      active: true,

      divisions: [],
      locations: [],
      units: [],
      departments: [],
    })
    if (this.data != null) {
      this.update = true;
      this.editData()
    }

  }

  toggleAllLocation() {
    if (this.allSelectedLocation) {
      this.locSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.locSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }

  toggleAllDivision() {
    if (this.allSelecteddivision) {
      this.divSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.divSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }

  toggleAllUnit() {
    if (this.allSelectedUnit) {
      this.unitSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.unitSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }

  toggleAllDepartment() {
    if (this.allSelecteddepartment) {
      this.deptSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.deptSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }



  optionLocationClick() {
    let newLocation = true;
    this.locSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newLocation = false;
      }
    });
    this.allSelectedLocation = newLocation;

  }

  optionDivisionClick() {
    let newDivision = true;
    this.divSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newDivision = false;
      }
    });
    this.allSelecteddivision = newDivision;
  }

  optionUnitClick() {
    let newUnit = true;
    this.unitSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newUnit = false;
      }
    });
    this.allSelectedUnit = newUnit;
  }

  optionDepartmentClick() {
    let newDepartment = true;
    this.deptSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newDepartment = false;
      }
    });
    this.allSelecteddepartment = newDepartment;
  }



  onchangeLocation(id: any, event: any) {
    const rolesFormArray = <FormArray>this.rolesForm.controls.locations;
    const _id = id['id'];
    if (event.target.checked) {
      rolesFormArray.push(new FormControl({ id: _id }))
    } else {
      let index = rolesFormArray.controls.findIndex(x => x.value.id == _id);
      rolesFormArray.removeAt(index);
    }
  }
  onchangeDivision(id: any, event: any) {
    const rolesFormArray = <FormArray>this.rolesForm.controls.divisions;
    const _id = id['id'];
    if (event.target.checked) {
      rolesFormArray.push(new FormControl({ id: _id }))
    } else {
      let index = rolesFormArray.controls.findIndex(x => x.value.id == _id);
      rolesFormArray.removeAt(index);
    }
  }
  onchangeUnit(id: any, event: any) {
    const rolesFormArray = <FormArray>this.rolesForm.controls.units;
    const _id = id['id'];
    if (event.target.checked) {
      rolesFormArray.push(new FormControl({ id: _id }))
    } else {
      let index = rolesFormArray.controls.findIndex(x => x.value.id == _id);
      rolesFormArray.removeAt(index);
    }
  }
  onchangeDepartment(id: any, event: any) {
    const rolesFormArray = <FormArray>this.rolesForm.controls.departments;
    const _id = id['id'];
    if (event.target.checked) {
      rolesFormArray.push(new FormControl({ id: _id }))
    } else {
      let index = rolesFormArray.controls.findIndex(x => x.value.id == _id);
      rolesFormArray.removeAt(index);
    }
  }


  selectAll(event: any, module: any) {
    if (module.id === 'locations') {
      this.selectedLocation = event.target.checked;
      const locationFormArray = <FormArray>this.rolesForm.controls.locations;
      if (event.target.checked) {
        module.screens.forEach((element: any) => {
          locationFormArray.push((new FormControl({ id: element.id })))
        })
      } else {
        module.screens.forEach((element: any) => {
          let index = locationFormArray.controls.findIndex(x => x.value.id == element.id);
          locationFormArray.removeAt(index);
        })
      }
    }
    if (module.id === 'divisions') {
      this.selectedDivision = event.target.checked;
      const divisionFormArray = <FormArray>this.rolesForm.controls.divisions;
      if (event.target.checked) {
        module.screens.forEach((element: any) => {
          divisionFormArray.push((new FormControl({ id: element.id })))
        })
      } else {
        module.screens.forEach((element: any) => {
          let index = divisionFormArray.controls.findIndex(x => x.value.id == element.id);
          divisionFormArray.removeAt(index);
        })
      }
    }
    if (module.id === 'units') {
      this.selectedunit = event.target.checked;
      const unitFormArray = <FormArray>this.rolesForm.controls.units;
      if (event.target.checked) {
        module.screens.forEach((element: any) => {
          unitFormArray.push((new FormControl({ id: element.id })))
        })
      } else {
        module.screens.forEach((element: any) => {
          let index = unitFormArray.controls.findIndex(x => x.value.id == element.id);
          unitFormArray.removeAt(index);
        })
      }
    }
    if (module.id === 'departments') {
      this.selectedDepartment = event.target.checked;
      const departmentFormArray = <FormArray>this.rolesForm.controls.departments;
      if (event.target.checked) {
        module.screens.forEach((element: any) => {
          departmentFormArray.push((new FormControl({ id: element.id })))
        })
      } else {
        module.screens.forEach((element: any) => {
          let index = departmentFormArray.controls.findIndex(x => x.value.id == element.id);
          departmentFormArray.removeAt(index);
        })
      }
    }


  }

  getProfile(profile: any) {
    this.searchProfile = profile.value;
  }
  getProfileId(data: any) {
    this.tempProfile.id = data.id;
  }
  selectedProfile(profile: any) {
    this.profiles.push(profile);

  }

  editData() {
    this.service.viewRoles(this.data.id).subscribe((res) => {
      if (res.success = true) {
        this.rolesForm.patchValue({
          name: this.data.name,
          profiles: res.data.profiles,
          locations: res.data.locations,
          divisions: res.data.divisions,
          units: res.data.units,
          departments: res.data.departments,
        })
      }
    });
  }



  updateRole() {
    if (this.rolesForm.valid == true) {
      this.rolesForm.value.id = this.data.id

      this.service.postrole(this.rolesForm.value).subscribe((res: Roles) => {
        this.dialogRef.close('done');
        this.notification.openSnackBar(' Updated Successfully', 1);

      })
    } else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0);
    }

  }

  public addItem() {
    if (this.rolesForm.valid == true) {
      let dataRow = this.rolesForm.value;
      // dataRow.profiles=CommonMethods.returnId(dataRow.profiles);
      // dataRow.locations=CommonMethods.returnId(dataRow.locations);
      // dataRow.divisions=CommonMethods.returnId(dataRow.divisions);
      // dataRow.units=CommonMethods.returnId(dataRow.units);
      // dataRow.departments=CommonMethods.returnId(dataRow.departments); 
      this.service.postrole(dataRow).subscribe((data: any) => {

        this.dialogRef.close('done')
        this.notification.openSnackBar("Role added successfully", 1);

      })

    } else {
      this.notification.openSnackBar('Please All required fields to continue', 0)
    }

  }



}
