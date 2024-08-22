import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../../core/services/users/models/User';
import { UsersActions } from './users.actions';

export const usersFeatureKey = 'users';

export interface UsersState {
  isLoading: boolean;
  users: User[];
  user: User | null;
  error: unknown;
}

export const initialState: UsersState = {
  isLoading: false,
  users: [],
  user: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UsersActions.loadUsersSuccess, (state, { users }) => {
    return {
      ...state,
      isLoading: false,
      user: null,
      users: users,
    };
  }),
  on(UsersActions.loadUsersFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(UsersActions.createUser, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UsersActions.createUserSuccess, (state, { user }) => {
    return {
      ...state,
      isLoading: false,
      user: null,
      users: [...state.users, user],
    };
  }),
  on(UsersActions.createUserFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(UsersActions.updateUser, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UsersActions.updateUserSuccess, (state, { user }) => {
    return {
      ...state,
      isLoading: false,
      user: null,
      users: state.users.map((u) => {
        return u.id === user.id ? user : u;
      }),
    };
  }),
  on(UsersActions.updateUserFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(UsersActions.deleteUser, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UsersActions.deleteUserSuccess, (state, { id }) => {
    return {
      ...state,
      isLoading: false,
      user: null,
      users: state.users.filter((u) => u.id !== id),
    };
  }),
  on(UsersActions.deleteUserFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});
