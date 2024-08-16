import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, concatMap, map, catchError, of } from 'rxjs';
import { StudentsService } from '../../../../core/services/students/student.service';
import { StudentsActions } from './students.actions';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      tap(() => console.log('LOAD STUDENTS')),
      concatMap(() =>
        this.studentsService.getStudents().pipe(
          map((data) => {
            console.log(data);

            return StudentsActions.loadStudentsSuccess({ students: data });
          }),
          catchError((error) => {
            console.log(error);

            return of(StudentsActions.loadStudentsFail({ error }));
          }),
        ),
      ),
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.createStudent),
      tap(() => console.log('CREATE STUDENT')),
      concatMap((action) =>
        this.studentsService.addStudent(action.student).pipe(
          map((data) => {
            console.log(data);

            return StudentsActions.createStudentSuccess({ student: data });
          }),
          catchError((error) => {
            console.log(error);

            return of(StudentsActions.createStudentFail({ error }));
          }),
        ),
      ),
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      tap(() => console.log('UPDATE STUDENT')),
      concatMap((action) =>
        this.studentsService.updateStudent(action.student).pipe(
          map((data) => {
            console.log(data);

            return StudentsActions.updateStudentSuccess({ student: data });
          }),
          catchError((error) => {
            console.log(error);

            return of(StudentsActions.updateStudentFail({ error }));
          }),
        ),
      ),
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      tap(() => console.log('DELETE STUDENT')),
      concatMap((action) =>
        this.studentsService.deleteStudent(action.id).pipe(
          map((data) => {
            console.log(data);

            return StudentsActions.deleteStudentSuccess({ id: action.id });
          }),
          catchError((error) => {
            console.log(error);

            return of(StudentsActions.deleteStudentFail({ error }));
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService,
  ) {}
}
