import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, concatMap, map, catchError, of } from 'rxjs';
import { InscriptionsService } from '../../../../core/services/inscriptions/inscriptions.service';
import { InscriptionsActions } from './inscriptions.actions';

@Injectable()
export class InscriptionsEffects {
  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionsService.getInscriptions().pipe(
          map((data) => {
            return InscriptionsActions.loadInscriptionsSuccess({
              inscriptions: data,
            });
          }),
          catchError((error) => {
            return of(InscriptionsActions.loadInscriptionsFail({ error }));
          }),
        ),
      ),
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) =>
        this.inscriptionsService.addInscription(action.inscription).pipe(
          map((data) => {
            return InscriptionsActions.createInscriptionSuccess({
              inscription: data,
            });
          }),
          catchError((error) => {
            return of(InscriptionsActions.createInscriptionFail({ error }));
          }),
        ),
      ),
    );
  });

  updateInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.updateInscription),
      concatMap((action) =>
        this.inscriptionsService.updateInscription(action.inscription).pipe(
          map((data) => {
            return InscriptionsActions.updateInscriptionSuccess({
              inscription: data,
            });
          }),
          catchError((error) => {
            return of(InscriptionsActions.updateInscriptionFail({ error }));
          }),
        ),
      ),
    );
  });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      concatMap((action) =>
        this.inscriptionsService.deleteInscription(action.id).pipe(
          map((data) => {
            return InscriptionsActions.deleteInscriptionSuccess({
              id: data.id,
            });
          }),
          catchError((error) => {
            return of(InscriptionsActions.deleteInscriptionFail({ error }));
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private inscriptionsService: InscriptionsService,
  ) {}
}
