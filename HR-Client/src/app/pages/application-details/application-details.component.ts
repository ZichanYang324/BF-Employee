import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetApplicationByIdService } from 'src/app/services/get-application-by-id.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})

export class ApplicationDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private getApplicationByIdService: GetApplicationByIdService
  ) { }

  profile: any = {};

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.getApplicationByIdService.getApplicationById(id).subscribe((data) => {
        this.profile = data;
      });
    });
  }
}
