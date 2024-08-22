import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/User';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private token: string | null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.token = this.authService.getToken();
  }

  getHeaders() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`,
    );

    return headers;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/users', {
      headers: this.getHeaders(),
    });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/users', user, {
      headers: this.getHeaders(),
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiUrl + '/users/' + user.id, user, {
      headers: this.getHeaders(),
    });
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(environment.apiUrl + `/users/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
