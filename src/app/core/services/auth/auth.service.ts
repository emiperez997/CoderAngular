import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment.development';
import { Login } from './models/Login';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from './models/UserToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private router: Router,
  ) {}

  login(login: Login) {
    return this.http.post<Login>(environment.apiUrl + '/auth/login', login);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['auth']);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  verifyToken() {
    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    const decoded: UserToken = jwtDecode(token);
    const currentTime = new Date().getTime() / 1000;

    if (decoded.exp < currentTime) {
      this.logout();
      return of(false);
    }

    return of(true);
  }
}
