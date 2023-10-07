import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../service/task-service.service';
import * as saveAs from 'file-saver';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-subtask-attachments',
  templateUrl: './subtask-attachments.component.html',
  styleUrls: ['./subtask-attachments.component.scss']
})
export class SubTaskAttachmentComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SubTaskAttachmentComponent>,
    private service: TaskService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public attachment: any[]) { }

  ngOnInit(): void {

  }


  downloadFile(data: any) {
    this.service.downloadAttachment(data).subscribe(responseData => saveAs(responseData,data.fileName));
  }

  removeFile() {

  }

  ngOnDestroy(): void {
    this._bottomSheetRef.dismiss();  
  }

}
