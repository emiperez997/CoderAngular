import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../../../../core/services/students/models/Student';

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[] }>(),
    'Load Students Fail': props<{ error: unknown }>(),
    'Create Student': props<{ student: Student }>(),
    'Create Student Success': props<{ student: Student }>(),
    'Create Student Fail': props<{ error: unknown }>(),
    'Update Student': props<{ student: Student }>(),
    'Update Student Success': props<{ student: Student }>(),
    'Update Student Fail': props<{ error: unknown }>(),
    'Delete Student': props<{ id: number }>(),
    'Delete Student Success': props<{ id: number }>(),
    'Delete Student Fail': props<{ error: unknown }>(),
  },
});
