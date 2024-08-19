import { createFeature, createReducer, on } from '@ngrx/store';
import { Inscription } from '../../../../core/services/inscriptions/models/Inscription';
import { InscriptionsActions } from './inscriptions.actions';

export const inscriptionsFeatureKey = 'inscriptions';

export interface InscriptionsState {
  isLoading: boolean;
  inscriptions: Inscription[];
  error: unknown;
}

export const initialState: InscriptionsState = {
  isLoading: false,
  inscriptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, actions) => {
    return {
      ...state,
      isLoading: false,
      inscriptions: actions.inscriptions,
    };
  }),
  on(InscriptionsActions.loadInscriptionsFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(InscriptionsActions.createInscription, (state, { inscription }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(InscriptionsActions.createInscriptionSuccess, (state, { inscription }) => {
    return {
      ...state,
      isLoading: false,
      inscriptions: [...state.inscriptions, inscription],
    };
  }),
  on(InscriptionsActions.createInscriptionFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(InscriptionsActions.updateInscription, (state, { inscription }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(InscriptionsActions.updateInscriptionSuccess, (state, { inscription }) => {
    return {
      ...state,
      isLoading: false,
      inscriptions: state.inscriptions.map((i) => {
        if (inscription.id === i.id) {
          return inscription;
        }

        return i;
      }),
    };
  }),
  on(InscriptionsActions.updateInscriptionFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(InscriptionsActions.deleteInscription, (state, { id }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(InscriptionsActions.deleteInscriptionSuccess, (state, { id }) => {
    return {
      ...state,
      isLoading: false,
      inscriptions: state.inscriptions.filter((inscription) => {
        return inscription.id !== id;
      }),
    };
  }),
  on(InscriptionsActions.deleteInscriptionFail, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer: reducer,
});
