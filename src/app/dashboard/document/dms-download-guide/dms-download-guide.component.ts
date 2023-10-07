import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { DocumentService } from '../service/document-service/document.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dms-download-guide',
  templateUrl: './dms-download-guide.component.html',
  styleUrls: ['./dms-download-guide.component.scss']
})
export class DmsDownloadGuideComponent implements OnInit {

  constructor(private service:DocumentService) { }

  ngOnInit(): void {
  }


  downloadDMS() {
    const fileUrl = "assets/otobox-app/otobox.exe";
    const fileName = 'otobox.exe';
  
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }
  

  // downloadDMS(){
  //     this.service.downloadDMS().subscribe(data => saveAs(data, 'DMS.exe'));
  // }
}
