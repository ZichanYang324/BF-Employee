// Inside document-detail.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html', 

})
export class DocumentDetailComponent {
  @Input() document: any;
  @Output() approve = new EventEmitter<string>();
  @Output() reject = new EventEmitter<{ id: string; feedback: string }>();
  @Output() download = new EventEmitter<string>(); 
  @Output() preview = new EventEmitter<string>(); //
  @Output() sendNotification = new EventEmitter<string>(); 
feedback: string = '';
calculateDaysRemaining(endDate: string): number {
  const today = new Date();
  const end = new Date(endDate);
  const timeDiff = end.getTime() - today.getTime();
  const dayDiff = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 3600 * 24)) : 0;
  return dayDiff;
}
onReject(documentId: string): void {
  this.reject.emit({ id: documentId, feedback: this.feedback });
}
}
