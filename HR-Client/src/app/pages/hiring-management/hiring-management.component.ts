import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.css'],
})
export class HiringManagementComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  registrationForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.http
        .post('http://localhost:3100/hiring/sendLink', this.registrationForm.value)
        .subscribe({
          next: () => {
            this.toastr.success('Email sent successfully');
          },
          error: () => {
            this.toastr.error('An error occurred, please try again.');
          },
        });
    }
  }
}
