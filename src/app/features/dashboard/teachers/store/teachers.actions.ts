import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Teacher } from '../../../../core/services/teachers/models/Teacher';

export const TeachersActions = createActionGroup({
  source: 'Teachers',
  events: {
    'Load Teachers': emptyProps(),
    'Load Teachers Success': props<{ teachers: Teacher[] }>(),
    'Load Teachers Fail': props<{ error: any }>(),
    'Create Teacher': props<{ teacher: Teacher }>(),
    'Create Teacher Success': props<{ teacher: Teacher }>(),
    'Create Teacher Fail': props<{ error: any }>(),
    'Update Teacher': props<{ teacher: Teacher }>(),
    'Update Teacher Success': props<{ teacher: Teacher }>(),
    'Update Teacher Fail': props<{ error: any }>(),
    'Delete Teacher': props<{ id: number }>(),
    'Delete Teacher Success': props<{ id: number }>(),
    'Delete Teacher Fail': props<{ error: any }>(),
  },
});
