import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from './models/Teacher';
import { mockTeachers } from './data/mock';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private teachers: Teacher[] = [];

  constructor() {
    this.teachers = mockTeachers;
  }

  getTeachers(): Observable<Teacher[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.teachers);
        observer.complete();
      }, 1500);
    });
  }

  getTeacher(id: number): Observable<Teacher> {
    return new Observable((observer) => {
      setTimeout(() => {
        const teacher = this.teachers.find((s) => s.id === id);
        observer.next(teacher);
        observer.complete();
      }, 1500);
    });
  }

  addTeacher(teacher: Teacher): Observable<Teacher[]> {
    teacher.id = this.teachers[this.teachers.length - 1].id + 1;
    teacher.createdAt = new Date();
    teacher.updatedAt = new Date();
    teacher.email =
      teacher.email.split('@')[0] + '+teacher@' + teacher.email.split('@')[1];

    this.teachers.push(teacher);

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.teachers);
        observer.complete();
      }, 1500);
    });
  }

  updateTeacher(teacher: Teacher): Observable<Teacher[]> {
    const index = this.teachers.findIndex((s) => s.id === teacher.id);

    if (index !== -1) {
      this.teachers[index] = {
        ...this.teachers[index],
        ...teacher,
        updatedAt: new Date(),
      };

      return new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.teachers);
          observer.complete();
        }, 1500);
      });
    }

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.teachers);
        observer.complete();
      }, 1500);
    });
  }

  deleteTeacher(id: number): Observable<Teacher[]> {
    const index = this.teachers.findIndex((s) => s.id === id);

    if (index !== -1) {
      this.teachers.splice(index, 1);

      return new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.teachers);
          observer.complete();
        }, 1500);
      });
    }

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.teachers);
        observer.complete();
      }, 1500);
    });
  }
}
