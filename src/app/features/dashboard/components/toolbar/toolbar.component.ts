import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../core/store';
import { Observable } from 'rxjs';
import { UserToken } from '../../../../core/services/auth/models/UserToken';
import { selectUser } from '../../../../core/store/auth/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  providers: [ThemeService],
})
export class ToolbarComponent {
  @Output() toggleEvent = new EventEmitter();
  user$: Observable<UserToken>;

  constructor(
    private themeService: ThemeService,
    private store: Store<RootState>,
  ) {
    this.user$ = this.store.select(selectUser);
  }

  toggleTheme() {
    this.themeService.setTheme(
      this.themeService.getTheme() === 'dark' ? 'light' : 'dark',
    );
  }

  getTheme() {
    return this.themeService.getTheme();
  }
}
