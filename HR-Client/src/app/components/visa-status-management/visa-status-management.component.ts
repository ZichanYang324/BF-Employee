import { Component, OnInit } from '@angular/core';
import { HrVisaStatusService } from '../../services/visa-status.service';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.css'],
})
export class VisaStatusManagementComponent implements OnInit {
  documents: any[] = [];
  searchQuery: string = '';
  constructor(private HrVisaStatusService: HrVisaStatusService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  // loadDocuments(): void {
  //   this.HrVisaStatusService.getAllDocuments().subscribe({
  //     next: (data: any[]) => {
  //       this.documents = data;
  //     },
  //     error: (error: any) => console.error(error),
  //   });
  // }
  loadDocuments(): void {
    // Modify to pass searchQuery to the service method
    this.HrVisaStatusService.getAllDocuments(this.searchQuery).subscribe({
      next: (data: any[]) => {
        this.documents = data;
      },
      error: (error: any) => console.error(error),
    });
  }
  approveDocument(documentId: string): void {
    this.HrVisaStatusService.updateDocumentStatus(documentId, 'Approved').subscribe({
      next: () => {
        console.log('Document approved successfully');
        this.loadDocuments(); // Reload documents to reflect the change
      },
      error: (error) => console.error('Error approving document:', error),
    });
  }
  
  rejectDocument(documentId: string, feedback: string): void {
    this.HrVisaStatusService.updateDocumentStatus(documentId, 'Rejected', feedback).subscribe({
      next: () => {
        console.log('Document rejected successfully');
        this.loadDocuments(); // Reload documents to reflect the change
      },
      error: (error) => console.error('Error rejecting document:', error),
    });
  }
  

}
