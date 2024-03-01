import { Component, OnInit } from '@angular/core';
import { type ProfileSummary } from 'src/app/components/entire-profile/profiles.types';

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.css'],
})
export class EmployeeProfilesComponent implements OnInit {
  profileSummaries: ProfileSummary[] = [];

  constructor() {}

  ngOnInit(): void {
    const fetchProfiles = async () => {
      const response = await fetch('http://localhost:3100/hr/profiles/summary');
      const data = await response.json();
      this.profileSummaries = data;
    };
    fetchProfiles();
  }
}
