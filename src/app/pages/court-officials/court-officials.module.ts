import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { CourtOfficialsComponent } from './court-officials.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddcourtOfficialComponent } from './addcourt-official/addcourt-official.component';
import { CourtsRoutingModule } from './courts-routing';


// export const routes = [
   //{ path: '', component: CourtOfficialsComponent, pathMatch: 'full' }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule,
    CourtsRoutingModule,
    PipesModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    CourtOfficialsComponent,
    AddcourtOfficialComponent,
   
  ],
  entryComponents: [
    AddcourtOfficialComponent
  ]
})
export class CourtOfficialsModule { }
