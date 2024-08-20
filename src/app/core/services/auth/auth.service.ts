import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment.development';
import { Login } from './models/Login';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from './models/UserToken';
import { unsetAuthUser } from '../../store/auth/auth.actions';
import { RootState } from '../../store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<RootState>,
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

    this.store.dispatch(unsetAuthUser());

    this.router.navigate(['auth']);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUserToken(token: string) {
    const decoded: UserToken = jwtDecode(token);
    return decoded;
  }

  verifyToken() {
    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    try {
      const decoded: UserToken = jwtDecode(token);
      const currentTime = new Date().getTime() / 1000;

      if (decoded.exp < currentTime) {
        this.logout();
        return of(false);
      }

      return of(true);
    } catch (error: any) {
      localStorage.removeItem('token');
      this.store.dispatch(unsetAuthUser());
      this.router.navigate(['auth']);
      return of(false);
    }
  }

  verifyAdmin(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    try {
      const decoded: UserToken = jwtDecode(token);
      const currentTime = new Date().getTime() / 1000;

      if (decoded.exp < currentTime) {
        this.logout();
        return of(false);
      }

      if (decoded.role !== 'ADMIN') {
        this.router.navigate(['dashboard']);
        return of(false);
      }

      return of(true);
    } catch (error: any) {
      localStorage.removeItem('token');
      this.store.dispatch(unsetAuthUser());
      this.router.navigate(['auth']);
      return of(false);
    }
  }
}
