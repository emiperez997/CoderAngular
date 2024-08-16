import { createFeature, createReducer, on } from '@ngrx/store';
import { Student } from '../../../../core/services/students/models/Student';
import { StudentsActions } from './students.actions';

export const studentsFeatureKey = 'students';

export interface StudentsState {
  isLoading: boolean;
  students: Student[];
  error: unknown;
}

export const initialState: StudentsState = {
  isLoading: false,
  students: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) => {
    return {
      ...state,
      isLoading: false,
      students: students,
    };
  }),
  on(StudentsActions.loadStudentsFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(StudentsActions.createStudent, (state, { student }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentsActions.createStudentSuccess, (state, { student }) => {
    return {
      ...state,
      isLoading: false,
      students: [...state.students, student],
    };
  }),
  on(StudentsActions.createStudentFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(StudentsActions.updateStudent, (state, { student }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentsActions.updateStudentSuccess, (state, { student }) => {
    return {
      ...state,
      isLoading: false,
      students: state.students.map((s) => {
        if (student.id === s.id) {
          return student;
        }

        return s;
      }),
    };
  }),
  on(StudentsActions.updateStudentFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(StudentsActions.deleteStudent, (state, { id }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentsActions.deleteStudentSuccess, (state, { id }) => {
    return {
      ...state,
      isLoading: false,
      students: state.students.filter((student) => {
        return student.id !== id;
      }),
    };
  }),
);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer: reducer,
});
