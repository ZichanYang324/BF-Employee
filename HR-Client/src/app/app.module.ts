import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VisaStatusManagementComponent } from './visa-status-management/visa-status-management.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { HrVisaStatusService } from './services/visa-status.service'; // Ensure service path is correct
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [AppComponent, VisaStatusManagementComponent, DocumentListComponent,     VisaStatusManagementComponent,
    DocumentDetailComponent,
    EmployeeListComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,FormsModule,HttpClientModule,    MatCardModule,MatExpansionModule,    MatFormFieldModule,

    MatButtonModule,
    MatInputModule,
    MatIconModule,],
  providers: [HrVisaStatusService],
  bootstrap: [AppComponent],
})
export class AppModule {}
