import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, concatMap, map, catchError, of } from 'rxjs';
import { TeachersService } from '../../../../core/services/teachers/teacher.service';
import { TeachersActions } from './teachers.actions';

@Injectable()
export class TeachersEffects {
  loadTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.loadTeachers),
      tap(() => console.log('LOAD TEACHERS')),
      concatMap(() =>
        this.teachersService.getTeachers().pipe(
          map((data) => {
            console.log(data);

            return TeachersActions.loadTeachersSuccess({
              teachers: data,
            });
          }),
          catchError((error) => {
            console.log(error);

            return of(TeachersActions.loadTeachersFail({ error }));
          }),
        ),
      ),
    );
  });

  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.createTeacher),
      concatMap((action) =>
        this.teachersService.addTeacher(action.teacher).pipe(
          map((data) => {
            console.log(data);

            return TeachersActions.createTeacherSuccess({
              teacher: data,
            });
          }),
          catchError((error) => {
            console.log(error);

            return of(TeachersActions.createTeacherFail({ error }));
          }),
        ),
      ),
    );
  });

  updateTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.updateTeacher),
      concatMap((action) =>
        this.teachersService.updateTeacher(action.teacher).pipe(
          map((data) => {
            return TeachersActions.updateTeacherSuccess({
              teacher: data,
            });
          }),
          catchError((error) => {
            console.log(error);

            return of(TeachersActions.updateTeacherFail({ error }));
          }),
        ),
      ),
    );
  });

  deleteTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.deleteTeacher),
      concatMap((action) =>
        this.teachersService.deleteTeacher(action.id).pipe(
          map((data) => {
            return TeachersActions.deleteTeacherSuccess({
              id: data.id,
            });
          }),
          catchError((error) => {
            console.log(error);
            return of(TeachersActions.deleteTeacherFail({ error }));
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private teachersService: TeachersService,
  ) {}
}
