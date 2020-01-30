import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { UsersComponent } from './users.component';
import { UsersData } from './users.data';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddUserComponent } from './add-user/add-user.component';
import { ModalComponent } from '../../modal/modal.component';


export const routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', component: UsersComponent, data: { breadcrumb: 'Police Officers' } }
  // { path: 'ngx', component: NgxComponent, data: { breadcrumb: 'NGX DataTable' } }  
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(UsersData, { delay: 0 }),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxDatatableModule,

    NgbModule.forRoot(),
    MultiselectDropdownModule,
    NgxPaginationModule,
    PipesModule
  ],
  providers: [
    NgbActiveModal
  ],
  declarations: [
    UsersComponent,
    AddUserComponent,
    ModalComponent
  ],

  entryComponents: [
    AddUserComponent
  ]
  
})
export class UsersModule { }
