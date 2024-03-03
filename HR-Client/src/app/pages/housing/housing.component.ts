import { AddHouseDialogComponent } from '../add-house-dialog/add-house-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  ) {}

  ngOnInit(): void {
    this.housingService.getAllBasicHouses().subscribe((data) => {
      this.houses = data;
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
          },
          error: (error) => {
            console.error('There was an error ');
            this.snackBar.open('Failed to create house.', 'Close', {
              duration: 5000,
            });
          },
        });
      }
    });
  }
}
