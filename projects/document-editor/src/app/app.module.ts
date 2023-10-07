import { ModuleWithProviders, NgModule } from '@angular/core';
import { DocumentEditor } from './app.component';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';
import { SharedModules } from 'src/app/shared.module';
@NgModule({
  declarations: [
    DocumentEditor
  ],
  imports: [SharedModules],
  exports: [DocumentEditor]
})
export class AppModule { }
export class DocumentEditorModule{
  static forChild(): ModuleWithProviders<AppModule> {
    const providers:any[] = []
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}