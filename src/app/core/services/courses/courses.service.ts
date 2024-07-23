import { Injectable } from '@angular/core';
import { Course } from './models/Course';
import { mockCourses } from './data/mock';
import { Observable } from 'rxjs';
import { TeachersService } from '../teachers/teacher.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];

  constructor(private teachersService: TeachersService) {
    this.courses = mockCourses;
  }

  getCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.courses);
        observer.complete();
      }, 1500);
    });
  }

  getCourse(id: number): Observable<Course | undefined> {
    return new Observable((observer) => {
      setTimeout(() => {
        const course = this.courses.find((c) => c.id === id);

        if (!course) {
          observer.next(undefined);
          observer.complete();
          return;
        }

        this.teachersService
          .getTeacher(course?.teacherId)
          .subscribe((teacher) => {
            course.teacher = teacher;
            observer.next(course);
            observer.complete();
          });
        observer.next(course);
        observer.complete();
      }, 1500);
    });
  }

  addCourse(course: Course): Observable<Course[]> {
    course.id = this.courses[this.courses.length - 1].id + 1;
    course.createdAt = new Date();
    course.updatedAt = new Date();

    this.courses.push(course);

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.courses);
        observer.complete();
      }, 1500);
    });
  }

  updateCourse(course: Course): Observable<Course[]> {
    const index = this.courses.findIndex((c) => c.id === course.id);

    if (index !== -1) {
      this.courses[index] = {
        ...this.courses[index],
        ...course,
        updatedAt: new Date(),
      };

      return new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.courses);
          observer.complete();
        }, 1500);
      });
    }

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.courses);
        observer.complete();
      }, 1500);
    });
  }

  deleteCourse(id: number): Observable<Course[]> {
    const index = this.courses.findIndex((c) => c.id === id);

    if (index !== -1) {
      this.courses.splice(index, 1);

      return new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.courses);
          observer.complete();
        }, 1500);
      });
    }

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.courses);
        observer.complete();
      }, 1500);
    });
  }
}
