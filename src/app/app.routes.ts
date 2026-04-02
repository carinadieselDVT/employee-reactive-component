import { Routes } from '@angular/router';
import { EmployeeView } from './components/employee-view/employee-view/employee-view';

export const routes: Routes = [
  { path: 'user-view', component: EmployeeView },
  { path: '', redirectTo: 'user-view', pathMatch: 'full' },
];
