import { EmployeeProfilesComponent } from './pages/employee-profiles/employee-profiles.component';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationEmailComponent } from './pages/registration-email/registration-email.component';
import { ApplicationReviewComponent } from './pages/application-review/application-review.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'employee-profiles',
    component: EmployeeProfilesComponent,
  },
  {
    path: 'hiring-management',
    component: HiringManagementComponent,
    children: [
      {
        path: 'registration-email',
        component: RegistrationEmailComponent,
      },
      {
        path: 'application-review',
        component: ApplicationReviewComponent,
      },
      {
        path: '',
        redirectTo: 'registration-email',
        pathMatch: 'full',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
