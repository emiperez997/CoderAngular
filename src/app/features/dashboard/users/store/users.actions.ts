import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../../core/services/users/models/User';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Fail': props<{ error: any }>(),
  },
});
