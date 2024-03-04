import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateApplicationStatusService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3100/hiring/updateApplicationStatus';

  approveApplication(id: string): Observable<any> {
    return this.http.put<any>(this.apiUrl, { id, status: 'APPROVED' });
  }

  rejectApplication(id: string): Observable<any> {
    return this.http.put<any>(this.apiUrl, { id, status: 'REJECTED' });
  }
}
