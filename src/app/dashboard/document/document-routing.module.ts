import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalDocComponent } from './approval-doc/approval-doc.component';
import { CreateDocComponent } from './create-doc/create-doc.component';
import { DmsDownloadGuideComponent } from './dms-download-guide/dms-download-guide.component';
import { DocRootComponent } from './doc-root/doc-root.component';
import { FolderComponent } from './folder/folder.component';
import { RecentDocComponent } from './recent-doc/recent-doc.component';
import { SavedDocComponent } from './saved-doc/saved-doc.component';
import { SharedDocComponent } from './shared-doc/shared-doc.component';
import { TrashComponent } from './trash/trash.component';
import { LogsComponent } from './otobox-logs/logs.component';
const routes: Routes = [
  {
    path: '', component: DocRootComponent,
    children: [
      { path: 'create', component: CreateDocComponent },
      { path: '', redirectTo: 'all-files', pathMatch: 'full' },
      { path: 'all-files', component: FolderComponent },
      { path: 'recent', component: RecentDocComponent },
      { path: 'shared', component: SharedDocComponent },
      { path: 'saved', component: SavedDocComponent },
      { path: 'trash', component: TrashComponent },
      { path: 'approval', component: ApprovalDocComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'dms-download-guide', component: DmsDownloadGuideComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
