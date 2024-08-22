import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { RootState } from '../../../core/store';
import { InscriptionsActions } from './store/inscriptions.actions';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.store.dispatch(InscriptionsActions.loadInscriptions());
    this.store.dispatch(InscriptionsActions.resetError());
  }
}
