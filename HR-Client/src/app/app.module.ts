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

@NgModule({
  declarations: [AppComponent, VisaStatusManagementComponent, DocumentListComponent,     VisaStatusManagementComponent,
    DocumentDetailComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,FormsModule,HttpClientModule,    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,],
  providers: [HrVisaStatusService],
  bootstrap: [AppComponent],
})
export class AppModule {}
