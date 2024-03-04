import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntireProfileComponent } from './components/entire-profile/entire-profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { ApplicationDetailsComponent } from './pages/application-details/application-details.component';
import { ApplicationReviewComponent } from './pages/application-review/application-review.component';
import { EmployeeProfilesComponent } from './pages/employee-profiles/employee-profiles.component';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationEmailComponent } from './pages/registration-email/registration-email.component';
import { SecretComponent } from './secret/secret.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    EmployeeProfilesComponent,
    EntireProfileComponent,
    HiringManagementComponent,
    RegistrationEmailComponent,
    ApplicationReviewComponent,
    ApplicationDetailsComponent,
    SecretComponent,
    LoginPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
