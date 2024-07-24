import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from './models/Inscription';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/student.service';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  private inscriptions: Inscription[] = [];

  constructor(
    private courseService: CoursesService,
    private studentService: StudentsService,
  ) {}

  getInscriptions() {
    return new Observable<Inscription[]>((subscriber) => {
      setTimeout(() => {
        this.courseService.getCourses().subscribe((courses) => {
          this.inscriptions = this.inscriptions.map((inscription) => {
            if (inscription.courseId) {
              const course = courses.find(
                (course) => course.id === inscription.courseId,
              );
              inscription.course = course;
            }
            return inscription;
          });
          console.log(this.inscriptions);
          subscriber.next(this.inscriptions);
          subscriber.complete();
        });
        subscriber.next(this.inscriptions);
        subscriber.complete();
      }, 1000);
    });
  }

  addInscription(inscription: Inscription) {
    inscription.id = this.inscriptions.length
      ? this.inscriptions[this.inscriptions.length - 1].id + 1
      : 1;

    inscription.createdAt = new Date();
    inscription.updatedAt = new Date();
    this.inscriptions = [...this.inscriptions, inscription];
    return new Observable<Inscription[]>((subscriber) => {
      setTimeout(() => {
        this.getInscriptions().subscribe((inscriptions) => {
          subscriber.next(inscriptions);
          subscriber.complete();
        });
        subscriber.next(this.inscriptions);
        subscriber.complete();
      }, 1000);
    });
  }

  updateInscription(inscription: Inscription) {
    const index = this.inscriptions.findIndex(
      (inscription) => inscription.id === inscription.id,
    );

    if (index !== -1) {
      this.inscriptions[index] = inscription;
    }

    return new Observable<Inscription[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.inscriptions);
        subscriber.complete();
      }, 1000);
    });
  }

  deleteInscription(id: number) {
    this.inscriptions = this.inscriptions.filter(
      (inscription) => inscription.id !== id,
    );
    return new Observable<Inscription[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.inscriptions);
        subscriber.complete();
      }, 1000);
    });
  }
}
