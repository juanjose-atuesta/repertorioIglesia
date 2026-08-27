import { Routes } from '@angular/router';
import { Repertorio } from './components/repertorio/repertorio';
import { Canciones } from './components/canciones/canciones';
import { Letras } from './components/letras/letras';

export const routes: Routes = [
  { path: '', redirectTo: 'repertorio', pathMatch: 'full' },
  { path: 'repertorio', component: Repertorio },
  { path: 'canciones', component: Canciones },
  { path: 'letras', component: Letras },
];
