import { createReducer, on } from '@ngrx/store';
import { UserToken } from '../../services/auth/models/UserToken';
import { setAuthUser, unsetAuthUser } from './auth.actions';

export interface AuthState {
  user: UserToken | null;
}

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(setAuthUser, (state, { payload }) => ({ ...state, user: payload })),
  on(unsetAuthUser, (state) => initialState),
);
