import { Routes } from '@angular/router';
import { ValidarComponent } from './validar/validar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'validar', pathMatch: 'full' },
  { path: 'validar', component: ValidarComponent, title: 'Verificación de Documentos' }
];
