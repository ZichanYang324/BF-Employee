import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUyNWU3ZWE4MDlhNzI4NjZiNWQzNzMiLCJpYXQiOjE3MDkzNjA5NTMsImV4cCI6MTcwOTM2NDU1M30.J-dW_7jK3FnQQ-NBMxcYOCQ5m_8rp08FNFaa1CQJ570";
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
  getAllDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents/all`, this.getHttpOptions());
  }
  // Update document status
  updateDocumentStatus(documentId: string, status: string, feedback: string = ''): Observable<any> {
    return this.http.patch(`${this.apiUrl}/documents/${documentId}/status`, { status, feedback }, this.getHttpOptions());
  }
  //employee part
  // getAllEmployees(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.apiUrl}/employees`, this.getHttpOptions());
  // }
  
  // searchEmployees(searchTerm: string): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.apiUrl}/employees?search=${searchTerm}`, this.getHttpOptions());
  // }
  

  // Placeholder for sending notifications
  sendNotification(employeeId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications/send`, { employeeId }, this.getHttpOptions());
  }
}