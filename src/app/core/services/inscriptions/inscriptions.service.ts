import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from './models/Inscription';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/student.service';
import { mockInscriptions } from './data/mock';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  constructor(private http: HttpClient) {}

  getInscriptions() {
    return this.http.get<Inscription[]>(environment.apiUrl + '/inscriptions');
  }

  addInscription(inscription: Inscription) {
    console.log(inscription);

    return this.http.post<Inscription>(
      environment.apiUrl + '/inscriptions',
      inscription,
    );
  }

  updateInscription(inscription: Inscription) {
    return this.http.put<Inscription>(
      environment.apiUrl + '/inscriptions/' + inscription.id,
      inscription,
    );
  }

  deleteInscription(id: number) {
    return this.http.delete<Inscription>(
      environment.apiUrl + '/inscriptions/' + id,
    );
  }
}
