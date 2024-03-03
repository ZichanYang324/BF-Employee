import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationHistoryServiceService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3100/hiring/getHistory';

  getRegistrationHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
