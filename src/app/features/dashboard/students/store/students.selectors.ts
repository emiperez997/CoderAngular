import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudents from './students.reducer';

export const selectStudentsState =
  createFeatureSelector<fromStudents.StudentsState>(
    fromStudents.studentsFeatureKey,
  );

export const selectStudents = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentsState) => state.students,
);

export const selectStudent = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentsState) => state.student,
);

export const selectIsLoading = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentsState) => state.isLoading,
);

export const selectError = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentsState) => state.error,
);
