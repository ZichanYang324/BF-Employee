import { AuthenticationClient } from '../clients/authentication.client';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';
  private expiresInKey = 'expiresIn';
  private userKey = 'user';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  public login(username: string, password: string): void {
    this.authenticationClient.login(username, password).subscribe({
      next: ({ user, token, expiresIn }) => {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.expiresInKey, expiresIn);
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.toastr.success('Signed in');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  // public register(username: string, email: string, password: string): void {
  //   this.authenticationClient
  //     .register(username, email, password)
  //     .subscribe((token) => {
  //       localStorage.setItem(this.tokenKey, token);
  //       this.router.navigate(['/']);
  //     });
  // }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.toastr.success('Logged out');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
