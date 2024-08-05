import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from './models/Teacher';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private teachers: Teacher[] = [];
  private timer: number = 1000;

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(environment.apiUrl + '/teachers');
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(environment.apiUrl + '/teachers/' + id);
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(environment.apiUrl + '/teachers', teacher);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(
      environment.apiUrl + '/teachers/' + teacher.id,
      teacher,
    );
  }

  deleteTeacher(id: number): Observable<Teacher> {
    return this.http.delete<Teacher>(environment.apiUrl + '/teachers/' + id);
  }
}
