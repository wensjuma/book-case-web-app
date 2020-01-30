import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent,
      data: {
          title: 'Login'
      }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
        title: 'register'
    }
}
];  

export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes)
