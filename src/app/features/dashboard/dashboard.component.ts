import { Component } from '@angular/core';
import { setAuthUser } from '../../core/store/auth/auth.actions';
import { AuthService } from '../../core/services/auth/auth.service';
import { RootState } from '../../core/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private store: Store<RootState>,
  ) {
    const token = this.authService.getToken();

    if (token) {
      this.store.dispatch(
        setAuthUser({
          payload: this.authService.getUserToken(token),
        }),
      );
    }
  }
}
