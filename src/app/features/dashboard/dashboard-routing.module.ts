import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DetailComponent } from './courses/pages/details/detail.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CoursesEffects } from './courses/store/courses.effects';
import { coursesFeature } from './courses/store/courses.reducer';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'inscriptions',
    loadChildren: () =>
      import('./inscriptions/inscriptions.module').then(
        (m) => m.InscriptionsModule,
      ),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teachers/teachers.module').then((m) => m.TeachersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
