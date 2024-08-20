import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { DetailsComponent } from './pages/details/details.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { StudentsEffects } from './store/students.effects';
import { studentsFeature } from './store/students.reducer';
import { coursesFeature } from '../courses/store/courses.reducer';
import { CoursesEffects } from '../courses/store/courses.effects';
import { inscriptionsFeature } from '../inscriptions/store/inscriptions.reducer';
import { InscriptionsEffects } from '../inscriptions/store/inscriptions.effects';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },
  {
    path: ':id',
    component: DetailsComponent,
    providers: [
      provideState(coursesFeature),
      provideEffects(CoursesEffects),
      provideState(inscriptionsFeature),
      provideEffects(InscriptionsEffects),
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
