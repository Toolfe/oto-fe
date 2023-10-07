import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { shareReplay } from 'rxjs/operators';
import { DocTypeService } from 'src/app/app-root/setup-service/doc-master-setup/type/type.service';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { EmpGroupService } from 'src/app/app-root/setup-service/org-setup/emp-group/emp-group.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { ReplaceComponent } from '../options/replace/replace.component';
import { DocumentService } from '../service/document-service/document.service';
import { FolderService } from '../service/folder-service/folder.service';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { DesignationService } from 'src/app/app-root/setup-service/org-setup/designation/designation.service';
import { DivisionService } from 'src/app/app-root/setup-service/org-setup/division/division.service';
import { IndustryService } from 'src/app/app-root/setup-service/org-setup/industry/industry.service';
import { LanguagesService } from 'src/app/app-root/setup-service/org-setup/languages/languages.service';
import { LocationService } from 'src/app/app-root/setup-service/org-setup/location/location.service';
import { QualificationService } from 'src/app/app-root/setup-service/org-setup/qualification/qualification.service';
import { ResourceService } from 'src/app/app-root/setup-service/org-setup/resource/resource.service';
import { SubDeptService } from 'src/app/app-root/setup-service/org-setup/sub-dept/sub-dept.service';
import { UnitService } from 'src/app/app-root/setup-service/org-setup/unit/unit.service';
import { UomService } from 'src/app/app-root/setup-service/org-setup/uom/uom.service';
import { WorkingGroupService } from 'src/app/app-root/setup-service/org-setup/working-group/working-group.service';
import { BasicInfoService } from 'src/app/app-root/setup-service/org-setup/basic-info/basic-info.service';
import { CompanyService } from 'src/app/app-root/setup-service/org-setup/company/company.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from "@angular/common/http";
@Component({
  selector: 'app-create-doc',
  templateUrl: './create-doc.component.html',
  styleUrls: ['./create-doc.component.scss'],
})


export class CreateDocComponent implements OnInit {
  fileUploadForm: any = FormGroup;
  docFields: any = FormGroup;
  selectedFile!: File;
  docSize!: number;
  currentUser: any = CommonMethods.userId;
  formFields: any = [];
  selectedFiles: any = [] ;
  employees$ = this.empService.employees$.pipe(shareReplay());
  employeeGroup$ = this.empGroup.employeeGroup$.pipe(shareReplay());
  docType$ = this.docType.docType$.pipe(shareReplay());

  @ViewChild('fileInput')
  inputFile!: ElementRef;
  constructor(private fb: FormBuilder,
    private service: DocumentService,
    private folderService: FolderService,
    private empService: EmployeeService,
    private empGroup: EmpGroupService,
    private docType: DocTypeService,
    private dialog: MatDialog,
    private dialogref: MatDialogRef<CreateDocComponent>,
    private deptService: DeptService,
    private designationService: DesignationService,
    private divisionService: DivisionService,
    private industryService: IndustryService,
    private languageService: LanguagesService,
    private locationService: LocationService,
    private qualificationService: QualificationService,
    private resourceService: ResourceService,
    private subdeptService: SubDeptService,
    private unitService: UnitService,
    private uomService: UomService,
    private workinggroupService: WorkingGroupService,
    private addressService: BasicInfoService,
    private companyService: CompanyService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: String) { }


  ngOnInit(): void {
    this.fileUploadForm = this.fb.group({
      documentType: [],
      sharedWith: [],
      tagsFrom: this.fb.group({
        tags: [],
      }),
      // tags:[],
      users: [],
      userGroups: [],
      permission: this.fb.group({
        viewPermission: [],
        editPermission: [],
        deletePermission: []
      }),
      approvalRequired: [],
      numberOfApproval: [],
      approvalFrom1: this.fb.group({
        id: []
      }),
      approvalFrom2: this.fb.group({
        id: []
      }),
      approvalFrom3: this.fb.group({
        id: []
      }),
      approval1Status: [],
      approval2Status: [],
      approval3Status: []
    })
    this.fileUploadForm.get('numberOfApproval').patchValue(0);
  }


