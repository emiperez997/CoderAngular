import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TitleDirective } from '../../shared/directives/title.directive';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { HomeComponent } from './home/home.component';

import { AngularToastifyModule } from 'angular-toastify';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    HomeComponent,

    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatNavList,

    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,

    TitleDirective,
    RouterOutlet,

    AngularToastifyModule,
  ],
  providers: [AuthService],
})
export class DashboardModule {}
