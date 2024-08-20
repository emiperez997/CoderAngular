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

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
  ) {}
}
