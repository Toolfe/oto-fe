import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxSpinnerModule } from "ngx-spinner";
import { TelInputComponent } from './shared/tel-input/tel-input.component';
import { SelectAllCheckComponent } from './shared/select-all-check/select-all-check.component';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';
import { InfoComponent } from './shared/info/info.component'
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ErrorComponent } from './shared/error/error.component';
import { ResWithLoadingPipe } from './shared/pipes/loading/res-with-loading.pipe';
import { SkeletonLoadingDirective } from './shared/directives/loading/skeleton-loading.directive';
import { TableLoadingComponent } from './shared/table-loading/table-loading.component';
import { AutofocusDirective } from './shared/directives/auto-focus/autofocus.directive';
import { NumberFieldDirective } from './shared/directives/number-field/number-field.directive';
import { TextOnlyDirective } from './shared/directives/text-field/text-only.directive';
import { SecsToHrPipe } from './shared/pipes/sec-to-hr/secs-to-hr.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CharacterLimitPipe } from './shared/pipes/character-limit.pipe';
import { SearchPipe } from './shared/pipes/search/search.pipe';
import { SecToMinPipe } from './shared/pipes/sec-to-min/sec-to-min.pipe';
import { BreakTimerComponent } from './shared/break-timer/break-timer.component';
import { CheckInTimerComponent } from './shared/checkin-timer/checkin-timer.component';
const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule, NgxChartsModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule, MatProgressBarModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule, MatNativeDateModule, MatStepperModule,
  MatTooltipModule, MatBottomSheetModule, MatDialogModule,
  FlexLayoutModule, FormsModule, DragDropModule, HttpClientModule, NgOtpInputModule,
  ScrollingModule, ReactiveFormsModule, CdkAccordionModule, Ng2SearchPipeModule,
  OrderModule, TabsModule, NgxSpinnerModule, PopoverModule, TooltipModule
];

@NgModule({
  declarations: [SelectAllCheckComponent, TelInputComponent, ConfirmDeleteComponent,InfoComponent, SearchPipe, BreakTimerComponent,CheckInTimerComponent,
    ErrorComponent, ResWithLoadingPipe, SkeletonLoadingDirective, TableLoadingComponent,
    AutofocusDirective, NumberFieldDirective, TextOnlyDirective, SecsToHrPipe, CharacterLimitPipe, SecToMinPipe],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules, SelectAllCheckComponent, TelInputComponent, ConfirmDeleteComponent,InfoComponent, BreakTimerComponent,CheckInTimerComponent,
    ErrorComponent, ResWithLoadingPipe, SkeletonLoadingDirective, TableLoadingComponent,
    AutofocusDirective, NumberFieldDirective, TextOnlyDirective, SecsToHrPipe, CharacterLimitPipe, SearchPipe, SecToMinPipe
  ],
})

export class SharedModules { }