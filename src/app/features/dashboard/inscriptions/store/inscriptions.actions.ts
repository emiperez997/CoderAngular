import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription } from '../../../../core/services/inscriptions/models/Inscription';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ inscriptions: Inscription[] }>(),
    'Load Inscriptions Fail': props<{ error: unknown }>(),
    'Create Inscription': props<{ inscription: Inscription }>(),
    'Create Inscription Success': props<{ inscription: Inscription }>(),
    'Create Inscription Fail': props<{ error: unknown }>(),
    'Update Inscription': props<{ inscription: Inscription }>(),
    'Update Inscription Success': props<{ inscription: Inscription }>(),
    'Update Inscription Fail': props<{ error: unknown }>(),
    'Delete Inscription': props<{ id: number }>(),
    'Delete Inscription Success': props<{ id: number }>(),
    'Delete Inscription Fail': props<{ error: unknown }>(),
    'Reset Error': emptyProps(),
  },
});
