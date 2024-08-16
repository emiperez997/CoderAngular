import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authFeatureKey, authReducer } from './auth/auth.reducer';

export interface RootState {
  [authFeatureKey]: AuthState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  [authFeatureKey]: authReducer,
};
