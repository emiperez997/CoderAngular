import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';

export const selectCoursesState =
  createFeatureSelector<fromCourses.CourseState>(fromCourses.coursesFeatureKey);

export const selectCourses = createSelector(
  selectCoursesState,
  (state: fromCourses.CourseState) => state.courses,
);

export const selectIsLoading = createSelector(
  selectCoursesState,
  (state: fromCourses.CourseState) => state.isLoading,
);

export const selectError = createSelector(
  selectCoursesState,
  (state: fromCourses.CourseState) => state.error,
);
