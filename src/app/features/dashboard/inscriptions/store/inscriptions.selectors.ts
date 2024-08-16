import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState =
  createFeatureSelector<fromInscriptions.InscriptionsState>(
    fromInscriptions.inscriptionsFeatureKey,
  );

export const selectInscriptions = createSelector(
  selectInscriptionsState,
  (state: fromInscriptions.InscriptionsState) => state.inscriptions,
);

export const selectIsLoading = createSelector(
  selectInscriptionsState,
  (state: fromInscriptions.InscriptionsState) => state.isLoading,
);

export const selectError = createSelector(
  selectInscriptionsState,
  (state: fromInscriptions.InscriptionsState) => state.error,
);