  uploadFile(event: any) {

    let size = this.docSize * 1024;
    let file = event.target.files[0];

    if (this.docSize) {

      if (file.size <= size) {
        this.selectedFile = event.target.files[0];
      } else {
        this.inputFile.nativeElement.value = "";
        alert("File size exceeds the limit");
      }
    } else {
      alert("Please select your Document Type");
      this.inputFile.nativeElement.value = "";
    }
  }

  onFileUpload() {
    let data: any = {};
    let approval: any = {};
    let employee: any = {};
    let obj: any = {};
    let documentType: any = {};
    data = this.fileUploadForm.value;

    //Document Type
    if (data.documentType != 'null') {
      documentType.id = this.fileUploadForm.value.documentType;
      data.documentType = documentType;
    } else {
      data.documentType = null;
    }

    //File sharing with employees
    if (data.sharedWith == 1) {
      let arr: any[] = [];
      arr = CommonMethods.returnId(data.users);
      data.shareWithUser = arr.map((element: any) => {
        let userObj: any = {};
        userObj.user = element;
        userObj.saved = false;
        userObj.trash = false;
        userObj.permission = data.permission;
        return userObj;
      })

    } else {
      data.shareWithUser = null;
    }

    //File sharing with employee groups
    if (data.sharedWith == 2) {

      let arr: any[] = [];
      arr = CommonMethods.returnId(data.userGroups);
      data.shareWithUserGroup = arr.map((element: any) => {
        let groupObj: any = {};
        groupObj.userGroup = element;
        groupObj.saved = false;
        groupObj.trash = false;
        groupObj.permission = data.permission;
        return groupObj;
      })
    } else {
      data.shareWithUserGroup = null;
    }

    //File approval
    if (data.approvalRequired) {
      if (!data.approvalFrom1.id) {
        data.approvalFrom1 = null;
      }
      if (!data.approvalFrom2.id) {
        data.approvalFrom2 = null;
      }
      if (!data.approvalFrom3.id) {
        data.approvalFrom3 = null;
      }
      approval.approvalFrom1 = data.approvalFrom1;
      approval.approvalFrom2 = data.approvalFrom2;
      approval.approvalFrom3 = data.approvalFrom3;
      approval.approval1Status = data.approval1Status;
      approval.approval2Status = data.approval2Status;
      approval.approval3Status = data.approval3Status;
      data.fileApproval = approval;
    } else {
      data.fileApproval = null;
    }
    data.trash = false;
    data.saved = false;
    data.docFields = JSON.stringify(this.docFields.value);
    data.sharedWithMe = false;
    employee.id = sessionStorage.getItem('id');
    data.createdBy = employee;
    data.modifiedBy = employee;
    data.active = true;


    let folder: any = {};
    folder.id = sessionStorage.getItem('selectedFolder');
    obj.folder = folder;

    this.service.onUploadDoc(data, this.selectedFile, obj).subscribe(data => {
      this.dialogref.close(data);
      if (this.data == 'reload') {
        window.location.reload();
      }
    });


  }

