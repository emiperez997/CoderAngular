import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey,
);

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.user,
);
