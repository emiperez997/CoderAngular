import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { TableComponent } from './components/table/table.component';
import { UsersService } from '../../../core/services/users/users.service';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UsersEffects } from './store/users.effects';
import { usersFeature } from './store/users.reducer';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, TableComponent],
  providers: [
    UsersService,
    provideState(usersFeature),
    provideEffects(UsersEffects),
  ],
})
export class UsersModule {}
