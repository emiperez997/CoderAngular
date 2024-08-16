import { createFeature, createReducer, on } from '@ngrx/store';
import { Course } from '../../../../core/services/courses/models/Course';
import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CourseState {
  isLoading: boolean;
  courses: Course[];
  error: any;
}

export const initialState: CourseState = {
  isLoading: false,
  courses: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Read
  on(CoursesActions.loadCourses, (state) => {
    console.log('LOAD COURSES');

    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => {
    return {
      ...state,
      isLoading: false,
      courses: courses,
    };
  }),
  on(CoursesActions.loadCoursesFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  // Create
  on(CoursesActions.createCourse, (state, { course }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CoursesActions.createCourseSuccess, (state, { course }) => {
    return {
      ...state,
      isLoading: false,
      courses: [...state.courses, course],
    };
  }),
  on(CoursesActions.createCourseFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  // Update
  on(CoursesActions.updateCourse, (state, { course }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CoursesActions.updateCourseSuccess, (state, { course }) => {
    return {
      ...state,
      isLoading: false,
      courses: state.courses.map((c) => {
        if (c.id === course.id) {
          return course;
        }

        return c;
      }),
    };
  }),
  on(CoursesActions.updateCourseFail, (state, { error }) => {
    console.log('UPDATE COURSE FAILURE');

    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  // Delete
  on(CoursesActions.deleteCourse, (state, { id }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CoursesActions.deleteCourseSuccess, (state, { id }) => {
    return {
      ...state,
      isLoading: false,
      courses: state.courses.filter((c) => c.id !== id),
    };
  }),
  on(CoursesActions.deleteCourseFail, (state, { error }) => {
    console.log('DELETE COURSE FAILURE');

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
