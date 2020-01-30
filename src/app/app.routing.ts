


import { Routes, RouterModule, PreloadAllModules, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { AuthGuard } from './pages/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    //loadChildren: './pages/auth/login/login.module#LoginModule',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'users',
        loadChildren: './pages/users/users.module#UsersModule',
        data: { breadcrumb: 'Users' }
      },
      {
        path: 'stations',
        loadChildren: './pages/stations/stations.module#StationsModule',
        data: { breadcrumb: 'Stations' }
      },
      {
        path: 'courts',
        loadChildren: './pages/court-officials/court-officials.module#CourtOfficialsModule',
        data: { breadcrumb: 'Courts' }
      },
      {
        path: 'bails',
        loadChildren: './pages/bails/bails.module#BailsModule',
        data: { breadcrumb: 'Bails' }
      },

      { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsModule', data: { breadcrumb: 'Settings' } },
      { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
      { path: 'tools', loadChildren: './pages/tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } },
      { path: 'calendar', loadChildren: './pages/calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'Calendar' } },
      { path: 'court-officials', loadChildren: './pages/court-officials/court-officials.module#CourtOfficialsModule', data: { breadcrumb: 'court-officials' } },
      { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
      { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
      { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' } },
      { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
    ]
  },
  {
    path: 'login',
    loadChildren: './pages/auth/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './pages/auth/register/register.module#RegisterModule'
  },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  // useHash: true
});