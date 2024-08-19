import { createReducer, createFeature, on } from '@ngrx/store';
import { Teacher } from '../../../../core/services/teachers/models/Teacher';
import { TeachersActions } from './teachers.actions';

export const teachersFeatureKey = 'teachers';

export interface TeachersState {
  isLoading: boolean;
  teachers: Teacher[];
  teacher: Teacher | null;
  error: unknown;
}

export const initialState: TeachersState = {
  isLoading: false,
  teachers: [],
  teacher: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TeachersActions.loadTeachers, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeachersActions.loadTeachersSuccess, (state, { teachers }) => {
    return {
      ...state,
      isLoading: false,
      teacher: null,
      teachers: teachers,
    };
  }),
  on(TeachersActions.loadTeachersFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(TeachersActions.loadTeacher, (state, { id }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeachersActions.loadTeacherSuccess, (state, { teacher }) => {
    return {
      ...state,
      isLoading: false,
      teacher: teacher,
    };
  }),
  on(TeachersActions.loadTeacherFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(TeachersActions.createTeacher, (state, { teacher }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeachersActions.createTeacherSuccess, (state, { teacher }) => {
    return {
      ...state,
      isLoading: false,
      teachers: [...state.teachers, teacher],
    };
  }),
  on(TeachersActions.createTeacherFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(TeachersActions.updateTeacher, (state, { teacher }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeachersActions.updateTeacherSuccess, (state, { teacher }) => {
    return {
      ...state,
      isLoading: false,
      teachers: state.teachers.map((t) => {
        if (teacher.id === t.id) {
          return teacher;
        }

        return t;
      }),
    };
  }),
  on(TeachersActions.updateTeacherFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(TeachersActions.deleteTeacher, (state, { id }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeachersActions.deleteTeacherSuccess, (state, { id }) => {
    return {
      ...state,
      isLoading: false,
      teachers: state.teachers.filter((teacher) => {
        return teacher.id !== id;
      }),
    };
  }),
  on(TeachersActions.deleteTeacherFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
);

export const teachersFeature = createFeature({
  name: teachersFeatureKey,
  reducer: reducer,
});
