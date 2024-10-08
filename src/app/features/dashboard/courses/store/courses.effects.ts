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
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map((data) => {
            return CoursesActions.loadCoursesSuccess({ courses: data });
          }),
          catchError((error) => {
            return of(CoursesActions.loadCoursesFail({ error }));
          }),
        ),
      ),
    );
  });

  loadCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadCourse),
      concatMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((data) => {
            return CoursesActions.loadCourseSuccess({ course: data });
          }),
          catchError((error) => {
            return of(CoursesActions.loadCourseFail({ error }));
          }),
        ),
      ),
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      concatMap((action) =>
        this.coursesService.addCourse(action.course).pipe(
          map((data) => {
            return CoursesActions.createCourseSuccess({ course: data });
          }),
          catchError((error) => {
            return of(CoursesActions.createCourseFail({ error }));
          }),
        ),
      ),
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      concatMap((action) =>
        this.coursesService.updateCourse(action.course).pipe(
          map((data) => {
            return CoursesActions.updateCourseSuccess({ course: data });
          }),
          catchError((error) => {
            return of(CoursesActions.updateCourseFail({ error }));
          }),
        ),
      ),
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map((data) => {
            return CoursesActions.deleteCourseSuccess({ id: data.id });
          }),
          catchError((error) => {
            return of(CoursesActions.deleteCourseFail({ error }));
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
