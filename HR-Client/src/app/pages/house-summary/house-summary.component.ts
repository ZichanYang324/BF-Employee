import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
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
  inputValue: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router to programmatically navigate and update query params
    public housingService: HousingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private CommentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.houseID = this.route.snapshot.paramMap.get('houseID') || '';
    this.route.queryParamMap.subscribe((params) => {
      const pageParam = params.get('page');
      this.page = pageParam ? +pageParam : 1;
      this.fetchHouseSummary();
    });
  }
  addEmployeeToHouse(){
    console.log('add a employee to house',this.inputValue)
    this.housingService.addEmployeeToHouse(this.houseID,this.inputValue).subscribe({
      next: (data) => {
        console.log('add successfully')
        location.reload();
      },
      error: (error) => {
        console.error('Failed add employee to this house', error);
      },
    })
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
  addComment(reportID: string): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.CommentService.addComment(reportID, result.description).subscribe({
          next: () => {
            this.snackBar.open('Comment added successfully', 'Close', {
              duration: 3000,
            });
            this.fetchHouseSummary();
          },
          error: () => {
            this.snackBar.open('Failed to add comment', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
  editComment(commentId: string): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.CommentService.updateComment(
          commentId,
          result.description,
        ).subscribe({
          next: () => {
            this.snackBar.open('Comment updated successfully', 'Close', {
              duration: 3000,
            });
            this.fetchHouseSummary();
          },
          error: () => {
            this.snackBar.open('Failed to updated comment', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
  getCommenterDisplayName(comment: any) {
    const baseName =
      comment.createdby.preferredName ||
      `${comment.createdby.firstName} ${comment.createdby.lastName}`;
    return comment.createdby._id === this.housingService.profile
      ? `(HR) ${baseName}`
      : baseName;
  }
}
