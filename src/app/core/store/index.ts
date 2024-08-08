import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { auth } from './featureNames';

export interface RootState {
  [auth]: AuthState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  [auth]: authReducer,
};
