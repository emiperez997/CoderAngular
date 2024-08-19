import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { DetailsComponent } from './pages/details/details.component';
import { coursesFeature } from '../courses/store/courses.reducer';
import { CoursesEffects } from '../courses/store/courses.effects';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
  },
  {
    path: ':id',
    component: DetailsComponent,
    providers: [provideState(coursesFeature), provideEffects(CoursesEffects)],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
