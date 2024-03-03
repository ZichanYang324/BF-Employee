// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HrVisaStatusService } from '../services/visa-status.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  searchQuery: string = 'search bar';

  constructor(private visaStatusService: HrVisaStatusService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.visaStatusService.getAllEmployees(this.searchQuery).subscribe({
      next: (data) => this.employees = data,
      error: (error) => console.error(error)
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchQuery = searchValue;
    this.loadEmployees();
  }
  calculateDaysRemaining(endDate: string): number {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    const dayDiff = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 3600 * 24)) : 0;
    return dayDiff;
  }
}
