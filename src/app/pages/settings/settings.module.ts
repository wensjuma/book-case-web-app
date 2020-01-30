import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { CKEditorModule } from 'ng2-ckeditor';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { ManageStationsComponent } from './manage-stations/manage-stations.component';
import { FileUploaderComponent } from './manage-stations/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './manage-stations/image-uploader/image-uploader.component';
import { MultipleImageUploaderComponent } from './manage-stations/multiple-image-uploader/multiple-image-uploader.component';
import { ManageCellsComponent } from './manage-cells/manage-cells.component';
import { ManageCourtsComponent } from './manage-courts/manage-courts.component';
import { CaseTypesComponent } from './case-types/case-types.component';
import { StationModalComponent } from './manage-stations/station-modal/station-modal.component';
import { CellsModalComponent } from './manage-cells/cells-modal/cells-modal.component';
import { CourtModalComponent } from './manage-courts/court-modal/court-modal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ManageCountiesComponent } from './manage-counties/manage-counties.component';
import { CaseModalComponent } from './case-types/case-modal/case-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from '../common/services/api.service';
import { AuthGuard } from '../guards/auth.guard';
import { JwtService } from '../common/services/jwt.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


export const routes = [
  { path: '', redirectTo: 'controls', pathMatch: 'full'},
  { path: 'manage-stations', component: ManageStationsComponent, data: { breadcrumb: 'Manage Stations' } },
  { path: 'manage-cells', component: ManageCellsComponent, data: { breadcrumb: 'Manage Cells' } },
  { path: 'manage-courts', component: ManageCourtsComponent, data: { breadcrumb: 'Manage Courts' } },
  { path: 'case-types', component: CaseTypesComponent, data: { breadcrumb: 'Case Types' } },
  { path: 'manage-counties', component: ManageCountiesComponent, data: { breadcrumb: 'Manage Counties' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MultiselectDropdownModule,
    NgbModule.forRoot(),
    CustomFormsModule,
    CKEditorModule,
    DirectivesModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot() 
  ],
  declarations: [
    ManageStationsComponent,
    FileUploaderComponent,
    ImageUploaderComponent,
    MultipleImageUploaderComponent,
    ManageCellsComponent,
    ManageCourtsComponent,
    CaseTypesComponent,
    ManageCountiesComponent,
    StationModalComponent,
    CellsModalComponent,
    CourtModalComponent,
    CaseModalComponent

  ],

  providers: [
    ApiService,
    AuthGuard,
    JwtService,
  ],
  entryComponents: [
    StationModalComponent,
    CellsModalComponent,
    CourtModalComponent,
    CaseModalComponent

  ]
})
export class SettingsModule { }
