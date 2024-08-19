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
      concatMap(() =>
        this.studentsService.getStudents().pipe(
          map((data) => {
            return StudentsActions.loadStudentsSuccess({ students: data });
          }),
          catchError((error) => {
            return of(StudentsActions.loadStudentsFail({ error }));
          }),
        ),
      ),
    );
  });

  loadStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudent),
      concatMap((action) =>
        this.studentsService.getStudent(action.id).pipe(
          map((data) => {
            return StudentsActions.loadStudentSuccess({ student: data });
          }),
          catchError((error) => {
            return of(StudentsActions.loadStudentFail({ error }));
          }),
        ),
      ),
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.createStudent),
      concatMap((action) =>
        this.studentsService.addStudent(action.student).pipe(
          map((data) => {
            return StudentsActions.createStudentSuccess({ student: data });
          }),
          catchError((error) => {
            return of(StudentsActions.createStudentFail({ error }));
          }),
        ),
      ),
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      concatMap((action) =>
        this.studentsService.updateStudent(action.student).pipe(
          map((data) => {
            return StudentsActions.updateStudentSuccess({ student: data });
          }),
          catchError((error) => {
            return of(StudentsActions.updateStudentFail({ error }));
          }),
        ),
      ),
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      concatMap((action) =>
        this.studentsService.deleteStudent(action.id).pipe(
          map((data) => {
            return StudentsActions.deleteStudentSuccess({ id: action.id });
          }),
          catchError((error) => {
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
