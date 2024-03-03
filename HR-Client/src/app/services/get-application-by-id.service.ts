import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetApplicationByIdService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3100/hiring/getApplicationById';

  getApplicationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?id=${id}`);
  }
}
