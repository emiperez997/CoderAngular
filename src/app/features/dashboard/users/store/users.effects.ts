import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { concatMap, map, catchError, of } from 'rxjs';
import { UsersService } from '../../../../core/services/users/users.service';
import { UsersActions } from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      concatMap(() =>
        this.usersService.getUsers().pipe(
          map((data) => {
            return UsersActions.loadUsersSuccess({
              users: data,
            });
          }),
          catchError((error) => {
            return of(UsersActions.loadUsersFail({ error }));
          }),
        ),
      ),
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.createUser),
      concatMap((action) =>
        this.usersService.createUser(action.user).pipe(
          map((data) => {
            return UsersActions.createUserSuccess({ user: data });
          }),
          catchError((error) => {
            return of(UsersActions.createUserFail({ error }));
          }),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      concatMap((action) =>
        this.usersService.updateUser(action.user).pipe(
          map((data) => {
            return UsersActions.updateUserSuccess({ user: data });
          }),
          catchError((error) => {
            return of(UsersActions.updateUserFail({ error }));
          }),
        ),
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      concatMap((action) =>
        this.usersService.deleteUser(action.id).pipe(
          map((data) => {
            return UsersActions.deleteUserSuccess({ id: action.id });
          }),
          catchError((error) => {
            return of(UsersActions.deleteUserFail({ error }));
          }),
        ),
      ),
      catchError((error) => {
        return of(UsersActions.deleteUserFail({ error }));
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
  ) {}
}
