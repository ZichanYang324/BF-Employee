import { Component } from '@angular/core';

@Component({
  selector: 'app-add-house-dialog',
  templateUrl: './add-house-dialog.component.html',
  styleUrls: ['./add-house-dialog.component.css'],
})
export class AddHouseDialogComponent {
  houseData = {
    address: '',
    landlordInfo: { name: '', phone: '', email: '' },
    facilityDetails: { beds: 0, mattresses: 0, tables: 0, chairs: 0 },
  };
}
