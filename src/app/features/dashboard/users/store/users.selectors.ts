import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUserState = createFeatureSelector<fromUsers.UsersState>(
  fromUsers.usersFeatureKey,
);

export const selectUsers = createSelector(
  selectUserState,
  (state: fromUsers.UsersState) => state.users,
);

export const selectUser = createSelector(
  selectUserState,
  (state: fromUsers.UsersState) => state.user,
);

export const selectIsLoading = createSelector(
  selectUserState,
  (state: fromUsers.UsersState) => state.isLoading,
);

export const selectError = createSelector(
  selectUserState,
  (state: fromUsers.UsersState) => state.error,
);
