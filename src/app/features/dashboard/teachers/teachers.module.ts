import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TableComponent } from './components/table/table.component';
import { TeachersService } from '../../../core/services/teachers/teacher.service';
import { TeachersComponent } from './teachers.component';
import { provideState } from '@ngrx/store';
import { teachersFeature } from './store/teachers.reducer';
import { provideEffects } from '@ngrx/effects';
import { TeachersEffects } from './store/teachers.effects';

@NgModule({
  declarations: [TeachersComponent],
  imports: [CommonModule, TeachersRoutingModule, TableComponent],
  providers: [
    TeachersService,
    provideState(teachersFeature),
    provideEffects(TeachersEffects),
  ],
})
export class TeachersModule {}
