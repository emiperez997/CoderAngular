import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from './models/Inscription';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/student.service';
import { mockInscriptions } from './data/mock';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  private inscriptions: Inscription[];
  private timer: number = 1000;

  constructor(
    private courseService: CoursesService,
    private studentService: StudentsService,
  ) {
    this.inscriptions = mockInscriptions;
  }

  getInscriptions() {
    return new Observable<Inscription[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.inscriptions);
        subscriber.complete();
      }, this.timer);
    });
  }

  addInscription(inscription: Inscription) {
    inscription.id = this.inscriptions[this.inscriptions.length - 1].id + 1;

    inscription.createdAt = new Date();
    inscription.updatedAt = new Date();
    this.inscriptions.push(inscription);

    return new Observable<Inscription[]>((subscriber) => {
      setTimeout(() => {
        this.getInscriptions().subscribe((inscriptions) => {
          subscriber.next(inscriptions);
          subscriber.complete();
        });
        subscriber.next(this.inscriptions);
        subscriber.complete();
      }, this.timer);
    });
  }

  updateInscription(inscription: Inscription) {
    const index = this.inscriptions.findIndex(
      (inscription) => inscription.id === inscription.id,
    );

    if (index !== -1) {
      this.inscriptions[index] = {
        ...this.inscriptions[index],
        ...inscription,
        updatedAt: new Date(),
      };

      return new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.inscriptions);
          observer.complete();
        }, this.timer);
      });
    }

    return new Observable<Inscription[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.inscriptions);
        subscriber.complete();
      }, this.timer);
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
      }, this.timer);
    });
  }
}
