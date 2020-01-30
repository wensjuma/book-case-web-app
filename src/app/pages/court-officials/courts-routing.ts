import { CourtOfficialsComponent } from './court-officials.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//import { SingleCustomerComponent } from './customers/single-customer/single-customer.component';
//import { ViewCustomerComponent } from './customers/view/view.component';



const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    {
        path: 'officials',
        component: CourtOfficialsComponent ,
        data: {
            title: 'Courts Officials > Officials',
            breadcrumb: 'Officials',
        }
    },
    // {
    //     path: 'complainants',
    //     component: ComplainantsComponent,
    //     data: {
    //         title: 'Complainants > Courts Complainants',
    //         breadcrumb: 'Active Complainants',
    //     }
    // },
    // {
    //     path: 'defendants',
    //     component: DefendantsComponent,
    //     data: {
    //         title: 'Defendants > Courts Defendants',
    //         breadcrumb: 'Active Defendants',
    //     }
    // },
   
    
];

export const CourtsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
