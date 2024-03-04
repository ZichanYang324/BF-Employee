import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private baseUrl = 'http://localhost:3100/housing';
  public profile = '65def521e1e3c5b23fd98602';
  constructor(private http: HttpClient) {}

  getAllBasicHouses(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/getALLBasicHouses`, {
      profileId: this.profile,
    });
  }

  getHouseSummary(houseID: string, page: number) {
    const params = new HttpParams()
      .set('houseID', houseID)
      .set('page', page.toString());
    const body = { profileId: this.profile };
    return this.http.post(`${this.baseUrl}/getHouseSummary`, body, { params });
  }
  addHouse(houseData: any) {
    const body = {
      profileId: this.profile,
      ...houseData,
    };
    return this.http.post('http://localhost:3100/housing/add', body);
  }

  deleteHouse(houseData: any) {
    const body = {
      profileId: this.profile,
      ...houseData,
    };
    const options = {
      body: body,
    };
    return this.http.request(
      'delete',
      'http://localhost:3100/housing/delete',
      options,
    );
  }
}
