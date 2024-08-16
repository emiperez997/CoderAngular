import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
import { ListItem } from './models/ListItem';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserToken } from '../../../../core/services/auth/models/UserToken';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  providers: [AuthService],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  user: UserToken | null = null;
  listItems: ListItem[] = [
    {
      name: 'Inicio',
      icon: 'home',
      url: '/dashboard',
    },
    {
      name: 'Cursos',
      icon: 'school',
      url: 'courses',
    },
    {
      name: 'Alumnos',
      icon: 'groups',
      url: 'students',
    },
    {
      name: 'Inscripciones',
      icon: 'add',
      url: 'inscriptions',
    },
    {
      name: 'Profesores',
      icon: 'person',
      url: 'teachers',
    },
  ];

  constructor(private authService: AuthService) {
    const token = this.authService.getToken();
    if (token) {
      this.user = this.authService.getUserToken(token);

      if (this.user?.role === 'ADMIN') {
        this.listItems.push({
          name: 'Usuarios',
          icon: 'manage_accounts',
          url: 'users',
        });
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
