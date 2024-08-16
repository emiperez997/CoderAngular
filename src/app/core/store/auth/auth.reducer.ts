import { createReducer, on } from '@ngrx/store';
import { UserToken } from '../../services/auth/models/UserToken';
import { setAuthUser, unsetAuthUser } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: UserToken;
}

export const initialState: AuthState = {
  user: {
    email: '',
    exp: 0,
    iat: 0,
    sub: 0,
    role: 'ADMIN',
  },
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(setAuthUser, (state, { payload }) => ({ ...state, user: payload })),
  on(unsetAuthUser, (state) => initialState),
);
