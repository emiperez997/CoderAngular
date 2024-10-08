import { createFeature, createReducer, on } from '@ngrx/store';
import { Course } from '../../../../core/services/courses/models/Course';
import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CourseState {
  isLoading: boolean;
  courses: Course[];
  course: Course | null;
  error: any;
}

export const initialState: CourseState = {
  isLoading: false,
  courses: [],
  course: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Read
  on(CoursesActions.loadCourses, (state) => {
    return {
      ...state,
      isLoading: true,
      course: null,
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

  on(CoursesActions.loadCourse, (state, { id }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CoursesActions.loadCourseSuccess, (state, { course }) => {
    return {
      ...state,
      isLoading: false,
      course: course,
    };
  }),
  on(CoursesActions.loadCourseFail, (state, { error }) => {
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
