import { Routes } from '@angular/router';
// Import of the 5 pages 
import { HomeComponent } from './components/home/home.component';
import { ManagementComponent } from './components/management/management.component';
import { SearchComponent } from './components/search/search.component';
import { SecurityComponent } from './components/security/security.component';
import { HelpComponent } from './components/help/help.component';

export const routes: Routes = [
  // Definition of the routes for the 5 pages, and a default route to the home page
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Forsiden
  { path: 'management', component: ManagementComponent },
  { path: 'search', component: SearchComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' } 
];