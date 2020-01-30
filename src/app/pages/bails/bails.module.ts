import { BookCourtComponent } from './book-court/book-court.component';


import { BailsRoutingModule } from './bails-routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BailsPendingApprovalComponent } from './bails-pending-approval/bails-pending-approval.component';
import { ReleasedOnBailComponent } from './released-on-bail/released-on-bail.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ViewBailComponent } from './bails-pending-approval/view-bail/view-bail.component';

import { WaitingCourtHearingComponent } from './waiting-court-hearing/waiting-court-hearing.component';
import { BookToCourtComponent } from './bails-pending-approval/book-to-court/book-to-court.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  entryComponents: [
    BookToCourtComponent
 ],
  declarations: [
    BailsPendingApprovalComponent,
    ReleasedOnBailComponent, 
    ViewBailComponent,
    WaitingCourtHearingComponent,
    BookToCourtComponent,
    BookCourtComponent
  ],
  imports: [
    CommonModule,
    BailsRoutingModule,
    Ng2SmartTableModule,
    NgbModalModule

  ],


})
export class BailsModule { }
