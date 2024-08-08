import { createAction, props } from '@ngrx/store';

import { UserToken } from '../../services/auth/models/UserToken';

export const setAuthUser = createAction(
  '[Auth] setAuthUser',
  props<{ payload: UserToken }>(),
);

export const unsetAuthUser = createAction('[Auth] unsetAuthUser');
