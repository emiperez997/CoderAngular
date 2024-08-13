import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../../../core/services/courses/models/Course';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Fail': props<{ error: unknown }>(),
  },
});
