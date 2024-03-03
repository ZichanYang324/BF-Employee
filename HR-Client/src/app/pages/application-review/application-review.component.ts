import { Component, OnInit } from '@angular/core';
import { GetApplicationByStatusService } from '../../services/get-application-by-status.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  styleUrls: ['./application-review.component.css']
})

export class ApplicationReviewComponent implements OnInit {

  pendingApplications: any[] = [];
  approvedApplications: any[] = [];
  rejectedApplications: any[] = [];
  
  constructor(
    private getApplicationByStatusService: GetApplicationByStatusService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getApplicationByStatusService.getApplicationByStatus('PENDING').subscribe((data) => {
      this.pendingApplications = data;
    });
    this.getApplicationByStatusService.getApplicationByStatus('APPROVED').subscribe((data) => {
      this.approvedApplications = data;
    });
    this.getApplicationByStatusService.getApplicationByStatus('REJECTED').subscribe((data) => {
      this.rejectedApplications = data;
    });
  }


}
