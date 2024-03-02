import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistrationHistoryServiceService } from 'src/app/services/registration-history-service.service';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.css'],
})

export class HiringManagementComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private registrationHistoryService: RegistrationHistoryServiceService,
  ) {}

  registrationHistory: any[] = [];

  registrationForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
  });

  updateRegistrationHistory(): void {
    this.registrationHistoryService
      .getRegistrationHistory()
      .subscribe((data) => {
        this.registrationHistory = data;
      });
  }

  ngOnInit(): void {
    this.updateRegistrationHistory();
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.http
        .post(
          'http://localhost:3100/hiring/sendLink',
          this.registrationForm.value,
        )
        .subscribe({
          next: () => {
            this.toastr.success('Email sent successfully');
            this.updateRegistrationHistory();
          },
          error: () => {
            this.toastr.error('An error occurred, please try again.');
          },
        });
    }
  }
}
