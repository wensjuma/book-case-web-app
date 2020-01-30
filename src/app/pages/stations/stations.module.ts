import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';

import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { Ng2SmartTableModule  } from 'ng2-smart-table';
import { CaseComponent } from './case/case.component';
import { CellsComponent } from './cells/cells.component';
import { TabsAccordionsComponent } from './tabs-accordions/tabs-accordions.component';
import { StationOfficersComponent } from './station-officers/station-officers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CaseMembersComponent } from './case-members/case-members.component';
import { TypographyComponent } from './typography/typography.component';
import { from } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormModalComponent } from './form-modal/form-modal.component';
import { CellModalComponent } from './cells/cell-modal/cell-modal.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewObrecordComponent } from './ob-records/view-obrecord/view-obrecord.component';
import { ComplainantComponent } from './case/complainant/complainant.component';
import { DefendantComponent } from './case/defendant/defendant.component';
import { ObRecordsComponent } from './ob-records/ob-records.component';
import { ArrestedComponent } from './arrested/arrested.component';
import { TabsComponent } from './case/tabs/tabs.component';
import { TabsDirective } from './case/tabs/tabs.directive';
import { CreateObComponent } from './ob-creation/create-ob/create-ob.component';
import { AddMemberComponent } from './ob-records/add-member/add-member.component';
import { ViewArrestedComponent } from './arrested/view-arrested/view-arrested.component';
import { PaymentsComponent } from './arrested/payments/payments.component';
import { AddCaseMemberComponent } from './case-members/add-case-member/add-case-member.component';
import { BookCellComponent } from './arrested/book-cell/book-cell.component';
import { StationsRoutingModule } from './stations-routing';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CellOccupancyModalComponent } from './cells/cell-occupancy-modal/cell-occupancy-modal.component';
import { IndividualDetailsComponent } from './cells/cell-occupancy-modal/individual-details/individual-details.component';




@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    MultiselectDropdownModule,
    NgbModule.forRoot(),
    CustomFormsModule,
    CKEditorModule,
    DirectivesModule,
    StationsRoutingModule,
    SharedModule,
    AutocompleteLibModule,
    Ng2SearchPipeModule
    
    
    ///RouterModule.forChild(routes)
  ],
  providers: [NgxNavigationWithDataComponent],
  declarations: [
    ObRecordsComponent,
    CaseComponent,
    CellsComponent,
    TabsAccordionsComponent,
    ArrestedComponent,
    StationOfficersComponent,
    CaseMembersComponent,
    TypographyComponent,
    FormModalComponent,
    CellModalComponent,
    ViewObrecordComponent,
    ComplainantComponent,
    DefendantComponent,
    TabsComponent,
    TabsDirective,
    CreateObComponent,
    AddMemberComponent,
    ViewArrestedComponent,
    PaymentsComponent,
    AddCaseMemberComponent,
    BookCellComponent,
    CellOccupancyModalComponent,
    IndividualDetailsComponent
  ],
  entryComponents: [
    FormModalComponent,
    CellModalComponent,
    AddMemberComponent,  
    PaymentsComponent,
    AddCaseMemberComponent,
    BookCellComponent,
    CellOccupancyModalComponent,
    IndividualDetailsComponent
  ]
})
export class StationsModule { }
