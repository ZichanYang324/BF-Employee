import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://localhost:3100/comment';
  private profile = '65def521e1e3c5b23fd98602';
  constructor(private http: HttpClient) {}

  addComment(reportID: string, description: string) {
    const body = {
      profileId: this.profile,
      reportID,
      description,
    };
    return this.http.post(`${this.baseUrl}/add`, body);
  }
  updateComment(commentId: string, description: string) {
    const body = {
      profileId: this.profile,
      commentId,
      description,
    };
    return this.http.patch(`${this.baseUrl}/update`, body);
  }
}
