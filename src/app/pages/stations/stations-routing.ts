import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DefendantComponent } from './case/defendant/defendant.component';
import { ComplainantComponent } from './case/complainant/complainant.component';
import { CaseMembersComponent } from './case-members/case-members.component';
import { StationOfficersComponent } from './station-officers/station-officers.component';
import { ArrestedComponent } from './arrested/arrested.component';
import { CellsComponent } from './cells/cells.component';
import { CreateObComponent } from './ob-creation/create-ob/create-ob.component';
import { ObRecordsComponent } from './ob-records/ob-records.component';
import { TabsAccordionsComponent } from './tabs-accordions/tabs-accordions.component';
import { TypographyComponent } from './typography/typography.component';
import { ViewArrestedComponent } from './arrested/view-arrested/view-arrested.component';
import { ViewObrecordComponent } from './ob-records/view-obrecord/view-obrecord.component';




export const routes = [ 
    { path: '', redirectTo: 'police-stations', pathMatch: 'full'},
    { path: 'ob-records', component: ObRecordsComponent, data: { breadcrumb: 'OB Records' } },
    { path: 'case', component: CreateObComponent, data: { breadcrumb: 'Create Case' } },
    { path: 'cells', component: CellsComponent, data: { breadcrumb: 'Cells' } },
    { path: 'arrested', component: ArrestedComponent, data: { breadcrumb: 'Arrested' } },
    { path: 'station-officers', component: StationOfficersComponent, data: { breadcrumb: 'Station Officers' } },
    { path: 'media-objects', component: CaseMembersComponent, data: { breadcrumb: 'Media Objects' } },
    { path: 'tabs-accordions', component: TabsAccordionsComponent, data: { breadcrumb: 'Tabs & Accordions' } },
    { path: 'typography', component: TypographyComponent, data: { breadcrumb: 'Typography' } },
    { path: 'complainant', component: ComplainantComponent },
    { path: 'defendant', component: DefendantComponent},
    { path: 'view-arrested', component: ViewArrestedComponent},
    { path: ':id', component: ViewObrecordComponent}
    // { path: 'case', component: CaseComponent, data: { breadcrumb: 'case' } }
  ];
  export const StationsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
