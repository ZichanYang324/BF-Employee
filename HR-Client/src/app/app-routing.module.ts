import { AuthGuard } from './helpers/auth..guard';
import { ApplicationDetailsComponent } from './pages/application-details/application-details.component';
import { ApplicationReviewComponent } from './pages/application-review/application-review.component';
import { EmployeeProfilesComponent } from './pages/employee-profiles/employee-profiles.component';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationEmailComponent } from './pages/registration-email/registration-email.component';
import { SecretComponent } from './secret/secret.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SecretComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
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
        path: 'application-details',
        component: ApplicationDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'registration-email',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
