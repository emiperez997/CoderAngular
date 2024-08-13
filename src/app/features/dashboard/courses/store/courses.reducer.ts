import { createFeature, createReducer, on } from '@ngrx/store';
import { Course } from '../../../../core/services/courses/models/Course';
import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CourseState {
  isLoading: boolean;
  courses: Course[];
  error: unknown;
}

export const initialState: CourseState = {
  isLoading: false,
  courses: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => {
    console.log('LOAD COURSES');

    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => {
    console.log('LOAD COURSES SUCCESS');

    return {
      ...state,
      isLoading: false,
      courses: courses,
    };
  }),
  on(CoursesActions.loadCoursesFail, (state, { error }) => {
    console.log('LOAD COURSES FAILURE');

    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer: reducer,
});
