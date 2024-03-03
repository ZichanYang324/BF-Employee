import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private baseUrl = 'http://localhost:3100/housing';
  private profile = '65def521e1e3c5b23fd98602';
  constructor(private http: HttpClient) {}
  getAllBasicHouses(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/getALLBasicHouses`, {
      profileId: this.profile,
    });
  }
  addHouse(houseData: any) {
    const body = {
      profileId: this.profile,
      ...houseData,
    };
    return this.http.post('http://localhost:3100/housing/add', body);
  }
}
