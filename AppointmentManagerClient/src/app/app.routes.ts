import { Routes } from '@angular/router';
import { Appointments } from './appointments/appointments';
import { Categories } from './categories/categories';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'appointments',
    component: Appointments
  },
  {
    path: 'categories',
    component: Categories
  }
];