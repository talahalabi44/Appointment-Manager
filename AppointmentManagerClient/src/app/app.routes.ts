import { Routes } from '@angular/router';
import { Appointments } from './appointments/appointments';
import { Categories } from './categories/categories';

export const routes: Routes = [
  {
    path: 'appointments',
    component: Appointments
  },
  {
    path: 'categories',
    component: Categories
  }
];
