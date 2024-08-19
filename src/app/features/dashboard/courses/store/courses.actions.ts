import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../../../core/services/courses/models/Course';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Fail': props<{ error: any }>(),
    'Load Course': props<{ id: number }>(),
    'Load Course Success': props<{ course: Course | null }>(),
    'Load Course Fail': props<{ error: any }>(),
    'Create Course': props<{ course: Course }>(),
    'Create Course Success': props<{ course: Course }>(),
    'Create Course Fail': props<{ error: any }>(),
    'Update Course': props<{ course: Course }>(),
    'Update Course Success': props<{ course: Course }>(),
    'Update Course Fail': props<{ error: any }>(),
    'Delete Course': props<{ id: number }>(),
    'Delete Course Success': props<{ id: number }>(),
    'Delete Course Fail': props<{ error: any }>(),
  },
});
