import { Routes } from '@angular/router';
import { EmployeeView } from './components/employee-view/employee-view';
import { EmployeeEdit } from './components/employee-edit/employee-edit';

export const routes: Routes = [
  { path: 'user-view', component: EmployeeView },
  { path: 'user-edit', component: EmployeeEdit },
  { path: '', redirectTo: 'user-view', pathMatch: 'full' },
];
