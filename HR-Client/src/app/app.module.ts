import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntireProfileComponent } from './components/entire-profile/entire-profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { AddHouseDialogComponent } from './pages/add-house-dialog/add-house-dialog.component';
import { ApplicationDetailsComponent } from './pages/application-details/application-details.component';
import { ApplicationReviewComponent } from './pages/application-review/application-review.component';
import { CommentDialogComponent } from './pages/comment-dialog/comment-dialog.component';
import { EmployeeProfilesComponent } from './pages/employee-profiles/employee-profiles.component';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { HomeComponent } from './pages/home/home.component';
import { HouseSummaryComponent } from './pages/house-summary/house-summary.component';
import { HousingComponent } from './pages/housing/housing.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationEmailComponent } from './pages/registration-email/registration-email.component';
import { SecretComponent } from './secret/secret.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentDetailComponent } from './components/document-detail/document-detail.component';
import { HrVisaStatusService } from './services/visa-status.service';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    EmployeeProfilesComponent,
    EntireProfileComponent,
    HiringManagementComponent,
    HousingComponent,
    AddHouseDialogComponent,
    HouseSummaryComponent,
    CommentDialogComponent,
    RegistrationEmailComponent,
    ApplicationReviewComponent,
    ApplicationDetailsComponent,
    SecretComponent,
    LoginPageComponent,
    VisaStatusManagementComponent, 
    DocumentListComponent,     
    VisaStatusManagementComponent,
    DocumentDetailComponent,
    SafeUrlPipe,
    EmployeeListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    MatTabsModule ,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  // providers: [HrVisaStatusService],
  bootstrap: [AppComponent],
})
export class AppModule {}
