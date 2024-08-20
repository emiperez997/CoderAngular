import { Component } from '@angular/core';
import { RootState } from '../../../core/store';
import { Store } from '@ngrx/store';
import { UserToken } from '../../../core/services/auth/models/UserToken';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: UserToken | null = null;

  constructor(private store: Store<RootState>) {
    this.store.subscribe({
      next: (state) => {
        this.user = state.auth.user;
      },
    });
  }
}
