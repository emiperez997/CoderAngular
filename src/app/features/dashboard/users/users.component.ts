import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/store';
import { UsersActions } from './store/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }
}
