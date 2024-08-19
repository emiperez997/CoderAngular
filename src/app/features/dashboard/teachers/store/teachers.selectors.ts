import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeachers from './teachers.reducer';

export const selectTeachersState =
  createFeatureSelector<fromTeachers.TeachersState>(
    fromTeachers.teachersFeatureKey,
  );

export const selectTeachers = createSelector(
  selectTeachersState,
  (state: fromTeachers.TeachersState) => state.teachers,
);

export const selectTeacher = createSelector(
  selectTeachersState,
  (state: fromTeachers.TeachersState) => state.teacher,
);

export const selectIsLoading = createSelector(
  selectTeachersState,
  (state: fromTeachers.TeachersState) => state.isLoading,
);

export const selectError = createSelector(
  selectTeachersState,
  (state: fromTeachers.TeachersState) => state.error,
);
