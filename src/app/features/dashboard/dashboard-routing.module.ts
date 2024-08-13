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
    component: CoursesComponent,
    providers: [provideState(coursesFeature), provideEffects(CoursesEffects)],
  },
  {
    path: 'courses/:id',
    component: DetailComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'inscriptions',
    component: InscriptionsComponent,
  },
  {
    path: 'teachers',
    component: TeachersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
