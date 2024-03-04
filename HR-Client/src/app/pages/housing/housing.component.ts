import { AddHouseDialogComponent } from '../add-house-dialog/add-house-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css'],
})
export class HousingComponent implements OnInit {
  houses: any[] = [];
  constructor(
    private housingService: HousingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.housingService.getAllBasicHouses().subscribe((data) => {
      this.houses = data;
    });
  }
  viewSummary(houseID: string, page: number = 1): void {
    this.router.navigate(['/house-summary', houseID], {
      queryParams: { page: 1 },
    });
  }
  deleteHouse(houseID: string): void {
    const obj = {
      houseID,
    };
    this.housingService.deleteHouse(obj).subscribe({
      next: () => {
        this.snackBar.open('House deleted successfully!', 'Close', {
          duration: 3000,
        });
        this.houses = this.houses.filter((house) => house.house_id !== houseID);
      },
      error: (error) => {
        console.error('There was an error ', error);
        this.snackBar.open('Failed to delete house.', 'Close', {
          duration: 5000,
        });
      },
    });
  }
  addHouse(): void {
    const dialogRef = this.dialog.open(AddHouseDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.housingService.addHouse(result).subscribe({
          next: (newHouse) => {
            this.houses.push(newHouse);
            this.snackBar.open('House created successfully!', 'Close', {
              duration: 5000,
            });
            this.housingService.getAllBasicHouses().subscribe((data) => {
              this.houses = data;
            });
          },
          error: (error) => {
            console.error('There was an error ', error);
            this.snackBar.open('Failed to create house.', 'Close', {
              duration: 5000,
            });
          },
        });
      }
    });
  }
}
