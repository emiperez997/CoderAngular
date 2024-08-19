import { Component, OnInit } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { FormDialogComponent } from './components/form/form.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Inscription } from '../../../core/services/inscriptions/models/Inscription';
import { RootState } from '../../../core/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscriptions } from './store/inscriptions.selectors';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.store.dispatch(InscriptionsActions.loadInscriptions());
  }
}
