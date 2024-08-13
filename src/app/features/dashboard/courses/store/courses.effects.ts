import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../../../core/services/courses/courses.service';
import { CoursesActions } from './courses.actions';
import { catchError, concatMap, map, of, tap } from 'rxjs';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      tap(() => console.log('LOAD COURSES')),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map((data) => {
            console.log(data);

            return CoursesActions.loadCoursesSuccess({ courses: data });
          }),
          catchError((error) => {
            console.log(error);

            return of(CoursesActions.loadCoursesFail({ error }));
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
  ) {}
}
