import { Routes } from '@angular/router';
import { FirstPageComponent } from '../first-page/first-page.component';
import { AppComponent } from '../app.component';
import { SecondPageComponent } from '../second-page/second-page.component';
import { ThirdPageComponent } from '../third-page/third-page.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'firstPage', pathMatch: 'full' },
  { path: 'firstPage', component: FirstPageComponent },
  { path: 'secondPage', component: SecondPageComponent },
  { path: 'thirdPage', component: ThirdPageComponent },
];
