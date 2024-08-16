import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { TableComponent } from './components/table/table.component';
import { provideState } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';
import { provideEffects } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, TableComponent],
  providers: [provideState(coursesFeature), provideEffects(CoursesEffects)],
})
export class CoursesModule {}
