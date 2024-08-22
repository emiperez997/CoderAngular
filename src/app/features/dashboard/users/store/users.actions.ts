import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../../core/services/users/models/User';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Fail': props<{ error: any }>(),
    'Create User': props<{ user: User }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Fail': props<{ error: any }>(),
    'Update User': props<{ user: User }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Fail': props<{ error: any }>(),
    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete User Fail': props<{ error: any }>(),
  },
});