  onSubmit() {
    if (this.selectedFile) {
      let flag = 0;
      this.folderService.getFolderFiles(sessionStorage.getItem('selectedFolder')).subscribe(data => {
        if (data) {
          data.forEach((element: any) => {
            if (element.fileName == this.selectedFile.name) {
              flag = 1;
            }
          })
          if (flag == 1) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            let confirmDelete = this.dialog.open(ReplaceComponent, dialogConfig);
            confirmDelete.afterClosed().subscribe(result => {
              if (result == true) {
                this.onFileUpload();
              }
            })
          } else {
            this.onFileUpload();
          }
        } else {
          this.onFileUpload();
        }
      });
    } else {
      alert('Please select a file');
    }
  }


  keywords: any = new Set([]);
  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.keywords.delete(keyword);
  }

  dropdownChange(type: any) {

    this.fileUploadForm.get('documentType').setValue(type.id);
    this.docSize = type.size;


    this.formFields = JSON.parse(type.customFields);
    console.log(this.formFields);
    this.docFields = this.fb.group({});
    for (let i = 0; i < this.formFields.length; i++) {
      this.docFields.addControl(this.formFields[i].name, new FormControl(''));
    }

  }


  currentControl(reference: any): any {
    switch (reference) {
      case 'address':
        return this.addressService.address$;
      case 'company':
        return this.companyService.company$;
      case 'department':
        return this.deptService.department$;
      case 'designation':
        return this.designationService.designation$;
      case 'division':
        return this.divisionService.division$;
      case 'employee':
        return this.empService.employee$;
      case 'industry':
        return this.industryService.industry$;
      case 'language':
        return this.languageService.language$;
      case 'location':
        return this.locationService.location$;
      case 'qualification':
        return this.qualificationService.qualification$;
      case 'resource':
        return this.resourceService.resource$;
      case 'sub_department':
        return this.subdeptService.subDept$;
      case 'unit':
        return this.unitService.unit$;
      case 'uom':
        return this.uomService.uom$;
      case 'working_group':
        return this.workinggroupService.workinggroup$;
      default:

        break;
    }
  }


  dropFiles(ev: any) {
    // Prevent default behavior(file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          let file = ev.dataTransfer.items[i].getAsFile();
          let obj = {
            fileName: file.name,
            selectedFile: file,
            fileId: `${file.name}-${file.lastModified}`,
            uploadCompleted: false
          }
          this.selectedFiles.push(obj);
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
      this.selectedFiles.forEach((file: any) => this.getFileUploadStatus(file));
    } else {

      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
  }

  dragOverHandler(ev: any) {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    ev.stopPropagation();
  }



  getFileUploadStatus(file : any){
    // fetch the file status on upload
    let headers = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      'name': file.fileName
    });

    this.http
      .get("http://localhost:2005/otoboxapi/status", { headers: headers }).subscribe(
        (res: any) => {
          file.uploadedBytes = res.uploaded;
          file.uploadedPercent = Math.round(100* file.uploadedBytes/file.selectedFile.size);
          if(file.uploadedPercent >= 100){
            file.uploadCompleted = true;
          }
        },(err: any) => {
          console.log(err);
        }
      )
  }

  uploadFiles(){
    this.selectedFiles.forEach((file: { uploadedPercent: number; }) => {
      if(file.uploadedPercent < 100)
        this.resumeUpload(file);
    })
  }

  resumeUpload(file : any){
    //make upload call and update the file percentage
    const headers2 = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      "x-start-byte": file.uploadedBytes.toString(),
      'name': file.fileName
    });
    console.log(file.uploadedBytes, file.selectedFile.size, file.selectedFile.slice(file.uploadedBytes).size);

    const req = new HttpRequest('POST', "http://localhost:2005/otoboxapi/upload-1", file.selectedFile.slice(file.uploadedBytes, file.selectedFile.size + 1),{
           headers: headers2,
          reportProgress: true //this will give us percentage of file uploaded
        });

    this.http.request(req).subscribe(
      (res: any) => {

        if(res.type === HttpEventType.UploadProgress){
          console.log("-----------------------------------------------");
          console.log(res);
          file.uploadedPercent = Math.round(100* (file.uploadedBytes+res.loaded)/res.total);
          // Remember, reportProgress: true  (res.loaded and res.total) are returned by it while upload is in progress


          console.log(file.uploadedPercent);
          if(file.uploadedPercent >= 100){
            file.uploadCompleted = true;
          }
        }else{
          if(file.uploadedPercent >= 100){
            file.uploadCompleted = true;
            this.selectedFiles.splice(this.selectedFiles.indexOf(file), 1);
          }
        }
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  deleteFile(file: any){
    this.selectedFiles.splice(this.selectedFiles.indexOf(file), 1);
  }

}