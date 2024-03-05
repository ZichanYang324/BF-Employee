import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetApplicationByStatusService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3100/hiring/getApplicationByStatus';

  getApplicationByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?status=${status}`);
  }
}
