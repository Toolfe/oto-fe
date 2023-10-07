import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentRoutingModule } from './document-routing.module';
import { CreateDocComponent } from './create-doc/create-doc.component';
import { DocRootComponent } from './doc-root/doc-root.component';
import { DocumentEditorModule } from 'projects/document-editor/src/app/app.module';
import { MyDocsComponent } from './my-docs/my-docs.component';
import { SearchDocsComponent } from './search-docs/search-docs.component';
import { FolderComponent } from './folder/folder.component';
import { LogsComponent } from './otobox-logs/logs.component'
import { AddFolderComponent } from './folder/add-folder/add-folder.component';
import { SharedModules } from 'src/app/shared.module';
import { RecentDocComponent } from './recent-doc/recent-doc.component';
import { SharedDocComponent } from './shared-doc/shared-doc.component';
import { SavedDocComponent } from './saved-doc/saved-doc.component';
import { TrashComponent } from './trash/trash.component';
import { ApprovalDocComponent } from './approval-doc/approval-doc.component';
import { ShareComponent } from './options/share/share.component';
import { PropertiesComponent } from './options/properties/properties.component';
import { ReplaceComponent } from './options/replace/replace.component';
import { FolderSharingComponent } from './folder/folder-sharing/folder-sharing.component';
import { DmsDownloadGuideComponent } from './dms-download-guide/dms-download-guide.component';

@NgModule({
  declarations: [
    CreateDocComponent,
    DocRootComponent,
    MyDocsComponent,
    SearchDocsComponent,
    FolderComponent,
    AddFolderComponent,
    RecentDocComponent,
    SharedDocComponent,
    SavedDocComponent,
    TrashComponent,
    LogsComponent,
    ApprovalDocComponent,
    ShareComponent,
    PropertiesComponent,
    ReplaceComponent,
    FolderSharingComponent,
    DmsDownloadGuideComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,SharedModules,
    DocumentEditorModule.forChild()
  ]

})
export class DocumentModule { }
