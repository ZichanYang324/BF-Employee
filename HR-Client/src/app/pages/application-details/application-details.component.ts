import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetApplicationByIdService } from 'src/app/services/get-application-by-id.service';
import { UpdateApplicationStatusService } from 'src/app/services/update-application-status.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css'],
})
export class ApplicationDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private getApplicationByIdService: GetApplicationByIdService,
    private updateApplicationStatusService: UpdateApplicationStatusService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  profile: any = {};

  feedbackForm = this.fb.group({
    feedback: [''],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.getApplicationByIdService
        .getApplicationById(id)
        .subscribe((data) => {
          this.profile = data;
        });
    });
  }

  approveApplication(): void {
    this.updateApplicationStatusService
      .approveApplication(this.profile._id)
      .subscribe({
        next: () => {
          this.toastr.success('Application approved.');
          this.router.navigate(['/hiring-management/application-review']);
        },
        error: () => {
          this.toastr.error('Approving application failed, please try again.');
        },
      });
  }

  rejectApplication(): void {
    this.updateApplicationStatusService
      .rejectApplication(this.profile._id)
      .subscribe({
        next: () => {
          this.toastr.success('Application rejected.');
          this.http
            .put(`http://localhost:3100/hiring/addFeedback`, {
              id: this.profile._id,
              feedback: this.feedbackForm.value.feedback,
            })
            .subscribe({
              next: () => {
                this.toastr.success('Feedback added.');
                this.router.navigate(['/hiring-management/application-review']);
              },
              error: () => {
                this.toastr.error('Adding feedback failed, please try again.');
              },
            });
        },
        error: () => {
          this.toastr.error('Rejecting application failed, please try again.');
        },
      });
  }
}
