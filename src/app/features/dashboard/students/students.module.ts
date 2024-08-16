import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsService } from '../../../core/services/students/student.service';
import { TableComponent } from './components/table/table.component';
import { provideState } from '@ngrx/store';
import { studentsFeature } from './store/students.reducer';
import { provideEffects } from '@ngrx/effects';
import { StudentsEffects } from './store/students.effects';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, StudentsRoutingModule, TableComponent],
  providers: [
    StudentsService,
    provideState(studentsFeature),
    provideEffects(StudentsEffects),
  ],
})
export class StudentsModule {}
