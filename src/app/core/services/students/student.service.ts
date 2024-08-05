import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Student } from './models/Student';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private students: Student[] = [];

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.apiUrl + '/students');
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(environment.apiUrl + '/students', student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(
      environment.apiUrl + '/students/' + student.id,
      student,
    );
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(environment.apiUrl + '/students/' + id);
  }
}
