import { Injectable } from '@angular/core';
import { Course } from './models/Course';
import { mockCourses } from './data/mock';
import { Observable } from 'rxjs';
import { TeachersService } from '../teachers/teacher.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(environment.apiUrl + '/courses');
  }

  getCourse(id: number): Observable<Course | null> {
    return this.http.get<Course>(environment.apiUrl + '/courses/' + id);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(environment.apiUrl + '/courses', course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(
      environment.apiUrl + '/courses/' + course.id,
      course,
    );
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(environment.apiUrl + '/courses/' + id);
  }
}
