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
      concatMap(() =>
        this.teachersService.getTeachers().pipe(
          map((data) => {
            return TeachersActions.loadTeachersSuccess({
              teachers: data,
            });
          }),
          catchError((error) => {
            return of(TeachersActions.loadTeachersFail({ error }));
          }),
        ),
      ),
    );
  });

  loadTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.loadTeacher),
      concatMap((action) =>
        this.teachersService.getTeacher(action.id).pipe(
          map((data) => {
            return TeachersActions.loadTeacherSuccess({
              teacher: data,
            });
          }),
          catchError((error) => {
            return of(TeachersActions.loadTeacherFail({ error }));
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
            return TeachersActions.createTeacherSuccess({
              teacher: data,
            });
          }),
          catchError((error) => {
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
