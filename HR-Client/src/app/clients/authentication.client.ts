import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(
    username: string,
    password: string,
  ): Observable<{ user: any; token: string; expiresIn: string }> {
    return this.http
      .post(environment.apiUrl + '/user/auth', {
        username: username,
        password: password,
      })
      .pipe(
        map((response: any) => {
          return {
            user: response.user,
            token: response.token as string,
            expiresIn: response.expiresIn as string,
          };
        }),
      );
  }

  //   public register(
  //     username: string,
  //     email: string,
  //     password: string
  //   ): Observable<string> {
  //     return this.http.post(
  //       environment.apiUrl + '/user/register',
  //       {
  //         username: username,
  //         email: email,
  //         password: password,
  //       },
  //       { responseType: 'text' }
  //     );
  //   }
}
