import { WaitingCourtHearingComponent } from './waiting-court-hearing/waiting-court-hearing.component';
import { ViewBailComponent } from './bails-pending-approval/view-bail/view-bail.component';
import { BailsPendingApprovalComponent } from './bails-pending-approval/bails-pending-approval.component';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReleasedOnBailComponent } from './released-on-bail/released-on-bail.component';


export const routes = [ 
  { path: 'pending', component: BailsPendingApprovalComponent,  data: { breadcrumb: 'Bails' }},
  { path: 'released-bail', component: ReleasedOnBailComponent,  data: { breadcrumb: 'Released on bail' }},
  //{ path: ':id', component: ViewBailComponent,  data: { breadcrumb: 'View bails' }},
 { path: 'hearing', component: WaitingCourtHearingComponent, data: { breadcrumb: 'Waiting hearing' }}
];
export const BailsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);