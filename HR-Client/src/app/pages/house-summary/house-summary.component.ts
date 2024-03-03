import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-house-summary',
  templateUrl: './house-summary.component.html',
  styleUrls: ['./house-summary.component.css'],
})
export class HouseSummaryComponent implements OnInit {
  houseID: string = '';
  page: number = 1; // Initialized to 1 by default
  houseSummary: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router to programmatically navigate and update query params
    private housingService: HousingService,
  ) {}

  ngOnInit(): void {
    this.houseID = this.route.snapshot.paramMap.get('houseID') || '';
    this.route.queryParamMap.subscribe((params) => {
      const pageParam = params.get('page');
      this.page = pageParam ? +pageParam : 1;
      this.fetchHouseSummary();
    });
  }

  fetchHouseSummary() {
    if (!this.houseID) {
      console.error('HouseID is required to fetch summary');
      return;
    }

    this.housingService.getHouseSummary(this.houseID, this.page).subscribe({
      next: (data) => {
        this.houseSummary = data;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: this.page },
          queryParamsHandling: 'merge',
        });
      },
      error: (error) => {
        console.error('Failed to fetch house summary', error);
      },
    });
  }

  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchHouseSummary();
    }
  }

  goToNextPage() {
    if (
      this.houseSummary &&
      this.page < this.houseSummary.pagination.totalPage
    ) {
      this.page++;
      this.fetchHouseSummary();
    }
  }
}
