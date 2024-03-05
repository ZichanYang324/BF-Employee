import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  Profile,
  type ProfileSummary,
} from 'src/app/components/entire-profile/profiles.types';

interface ProfileDetails {
  [key: string]: Profile;
}

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.css'],
})
export class EmployeeProfilesComponent implements OnInit {
  profileSummaries: ProfileSummary[] = [];
  profileDetails: ProfileDetails = {};

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const fetchProfiles = async () => {
      this.httpClient
        .get<ProfileSummary[]>('http://localhost:3100/hr/profiles/summary')
        .subscribe((data) => {
          this.profileSummaries = data;
        });
      // const response = await fetch('http://localhost:3100/hr/profiles/summary');
      // const data = await response.json();
      // this.profileSummaries = data;
    };
    fetchProfiles();
  }

  async onSummaryExpanded(userId: string) {
    if (this.profileDetails[userId]) {
      return;
    }
    this.httpClient
      .get<Profile>('http://localhost:3100/hr/profiles/entire?userId=' + userId)
      .subscribe((data) => {
        this.profileDetails[userId] = data;
      });
  }

  async onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;
    this.httpClient
      .get<
        ProfileSummary[]
      >('http://localhost:3100/hr/profiles/summary?search=' + searchTerm)
      .subscribe((data) => {
        this.profileSummaries = data;
      });
  }
}
