import { HomeComponent } from './pages/home/home.component';
import { HouseSummaryComponent } from './pages/house-summary/house-summary.component';
import { HousingComponent } from './pages/housing/housing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'housing',
    component: HousingComponent,
  },
  {
    path: 'house-summary/:houseID',
    component: HouseSummaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
