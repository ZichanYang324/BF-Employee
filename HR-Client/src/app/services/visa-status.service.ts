import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class HrVisaStatusService {
  private apiUrl = 'http://localhost:3100'; // 

  constructor(private http: HttpClient) {}
  private getHttpOptions() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU0MzdiYTVhNWFhYTgxY2YxN2IzODUiLCJpYXQiOjE3MDk2MTg1NjYsImV4cCI6MTcwOTYyOTM2Nn0.EsC1aqIJCYz--6t2j0LZsBx71EtR6YPb-7hjtd7aTPk";
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      withCredentials: false
    };
  }
  // Fetch documents for all employees
  getMyDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents/my`, this.getHttpOptions());
  }
  // getAllDocuments(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/documents/all`, this.getHttpOptions());
  // }
  // Update document status
  updateDocumentStatus(documentId: string, status: string, feedback: string = ''): Observable<any> {
    return this.http.patch(`${this.apiUrl}/documents/${documentId}/status`, { status, feedback }, this.getHttpOptions());
  }

  getAllDocuments(searchQuery: string = ''): Observable<any[]> {
    let params = new HttpParams();
    let options = { ...this.getHttpOptions(), params };

    // Explicitly set the responseType to ensure the correct type is inferred
    return this.http.get<any[]>(`http://localhost:3100/documents/all`, options);
  
  
  }
  
  // In visa-status.service.ts

getAllEmployees(searchQuery: string = ''): Observable<any[]> {
  const params = searchQuery ? new HttpParams().set('search', searchQuery) : new HttpParams();
  const options = { ...this.getHttpOptions(), params: params };

  return this.http.get<any[]>(`http://localhost:3100/documents/employees`, options);
}

downloadDocumentUrl(documentId: string): Observable<any> {
  return this.http.get(`http://localhost:3100/documents/download/${documentId}`, { ...this.getHttpOptions(), responseType: 'text' });
}
  // Placeholder for sending notifications
  sendNotification(documentId: string): Observable<any> {
    return this.http.post(`http://localhost:3100/documents/sendNotification/${documentId}`, {}, this.getHttpOptions());
  }
}