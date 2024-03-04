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
  downloadUrls: { [documentId: string]: string } = {}; // For storing multiple URLs
  showIframe: boolean = false; 
  iframeSrc: string = ''; 
  constructor(private HrVisaStatusService: HrVisaStatusService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }


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
  
  downloadDocument(documentId: string): void {
    this.HrVisaStatusService.downloadDocumentUrl(documentId).subscribe({
      next: (downloadUrl) => {

        window.open(downloadUrl, '_blank');

      },
      error: (error) => console.error('Error downloading document:', error),
    });
  }
  previewDocument(documentId: string): void {
    this.HrVisaStatusService.downloadDocumentUrl(documentId).subscribe({
      next: (downloadUrl) => {

        this.iframeSrc = downloadUrl; // Set the URL
    this.showIframe = true; // Show the iframe
  },      error: (error) => console.error('Error downloading document:', error),

      })
  }

  closeIframe() {
    this.showIframe = false; // Hide the iframe
  }
}
