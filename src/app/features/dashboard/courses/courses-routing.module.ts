import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { DetailComponent } from './pages/details/detail.component';
import { provideState } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';
import { inscriptionsFeature } from '../inscriptions/store/inscriptions.reducer';
import { provideEffects } from '@ngrx/effects';
import { InscriptionsEffects } from '../inscriptions/store/inscriptions.effects';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: ':id',
    component: DetailComponent,
    providers: [
      provideState(inscriptionsFeature),
      provideEffects(InscriptionsEffects),
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
